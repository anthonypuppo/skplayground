using System.Threading.Channels;
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.AI.OpenAI.TextEmbedding;
using Microsoft.SemanticKernel.Memory;
using Microsoft.SemanticKernel.Orchestration;
using SKPlayground.Api.Extensions;
using SKPlayground.Api.Http;
using SKPlayground.Api.Hubs.Models;
using SKPlayground.Api.Options;

namespace SKPlayground.Api.Hubs;

public class SemanticKernelHub : Hub<ISemanticKernelHubClient>
{
    public ChannelReader<AskResult> InvokeFunction(
        [FromServices] IOptions<SemanticKernelOptions> semanticKernelOptions,
        [FromServices] TelemetryClient telemetryClient,
        [FromServices] ILogger<IKernel> kernelLogger,
        [FromServices] IMemoryStore memoryStore,
        [FromServices] IServiceProvider serviceProvider,
        string skillName,
        string functionName,
        Ask ask,
        CancellationToken cancellationToken)
    {
        var channel = Channel.CreateUnbounded<AskResult>();

        _ = InvokeFunction(
            channel.Writer,
            kernelLogger,
            memoryStore,
            semanticKernelOptions,
            telemetryClient,
            serviceProvider,
            skillName,
            functionName,
            ask,
            cancellationToken);

        return channel.Reader;
    }

    private static async Task InvokeFunction(
        ChannelWriter<AskResult> writer,
        ILogger<IKernel> kernelLogger,
        IMemoryStore memoryStore,
        IOptions<SemanticKernelOptions> semanticKernelOptions,
        TelemetryClient telemetryClient,
        IServiceProvider serviceProvider,
        string skillName,
        string functionName,
        Ask ask,
        CancellationToken cancellationToken)
    {
        Exception? localException = null;
        var command = $"{skillName}.{functionName}";
        using var operationHolder = telemetryClient.StartOperation<DependencyTelemetry>(command);

        operationHolder.Telemetry.Type = "Semantic Kernel";
        operationHolder.Telemetry.Data = command;

        try
        {
            var kernel = BuildKernel(semanticKernelOptions, kernelLogger, memoryStore, serviceProvider, ask);
            var contextVariables = new ContextVariables(ask.Input);

            if (ask.Variables is not null)
            {
                foreach (var (key, value) in ask.Variables)
                {
                    contextVariables.Set(key, value);
                }
            }

            var function = kernel.Skills.GetFunction(skillName, functionName);
            var functionResult = await kernel.RunAsync(contextVariables, cancellationToken, function);

            operationHolder.Telemetry.Success = !functionResult.ErrorOccurred;

            if (functionResult.ErrorOccurred)
            {
                throw new HubException(functionResult.LastException?.Message ?? "Unknown error");
            }

            var output = functionResult.Result;
            var outputVariables = functionResult.Variables
                .Where((variable) => !variable.Key.Equals("input", StringComparison.OrdinalIgnoreCase))
                .Select((variable) => new KeyValuePair<string, string>(variable.Key, variable.Value))
                .ToList()
                .NullIfEmpty();
            var askResult = new AskResult()
            {
                Output = output,
                Variables = outputVariables
            };

            // TODO - Stream the response, pending function streaming support in SK
            // For now, just send it as a single message
            await writer.WriteAsync(askResult, cancellationToken);
        }
        catch (Exception e)
        {
            operationHolder.Telemetry.Success = false;
            localException = e;

            if (e is HubException)
            {
                throw;
            }
        }
        finally
        {
            writer.Complete(localException);
        }
    }

    private static IKernel BuildKernel(
        IOptions<SemanticKernelOptions> semanticKernelOptions,
        ILogger<IKernel> logger,
        IMemoryStore memoryStore,
        IServiceProvider serviceProvider,
        Ask ask)
    {
        if (ask.Configuration?.OpenAIApiKey is not string openAIApiKey)
        {
            throw new Exception("OpenAI API key is not configured");
        }

        var textEmbeddingGeneration = new OpenAITextEmbeddingGeneration(semanticKernelOptions.Value.EmbeddingModel, openAIApiKey);
        var semanticTextMemory = new SemanticTextMemory(memoryStore, textEmbeddingGeneration);
        var kernel = Kernel.Builder
            .WithLogger(logger)
            .WithMemory(semanticTextMemory)
            .WithRetryHandlerFactory(new RetryHandlerFactory())
            .WithOpenAITextEmbeddingGenerationService(semanticKernelOptions.Value.EmbeddingModel, openAIApiKey)
            .WithOpenAIChatCompletionService(semanticKernelOptions.Value.ChatCompletionModel, openAIApiKey)
            .Build();

        kernel.ImportSkills(serviceProvider, ask.Configuration?.BingApiKey);

        return kernel;
    }
}

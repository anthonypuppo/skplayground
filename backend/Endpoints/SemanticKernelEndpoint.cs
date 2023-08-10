using System.Collections.Concurrent;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.SkillDefinition;
using Microsoft.SemanticKernel.Skills.Core;
using SKPlayground.Api.Endpoints.Models;
using SKPlayground.Api.Extensions;

namespace SKPlayground.Api.Endpoints;

public static class SemanticKernelEndpoint
{
    public static Ok<SemanticKernelSkillsResult> GetSkills([FromServices] IServiceProvider serviceProvider)
    {
        var kernel = Kernel.Builder.Build();

        kernel.ImportSkills(serviceProvider);

        var functionsView = kernel.Skills.GetFunctionsView();
        var functions = new ConcurrentDictionary<string, List<FunctionView>>(
            functionsView.SemanticFunctions.Concat(functionsView.NativeFunctions)
            .GroupBy((kvp) => kvp.Key, (kvp) => kvp.Value)
            .ToDictionary(
                (g) => g.Key,
                (g) => g.SelectMany((x) => x).ToList(),
                StringComparer.OrdinalIgnoreCase));
        var semanticKernelSkillsResult = new SemanticKernelSkillsResult()
        {
            Skills = functions.Select((skill) => new SemanticKernelSkill()
            {
                Name = skill.Key,
                Functions = skill.Value
                    // Temporary workaround for these functions being assigned random names at kernel initialization
                    .Where((function) => skill.Key != nameof(ConversationSummarySkill) || !function.Name.ToLower().StartsWith("func"))
                    .Select((function) => new SemanticKernelFunction()
                    {
                        Name = function.Name,
                        Description = function.Description,
                        Parameters = function.Parameters
                            .Select((parameter) => new SemanticKernelParameter()
                            {
                                Name = parameter.Name,
                                Description = parameter.Description
                            })
                            .ToList()
                            .NullIfEmpty()
                    })
            })
            .ToList()
            .NullIfEmpty()
        };

        return TypedResults.Ok(semanticKernelSkillsResult);
    }
}

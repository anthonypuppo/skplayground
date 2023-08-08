namespace SKPlayground.Api.Options;

public class SemanticKernelOptions
{
    public const string SemanticKernel = nameof(SemanticKernel);

    public string SemanticSkillsDirectory { get; set; } = default!;
    public string EmbeddingModel { get; set; } = default!;
    public string ChatCompletionModel { get; set; } = default!;
}

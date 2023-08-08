using System.Text.Json.Serialization;

namespace SKPlayground.Api.Endpoints.Models;

public class SemanticKernelSkill
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = String.Empty;

    [JsonPropertyName("functions")]
    public IEnumerable<SemanticKernelFunction>? Functions { get; set; }
}

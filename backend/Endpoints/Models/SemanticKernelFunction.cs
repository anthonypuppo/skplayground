using System.Text.Json.Serialization;

namespace SKPlayground.Api.Endpoints.Models;

public class SemanticKernelFunction
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = String.Empty;

    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("parameters")]
    public IEnumerable<SemanticKernelParameter>? Parameters { get; set; }
}

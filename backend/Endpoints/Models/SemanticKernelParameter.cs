using System.Text.Json.Serialization;

namespace SKPlayground.Api.Endpoints.Models;

public class SemanticKernelParameter
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = String.Empty;

    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("defaultValue")]
    public string? DefaultValue { get; set; }
}

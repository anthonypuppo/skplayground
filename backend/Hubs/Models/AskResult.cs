using System.Text.Json.Serialization;

namespace SKPlayground.Api.Hubs.Models;

public class AskResult
{
    [JsonPropertyName("output")]
    public string? Output { get; set; }

    [JsonPropertyName("variables")]
    public IEnumerable<KeyValuePair<string, string>>? Variables { get; set; }
}

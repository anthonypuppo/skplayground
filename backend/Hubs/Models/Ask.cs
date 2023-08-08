using System.Text.Json.Serialization;

namespace SKPlayground.Api.Hubs.Models;

public class Ask
{
    [JsonPropertyName("input")]
    public string? Input { get; set; }

    [JsonPropertyName("configuration")]
    public AskConfiguration? Configuration { get; set; }

    [JsonPropertyName("variables")]
    public IEnumerable<KeyValuePair<string, string>>? Variables { get; set; }
}

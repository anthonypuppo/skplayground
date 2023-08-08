using System.Text.Json.Serialization;

namespace SKPlayground.Api.Hubs.Models;

public class AskConfiguration
{
    [JsonPropertyName("openAIApiKey")]
    public string? OpenAIApiKey { get; set; }

    [JsonPropertyName("bingApiKey")]
    public string? BingApiKey { get; set; }
}

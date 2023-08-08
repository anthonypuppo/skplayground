using System.Text.Json.Serialization;

namespace SKPlayground.Api.Endpoints.Models;

public class SemanticKernelSkillsResult
{
    [JsonPropertyName("skills")]
    public IEnumerable<SemanticKernelSkill>? Skills { get; set; }
}

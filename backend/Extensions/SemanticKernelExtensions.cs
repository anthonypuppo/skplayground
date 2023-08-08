using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Skills.Core;
using Microsoft.SemanticKernel.Skills.Web;
using Microsoft.SemanticKernel.Skills.Web.Bing;
using SKPlayground.Api.Options;

namespace SKPlayground.Api.Extensions;

public static class SemanticKernelExtensions
{
    public static void ImportSkills(this IKernel kernel, IServiceProvider serviceProvider, string? bingApiKey = null)
    {
        var semanticKernelOptions = serviceProvider.GetRequiredService<IOptions<SemanticKernelOptions>>();

        if (semanticKernelOptions.Value.SemanticSkillsDirectory is string semanticSkillsDirectory)
        {
            kernel.ImportSemanticSkills(semanticSkillsDirectory);
        }

        kernel.ImportConversationSummarySkill();
        kernel.ImportMathSkill();
        kernel.ImportSearchUrlSkill();
        kernel.ImportTextSkill();
        kernel.ImportTimeSkill();
        kernel.ImportWebSearchEngineSkill(bingApiKey);
    }

    private static void ImportSemanticSkills(this IKernel kernel, string skillsDirectory)
    {
        foreach (var subDirectory in Directory.GetDirectories(skillsDirectory))
        {
            try
            {
                kernel.ImportSemanticSkillFromDirectory(skillsDirectory, Path.GetFileName(subDirectory));
            }
            catch (Exception e)
            {
                kernel.Logger.LogError("Failed to import skill from {Directory} ({Message})", subDirectory, e.Message);
            }
        }
    }

    private static void ImportConversationSummarySkill(this IKernel kernel)
    {
        var skill = new ConversationSummarySkill(kernel);

        kernel.ImportSkill(skill, nameof(ConversationSummarySkill));
    }

    private static void ImportMathSkill(this IKernel kernel)
    {
        var skill = new MathSkill();

        kernel.ImportSkill(skill, nameof(MathSkill));
    }

    private static void ImportSearchUrlSkill(this IKernel kernel)
    {
        var skill = new SearchUrlSkill();

        kernel.ImportSkill(skill, nameof(SearchUrlSkill));
    }

    private static void ImportTextSkill(this IKernel kernel)
    {
        var skill = new TextSkill();

        kernel.ImportSkill(skill, nameof(TextSkill));
    }

    private static void ImportTimeSkill(this IKernel kernel)
    {
        var skill = new TimeSkill();

        kernel.ImportSkill(skill, nameof(TimeSkill));
    }

    private static void ImportWebSearchEngineSkill(this IKernel kernel, string? bingApiKey = null)
    {
        var bingConnector = new BingConnector(bingApiKey ?? String.Empty);
        var skill = new WebSearchEngineSkill(bingConnector);

        kernel.ImportSkill(skill, nameof(WebSearchEngineSkill));
    }
}

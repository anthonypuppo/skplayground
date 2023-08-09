namespace SKPlayground.Api.Options;

public class AzureOptions
{
    public const string Azure = nameof(Azure);

    public SignalROptions SignalR { get; set; } = new SignalROptions();
}

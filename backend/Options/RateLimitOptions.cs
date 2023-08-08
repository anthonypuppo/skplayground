namespace SKPlayground.Api.Options;

public class RateLimitOptions
{
    public const string RateLimit = nameof(RateLimit);

    public int PermitLimit { get; set; }
    public int Window { get; set; }
    public int QueueLimit { get; set; }
}

namespace SKPlayground.Api.Options
{
    public class CorsOptions
    {
        public const string Cors = nameof(Cors);

        public string[] Origins { get; set; } = Array.Empty<string>();
    }
}

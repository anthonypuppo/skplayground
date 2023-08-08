using System.Globalization;
using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.RateLimiting;
using Asp.Versioning;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Identity.Web;
using Microsoft.SemanticKernel.Memory;
using SKPlayground.Api.Endpoints;
using SKPlayground.Api.Hubs;
using SKPlayground.Api.Options;
using SKPlayground.Api.Telemetry;

var builder = WebApplication.CreateBuilder(args);
var corsOptions = new CorsOptions();
var rateLimitOptions = new RateLimitOptions();
var semanticKernelOptions = new SemanticKernelOptions();

builder.Configuration
    .GetSection(CorsOptions.Cors)
    .Bind(corsOptions);
builder.Configuration
    .GetSection(RateLimitOptions.RateLimit)
    .Bind(rateLimitOptions);
builder.Configuration
    .GetSection(SemanticKernelOptions.SemanticKernel)
    .Bind(semanticKernelOptions);

builder.Services.ConfigureHttpJsonOptions((options) =>
{
    options.SerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
});

builder.Services.AddApplicationInsightsTelemetry();
builder.Services.AddSingleton<ITelemetryInitializer, AuthenticatedUserIdTelemetryInitializer>();

builder.Services.AddCors((options) =>
    options.AddDefaultPolicy((policy) =>
        policy.WithOrigins(corsOptions.Origins)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()));

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration);

builder.Services.AddProblemDetails();
builder.Services.AddApiVersioning((options) =>
{
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.DefaultApiVersion = new ApiVersion(1, 0);
});
builder.Services.AddHealthChecks();

builder.Services.AddRateLimiter((limiterOptions) =>
{
    limiterOptions.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, IPAddress>((context) =>
    {
        var ipAddress = context.Connection.RemoteIpAddress!;

        if (!IPAddress.IsLoopback(ipAddress))
        {
            return RateLimitPartition.GetFixedWindowLimiter(ipAddress, (_) => new FixedWindowRateLimiterOptions()
            {
                PermitLimit = rateLimitOptions.PermitLimit,
                Window = TimeSpan.FromSeconds(rateLimitOptions.Window),
                QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                QueueLimit = rateLimitOptions.QueueLimit
            });
        }

        return RateLimitPartition.GetNoLimiter(IPAddress.Loopback);
    });
    limiterOptions.OnRejected = (context, _) =>
    {
        if (context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter))
        {
            context.HttpContext.Response.Headers.RetryAfter = ((int)retryAfter.TotalSeconds).ToString(NumberFormatInfo.InvariantInfo);
        }

        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        context.HttpContext.RequestServices.GetService<ILoggerFactory>()?
            .CreateLogger("Microsoft.AspNetCore.RateLimitingMiddleware")
            .LogWarning("OnRejected: {RequestInfo}", $"{context.HttpContext.Request.Path} {context.HttpContext.Connection.RemoteIpAddress}");

        return ValueTask.CompletedTask;
    };
});

builder.Services
    .AddSignalR()
    .AddJsonProtocol((options) =>
    {
        options.PayloadSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
        options.PayloadSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
    });

builder.Services.AddSingleton<IMemoryStore, VolatileMemoryStore>();

builder.Services.Configure<ForwardedHeadersOptions>((options) =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownNetworks.Clear();
    options.KnownProxies.Clear();
});
builder.Services.Configure<SemanticKernelOptions>(builder.Configuration.GetSection(SemanticKernelOptions.SemanticKernel));
builder.Services.Configure<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme, (options) =>
{
    options.Events = new JwtBearerEvents()
    {
        OnMessageReceived = (context) =>
        {
            var path = context.HttpContext.Request.Path;
            var accessToken = context.Request.Query["access_token"];

            if (path.StartsWithSegments("/hubs") && !String.IsNullOrEmpty(accessToken))
            {
                context.Token = accessToken;
            }

            return Task.CompletedTask;
        }
    };
});

var app = builder.Build();

app.UseForwardedHeaders();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.UseExceptionHandler();
app.UseStatusCodePages();

app.MapHealthChecks("/health");

var hubsGroup = app.MapGroup("/hubs");

hubsGroup
    .MapHub<SemanticKernelHub>("/semantic-kernel")
    .RequireAuthorization();

var api = app.NewVersionedApi();

var semanticKernelGroup = api
    .MapGroup("/semantic-kernel")
    .HasApiVersion(new ApiVersion(1, 0))
    .RequireAuthorization();

semanticKernelGroup.MapGet("/skills", SemanticKernelEndpoint.GetSkills);

app.Run();

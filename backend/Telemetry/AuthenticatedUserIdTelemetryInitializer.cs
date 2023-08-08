using System.Security.Claims;
using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.Identity.Web;

namespace SKPlayground.Api.Telemetry;

public class AuthenticatedUserIdTelemetryInitializer : ITelemetryInitializer
{
    private readonly IHttpContextAccessor httpContextAccessor;

    public AuthenticatedUserIdTelemetryInitializer(IHttpContextAccessor httpContextAccessor)
    {
        this.httpContextAccessor = httpContextAccessor;
    }

    public void Initialize(ITelemetry telemetry)
    {
        if (httpContextAccessor.HttpContext?.User is not ClaimsPrincipal user || user.Identity is not { IsAuthenticated: true })
        {
            return;
        }

        telemetry.Context.User.AuthenticatedUserId = user.GetObjectId();
    }
}

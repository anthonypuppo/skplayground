using SKPlayground.Api.Hubs.Models;

namespace SKPlayground.Api.Hubs;

public interface ISemanticKernelHubClient
{
    Task ReceiveStatus(StatusCode code, string status);
}

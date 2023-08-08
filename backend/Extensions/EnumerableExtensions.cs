namespace SKPlayground.Api.Extensions;

public static class EnumerableExtensions
{
    public static IEnumerable<T>? NullIfEmpty<T>(this IEnumerable<T> enumerable)
    {
        return enumerable.Any() ? enumerable : null;
    }
}

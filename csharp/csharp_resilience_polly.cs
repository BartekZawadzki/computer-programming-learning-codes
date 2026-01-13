// Resilience z Polly: retry z jitterem i circuit-breaker dla HttpClient.
// Wymaga pakietu Polly.Extensions.Http i Microsoft.Extensions.Http.
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Polly;
using Polly.Extensions.Http;

public class CSharpPollyDemo
{
    public static async Task Main()
    {
        // Konfiguracja DI z HttpClient i politykami
        var services = new ServiceCollection();

        services.AddHttpClient("api")
            .AddPolicyHandler(GetRetryPolicy())                // retry z jitterem
            .AddPolicyHandler(GetCircuitBreakerPolicy());      // circuit breaker

        var provider = services.BuildServiceProvider();
        var clientFactory = provider.GetRequiredService<IHttpClientFactory>();
        var client = clientFactory.CreateClient("api");        // klient z politykami

        var res = await client.GetAsync("https://httpbin.org/status/200"); // wywołanie
        Console.WriteLine(res.StatusCode);                     // wypisz status
    }

    // Retry z jitterem (3 próby)
    private static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy() =>
        HttpPolicyExtensions
            .HandleTransientHttpError()                        // 5xx/408/timeout
            .OrResult(r => (int)r.StatusCode == 429)           // dodatkowo 429
            .WaitAndRetryAsync(3, attempt =>                   // 3 próby
                TimeSpan.FromMilliseconds(100 * attempt) +     // backoff liniowy
                TimeSpan.FromMilliseconds(Random.Shared.Next(0, 100))); // jitter

    // Circuit breaker: po 5 błędach otwieramy na 10s
    private static IAsyncPolicy<HttpResponseMessage> GetCircuitBreakerPolicy() =>
        HttpPolicyExtensions
            .HandleTransientHttpError()
            .CircuitBreakerAsync(5, TimeSpan.FromSeconds(10)); // 5 błędów -> przerwa 10s
}

// ---
// Dlaczego tak:
// - HttpClient z policy handlers pokazuje rekomendowany sposób nakładania retry/circuit-breaker w .NET.
// - HandleTransientHttpError + 429 adresuje typowe błędy chwilowe API.
// - WaitAndRetryAsync z jitterem redukuje ryzyko thundering herd.
// - CircuitBreakerAsync chroni backend przed zalewem przy trwałych błędach, otwierając obwód na 10s.

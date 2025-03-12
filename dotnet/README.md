# Generate .NET OpenAPI client

## Pre-requisites
You'll need the 
[OpenAPI generator CLI](https://github.com/OpenAPITools/openapi-generator) 
in order to generate Roaring API clients.


## Generating a client
Run this command to generate for .NET 9.0+:

### Bash (Linux/macOS)
```shell
properties="apiName=RoaringCompanyInfoClient,targetFramework=net9.0,validatable=true,\
nullableReferenceTypes=true,hideGenerationTimestamp=true,packageVersion=1.0.0,\
packageAuthors=Roaring,packageCompany=Roaring,\
packageCopyright='Roaring Group AB',\
packageDescription='Roaring Company Information Client',\
packageName=Roaring.CompanyInfoClient,packageTags=,\
packageTitle='Roaring Company Information Client'"

global="apiDocs=true,modelDocs=true,apiTests=true,modelTests=true"

openapi-generator-cli generate -i ./swagger.json \
  -g csharp -o company-info-client \
  --additional-properties=$properties --global-property=$global
```

### PowerShell (Windows)
```ps1
$properties = @(
    'apiName=RoaringCompanyInfoClient',
    'targetFramework=net9.0',
    'validatable=true',
    'nullableReferenceTypes=true',
    'hideGenerationTimestamp=true',
    'packageVersion=1.0.0',
    'packageAuthors=Roaring',
    'packageCompany=Roaring',
    'packageCopyright=Roaring Group AB',
    'packageDescription=Roaring Company Information Client',
    'packageName=Roaring.CompanyInfoClient',
    'packageTags=',
    'packageTitle=Roaring Company Information Client'
) -join ","

$global = @(
    'apiDocs=true',
    'modelDocs=true',
    'apiTests=true',
    'modelTests=true'
) -join ","

java -jar "<path>/openapi-generator/modules/openapi-generator-cli/target/openapi-generator-cli.jar" generate `
    -g csharp-netcore `
    -i swagger.json `
    -o company-info-client `
    --library generichost `
    --additional-properties $properties `
    --global-property $global `
```

After generation, take a look at `company-info-client/src/Roaring.CompanyInfoClient/README.md` for
more information on how to customize for your needs.

## Using the library in your project

```cs
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq; // or use System.Text.Json if preferred
using io.roaring.example.companyinfo.invoker;
using io.roaring.example.companyinfo.api;

namespace ExampleApplication
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            // Obtain the access token using client credentials.
            string clientId = Environment.GetEnvironmentVariable("clientId");
            string clientSecret = Environment.GetEnvironmentVariable("clientSecret");
            string token = await GetAccessTokenAsync(clientId, clientSecret);

            // Build the host and configure the client with the obtained token.
            IHost host = Host.CreateDefaultBuilder(args)
                .ConfigureServices((context, services) =>
                {
                    services.ConfigureRoaringCompanyInfoClient((options) =>
                    {
                        // Create an ApiKeyToken using the obtained token.
                        ApiKeyToken tokenObj = new(token, ClientUtils.ApiKeyHeader.Authorization);
                        options.AddTokens(tokenObj);

                        // Optionally, choose the provider method (default is RateLimitProvider)
                        options.UseProvider<RateLimitProvider<ApiKeyToken>, ApiKeyToken>();

                        // Configure JSON options if necessary.
                        options.ConfigureJsonOptions(jsonOptions =>
                        {
                            // Add any custom converters if needed.
                        });

                        // Configure HTTP client policies (retry, timeout, circuit breaker, etc.).
                        options.AddRoaringCompanyInfoClientHttpClients(builder => builder
                            .AddRetryPolicy(2)
                            .AddTimeoutPolicy(TimeSpan.FromSeconds(5))
                            .AddCircuitBreakerPolicy(10, TimeSpan.FromSeconds(30))
                        );
                    });
                })
                .Build();

            // Your application logic here.
            // For example, you might resolve and use DefaultApi to call the service.
            DefaultApi api = host.Services.GetRequiredService<DefaultApi>();

            try
            {
                OverviewsResult results = api.CompanyIdGet("5564779444");

                if (results.Records != null)
                {
                    foreach (var record in results.Records)
                    {
                        Console.WriteLine($"Company name: {record.CompanyName}");
                        Console.WriteLine($"Sandbox org id: {record.CompanyId}");
                    }
                }
            }
            catch (ApiException ex)
            {
                Console.Error.WriteLine($"An error occurred: {ex.Message}");
            }

            await host.RunAsync();
        }

        private static async Task<string> GetAccessTokenAsync(string clientId, string clientSecret)
        {
            // Replace with your actual token endpoint URL.
            string tokenEndpoint = "https://your-auth-server.com/token";

            using HttpClient client = new HttpClient();
            var formContent = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("grant_type", "client_credentials"),
                new KeyValuePair<string, string>("client_id", clientId),
                new KeyValuePair<string, string>("client_secret", clientSecret)
            });

            HttpResponseMessage response = await client.PostAsync(tokenEndpoint, formContent);
            response.EnsureSuccessStatusCode();

            string content = await response.Content.ReadAsStringAsync();

            // Parse the token from the JSON response.
            // This example uses Newtonsoft.Json; adjust as needed for your JSON library.
            var json = JObject.Parse(content);
            string accessToken = json["access_token"]?.ToString();

            if (string.IsNullOrEmpty(accessToken))
            {
                throw new Exception("Failed to retrieve access token.");
            }

            return accessToken;
        }
    }
}
```


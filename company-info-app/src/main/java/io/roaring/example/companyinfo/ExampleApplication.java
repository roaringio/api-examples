package io.roaring.example.companyinfo;

import io.roaring.example.companyinfo.invoker.ApiClient;
import io.roaring.example.companyinfo.invoker.ApiException;
import io.roaring.example.companyinfo.model.OverviewsResult;

import java.util.HashMap;

public class ExampleApplication {

    public static void main(String[] args) {
        String clientId = System.getProperty("clientId");
        String clientSecret = System.getProperty("clientSecret");
        ApiClient apiClient = new ApiClient(
                clientId,
                clientSecret,
                new HashMap<>()
        );
        io.roaring.example.companyinfo.api.DefaultApi api =
                new io.roaring.example.companyinfo.api.DefaultApi(apiClient);
        try {
            // Get the overview of a company by its sandbox org id
            OverviewsResult results = api.companyIdGet("5564779444");
            assert results.getRecords() != null;
            results.getRecords().forEach(record -> {
                System.out.printf("Company name: %s%n", record.getCompanyName());
                System.out.printf("Sandbox org id: %s%n", record.getCompanyId());
            });
        } catch (ApiException e) {
            throw new RuntimeException(e);
        }
    }
}

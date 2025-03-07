package io.roaring.example.overview;

import io.roaring.example.overview.invoker.ApiClient;
import io.roaring.example.overview.invoker.ApiException;
import io.roaring.example.overview.model.OverviewsResult;

import java.util.HashMap;

public class OverviewExampleApplication {

	public static void main(String[] args) {
        String clientId = System.getProperty("clientId");
        String clientSecret = System.getProperty("clientSecret");
        ApiClient apiClient = new ApiClient(
                clientId,
                clientSecret,
                new HashMap<>()
        );
		io.roaring.example.overview.api.DefaultApi api = new io.roaring.example.overview.api.DefaultApi(apiClient);
        try {
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

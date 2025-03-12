# DefaultApi

All URIs are relative to *https://api.roaring.io/se/company/overview/2.0*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**companyIdGet**](DefaultApi.md#companyIdGet) | **GET** /{companyId} | Find overview by company id |
| [**historyCompanyIdGet**](DefaultApi.md#historyCompanyIdGet) | **GET** /history/{companyId} | Find history overview by company id |
| [**rootPost**](DefaultApi.md#rootPost) | **POST** / | Find overviews by companies id-s |


<a id="companyIdGet"></a>
# **companyIdGet**
> OverviewsResult companyIdGet(companyId)

Find overview by company id

It supports date parameter to find overview up to date

### Example
```java
// Import classes:
import io.roaring.example.companyinfo.invoker.ApiClient;
import io.roaring.example.companyinfo.invoker.ApiException;
import io.roaring.example.companyinfo.invoker.Configuration;
import io.roaring.example.companyinfo.invoker.models.*;
import io.roaring.example.companyinfo.api.DefaultApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.roaring.io/se/company/overview/2.0");

    DefaultApi apiInstance = new DefaultApi(defaultClient);
    String companyId = "companyId_example"; // String | id of company
    try {
      OverviewsResult result = apiInstance.companyIdGet(companyId);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DefaultApi#companyIdGet");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **companyId** | **String**| id of company | |

### Return type

[**OverviewsResult**](OverviewsResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK, successfull response |  -  |
| **400** | Returned when something is wrong in the request, e.g. failed argument validation or arguments are missing |  -  |
| **404** | Requested resource could not be found |  -  |
| **500** | An internal server error occurred, please contact the system administrator with information on the error |  -  |

<a id="historyCompanyIdGet"></a>
# **historyCompanyIdGet**
> OverviewsResult historyCompanyIdGet(companyId, fromDate, toDate)

Find history overview by company id

Changes of the company within specified date range. The range includes \&quot;from\&quot; and excludes \&quot;to\&quot;.

### Example
```java
// Import classes:
import io.roaring.example.companyinfo.invoker.ApiClient;
import io.roaring.example.companyinfo.invoker.ApiException;
import io.roaring.example.companyinfo.invoker.Configuration;
import io.roaring.example.companyinfo.invoker.models.*;
import io.roaring.example.companyinfo.api.DefaultApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.roaring.io/se/company/overview/2.0");

    DefaultApi apiInstance = new DefaultApi(defaultClient);
    String companyId = "companyId_example"; // String | id of company
    String fromDate = "fromDate_example"; // String | beginning of the date range (including), iso 8601 format
    String toDate = "toDate_example"; // String | ending of the date range (excluding), iso 8601 format
    try {
      OverviewsResult result = apiInstance.historyCompanyIdGet(companyId, fromDate, toDate);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DefaultApi#historyCompanyIdGet");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **companyId** | **String**| id of company | |
| **fromDate** | **String**| beginning of the date range (including), iso 8601 format | [optional] |
| **toDate** | **String**| ending of the date range (excluding), iso 8601 format | [optional] |

### Return type

[**OverviewsResult**](OverviewsResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK, successfull response |  -  |
| **400** | Returned when something is wrong in the request, e.g. failed argument validation or arguments are missing |  -  |
| **404** | Requested resource could not be found |  -  |
| **500** | An internal server error occurred, please contact the system administrator with information on the error |  -  |

<a id="rootPost"></a>
# **rootPost**
> MultiCompaniesOverviewsResult rootPost(multiCompanyRequest)

Find overviews by companies id-s

It supports date parameter to find overviews up to date

### Example
```java
// Import classes:
import io.roaring.example.companyinfo.invoker.ApiClient;
import io.roaring.example.companyinfo.invoker.ApiException;
import io.roaring.example.companyinfo.invoker.Configuration;
import io.roaring.example.companyinfo.invoker.models.*;
import io.roaring.example.companyinfo.api.DefaultApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.roaring.io/se/company/overview/2.0");

    DefaultApi apiInstance = new DefaultApi(defaultClient);
    MultiCompanyRequest multiCompanyRequest = new MultiCompanyRequest(); // MultiCompanyRequest | request body with companies identifiers to lookup
    try {
      MultiCompaniesOverviewsResult result = apiInstance.rootPost(multiCompanyRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DefaultApi#rootPost");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **multiCompanyRequest** | [**MultiCompanyRequest**](MultiCompanyRequest.md)| request body with companies identifiers to lookup | |

### Return type

[**MultiCompaniesOverviewsResult**](MultiCompaniesOverviewsResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK, successfull response |  -  |
| **400** | Returned when something is wrong in the request, e.g. failed argument validation or arguments are missing |  -  |
| **404** | Requested resource could not be found |  -  |
| **500** | An internal server error occurred, please contact the system administrator with information on the error |  -  |


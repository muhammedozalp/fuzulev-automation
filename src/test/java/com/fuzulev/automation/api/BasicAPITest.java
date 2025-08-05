package com.fuzulev.automation.api;

import com.fuzulev.automation.BaseTest;

import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Test;
import static io.restassured.RestAssured.given;

/**
 * BasicAPITest class for testing fuzulev.com.tr API endpoints and responses
 * Tests cover HTTP status codes, response times, and basic API functionality
 */
public class BasicAPITest extends BaseTest {
    
    /**
     * Test homepage returns correct HTTP status
     */
    @Test(priority = 1, groups = {"api", "smoke"})
    public void testHomepageHTTPStatus() {
        logTestStep("Testing homepage HTTP status code");
        
        // Use remote URL for API testing (local server might not have full API)
        String testUrl = baseUrl.contains("127.0.0.1") ? 
            "https://www.fuzulev.com.tr" : baseUrl;
        
        Response response = given()
            .when()
            .get(testUrl)
            .then()
            .extract()
            .response();
        
        int statusCode = response.getStatusCode();
        long responseTime = response.getTime();
        
        logTestResult("HTTP Status Code: " + statusCode, statusCode == 200);
        logTestResult("Response Time: " + responseTime + "ms", responseTime < 5000);
        
        Assert.assertEquals(statusCode, 200, "Homepage should return HTTP 200");
        Assert.assertTrue(responseTime < 5000, "Response time should be under 5 seconds");
        
        System.out.println("✅ Homepage HTTP status test completed");
    }
    
    /**
     * Test basic page content via HTTP response
     */
    @Test(priority = 2, groups = {"api", "content"})
    public void testBasicHTMLContent() {
        logTestStep("Testing basic HTML content via API");
        
        String testUrl = baseUrl.contains("127.0.0.1") ? 
            "https://www.fuzulev.com.tr" : baseUrl;
        
        Response response = given()
            .when()
            .get(testUrl)
            .then()
            .extract()
            .response();
        
        String responseBody = response.getBody().asString();
        String contentType = response.getContentType();
        
        // Basic HTML structure checks
        boolean hasHtmlTag = responseBody.contains("<html") || responseBody.contains("<HTML");
        boolean hasHeadTag = responseBody.contains("<head") || responseBody.contains("<HEAD");
        boolean hasBodyTag = responseBody.contains("<body") || responseBody.contains("<BODY");
        boolean hasTitleTag = responseBody.contains("<title") || responseBody.contains("<TITLE");
        
        logTestResult("Content-Type: " + contentType, contentType.contains("text/html"));
        logTestResult("Contains HTML tag: " + hasHtmlTag, hasHtmlTag);
        logTestResult("Contains HEAD tag: " + hasHeadTag, hasHeadTag);
        logTestResult("Contains BODY tag: " + hasBodyTag, hasBodyTag);
        logTestResult("Contains TITLE tag: " + hasTitleTag, hasTitleTag);
        
        Assert.assertTrue(contentType.contains("text/html"), "Content-Type should be HTML");
        Assert.assertTrue(hasHtmlTag, "Response should contain HTML tag");
        Assert.assertTrue(hasBodyTag, "Response should contain BODY tag");
        
        System.out.println("✅ Basic HTML content test completed");
    }
    
    /**
     * Test website accessibility via HTTP headers
     */
    @Test(priority = 3, groups = {"api", "security"})
    public void testHTTPHeaders() {
        logTestStep("Testing HTTP response headers");
        
        String testUrl = baseUrl.contains("127.0.0.1") ? 
            "https://www.fuzulev.com.tr" : baseUrl;
        
        Response response = given()
            .when()
            .get(testUrl)
            .then()
            .extract()
            .response();
        
        // Check important headers
        String serverHeader = response.getHeader("Server");
        String contentTypeHeader = response.getHeader("Content-Type");
        String cacheControlHeader = response.getHeader("Cache-Control");
        
        logTestResult("Server header present: " + (serverHeader != null), serverHeader != null);
        logTestResult("Content-Type header: " + contentTypeHeader, contentTypeHeader != null);
        logTestResult("Cache-Control header: " + cacheControlHeader, true); // Optional
        
        Assert.assertNotNull(contentTypeHeader, "Content-Type header should be present");
        
        System.out.println("✅ HTTP headers test completed");
    }
    
    /**
     * Test multiple HTTP methods if supported
     */
    @Test(priority = 4, groups = {"api"})
    public void testHTTPMethods() {
        logTestStep("Testing different HTTP methods");
        
        String testUrl = baseUrl.contains("127.0.0.1") ? 
            "https://www.fuzulev.com.tr" : baseUrl;
        
        // Test HEAD method
        Response headResponse = given()
            .when()
            .head(testUrl)
            .then()
            .extract()
            .response();
        
        int headStatusCode = headResponse.getStatusCode();
        logTestResult("HEAD method status: " + headStatusCode, headStatusCode == 200 || headStatusCode == 405);
        
        // HEAD should return 200 or 405 (Method Not Allowed) - both are acceptable
        Assert.assertTrue(headStatusCode == 200 || headStatusCode == 405, 
            "HEAD method should return 200 or 405");
        
        System.out.println("✅ HTTP methods test completed");
    }
    
    /**
     * Test API performance and reliability
     */
    @Test(priority = 5, groups = {"api", "performance"})
    public void testAPIPerformance() {
        logTestStep("Testing API performance metrics");
        
        String testUrl = baseUrl.contains("127.0.0.1") ? 
            "https://www.fuzulev.com.tr" : baseUrl;
        
        long totalTime = 0;
        int successfulRequests = 0;
        int totalRequests = 3;
        
        for (int i = 0; i < totalRequests; i++) {
            try {
                Response response = given()
                    .when()
                    .get(testUrl)
                    .then()
                    .extract()
                    .response();
                
                if (response.getStatusCode() == 200) {
                    successfulRequests++;
                    totalTime += response.getTime();
                }
                
                // Small delay between requests
                Thread.sleep(1000);
                
            } catch (Exception e) {
                System.out.println("Request " + (i+1) + " failed: " + e.getMessage());
            }
        }
        
        double averageResponseTime = successfulRequests > 0 ? (double) totalTime / successfulRequests : 0;
        double successRate = (double) successfulRequests / totalRequests * 100;
        
        logTestResult("Successful requests: " + successfulRequests + "/" + totalRequests, successfulRequests > 0);
        logTestResult("Average response time: " + String.format("%.2f", averageResponseTime) + "ms", averageResponseTime < 10000);
        logTestResult("Success rate: " + String.format("%.1f", successRate) + "%", successRate >= 66.7);
        
        Assert.assertTrue(successfulRequests > 0, "At least one request should succeed");
        Assert.assertTrue(successRate >= 66.7, "Success rate should be at least 66.7%");
        
        System.out.println("✅ API performance test completed");
    }
}
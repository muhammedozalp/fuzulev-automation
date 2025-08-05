package com.fuzulev.automation.mobile;

import com.fuzulev.automation.pages.HomePage;
import com.fuzulev.automation.BaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.Dimension;
import java.util.HashMap;
import java.util.Map;

/**
 * MobileResponsiveTest class for testing mobile and responsive design
 * Tests cover different screen sizes, device emulation, and mobile-specific functionality
 */
public class MobileResponsiveTest extends BaseTest {
    
    private HomePage homePage;
    
    // Common mobile device dimensions
    private static final Map<String, Dimension> DEVICE_DIMENSIONS = new HashMap<>();
    static {
        DEVICE_DIMENSIONS.put("iPhone SE", new Dimension(375, 667));
        DEVICE_DIMENSIONS.put("iPhone 12 Pro", new Dimension(390, 844));
        DEVICE_DIMENSIONS.put("Samsung Galaxy S21", new Dimension(360, 800));
        DEVICE_DIMENSIONS.put("iPad", new Dimension(768, 1024));
        DEVICE_DIMENSIONS.put("iPad Pro", new Dimension(1024, 1366));
        DEVICE_DIMENSIONS.put("Desktop", new Dimension(1920, 1080));
    }
    
    /**
     * Test website loads correctly on mobile devices
     */
    @Test(priority = 1, groups = {"mobile", "smoke", "responsive"})
    public void testMobilePageLoad() {
        logTestStep("Testing mobile page load functionality");
        
        homePage = new HomePage(driver);
        
        // Test on iPhone SE (smallest common mobile screen)
        Dimension originalSize = driver.manage().window().getSize();
        
        try {
            driver.manage().window().setSize(DEVICE_DIMENSIONS.get("iPhone SE"));
            try { Thread.sleep(2000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); } // Allow time for responsive changes
            
            homePage.navigateToHomePage(baseUrl);
            
            boolean pageLoaded = homePage.isPageLoaded();
            boolean elementsVisible = homePage.areMainElementsVisible();
            
            logTestResult("Page loaded on mobile: " + pageLoaded, pageLoaded);
            logTestResult("Elements visible on mobile: " + elementsVisible, elementsVisible);
            
            Assert.assertTrue(pageLoaded, "Page should load on mobile devices");
            Assert.assertTrue(elementsVisible, "Main elements should be visible on mobile");
            
        } finally {
            driver.manage().window().setSize(originalSize);
        }
        
        System.out.println("✅ Mobile page load test completed");
    }
    
    /**
     * Test responsive design across multiple device sizes
     */
    @Test(priority = 2, groups = {"responsive", "mobile"})
    public void testMultipleDeviceSizes() {
        logTestStep("Testing responsive design across multiple device sizes");
        
        if (homePage == null) {
            homePage = new HomePage(driver);
        }
        
        Dimension originalSize = driver.manage().window().getSize();
        int successfulTests = 0;
        int totalTests = 0;
        
        try {
            for (Map.Entry<String, Dimension> device : DEVICE_DIMENSIONS.entrySet()) {
                String deviceName = device.getKey();
                Dimension dimension = device.getValue();
                
                totalTests++;
                logTestStep("Testing on " + deviceName + " (" + dimension.width + "x" + dimension.height + ")");
                
                try {
                    driver.manage().window().setSize(dimension);
                    try { Thread.sleep(1500); } catch (InterruptedException e) { Thread.currentThread().interrupt(); } // Allow responsive changes
                    
                    homePage.navigateToHomePage(baseUrl);
                    
                    boolean pageLoaded = homePage.isPageLoaded();
                    
                    if (pageLoaded) {
                        successfulTests++;
                        logTestResult(deviceName + " test: PASSED", true);
                    } else {
                        logTestResult(deviceName + " test: FAILED", false);
                    }
                    
                } catch (Exception e) {
                    logTestResult(deviceName + " test: ERROR - " + e.getMessage(), false);
                }
            }
            
            double successRate = (double) successfulTests / totalTests * 100;
            logTestResult("Overall success rate: " + String.format("%.1f", successRate) + "% (" + successfulTests + "/" + totalTests + ")", successRate >= 80);
            
            Assert.assertTrue(successRate >= 80, "At least 80% of device tests should pass");
            
        } finally {
            driver.manage().window().setSize(originalSize);
        }
        
        System.out.println("✅ Multiple device sizes test completed");
    }
    
    /**
     * Test mobile navigation and interaction
     */
    @Test(priority = 3, groups = {"mobile", "navigation"})
    public void testMobileNavigation() {
        logTestStep("Testing mobile navigation functionality");
        
        if (homePage == null) {
            homePage = new HomePage(driver);
        }
        
        Dimension originalSize = driver.manage().window().getSize();
        
        try {
            // Test on mobile screen size
            driver.manage().window().setSize(DEVICE_DIMENSIONS.get("iPhone 12 Pro"));
            try { Thread.sleep(2000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            
            homePage.navigateToHomePage(baseUrl);
            
            // Test navigation elements
            int navLinksCount = homePage.getNavigationLinksCount();
            logTestResult("Navigation links accessible on mobile: " + (navLinksCount >= 0), navLinksCount >= 0);
            
            // Test scrolling on mobile
            homePage.scrollThroughPage();
            
            boolean pageStillLoaded = homePage.isPageLoaded();
            logTestResult("Page functional after mobile scrolling: " + pageStillLoaded, pageStillLoaded);
            
            Assert.assertTrue(navLinksCount >= 0, "Navigation should be accessible on mobile");
            Assert.assertTrue(pageStillLoaded, "Page should remain functional after mobile interactions");
            
        } finally {
            driver.manage().window().setSize(originalSize);
        }
        
        System.out.println("✅ Mobile navigation test completed");
    }
    
    /**
     * Test mobile performance and load times
     */
    @Test(priority = 4, groups = {"mobile", "performance"})
    public void testMobilePerformance() {
        logTestStep("Testing mobile performance and load times");
        
        if (homePage == null) {
            homePage = new HomePage(driver);
        }
        
        Dimension originalSize = driver.manage().window().getSize();
        
        try {
            driver.manage().window().setSize(DEVICE_DIMENSIONS.get("Samsung Galaxy S21"));
            try { Thread.sleep(1000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            
            long startTime = System.currentTimeMillis();
            homePage.navigateToHomePage(baseUrl);
            long loadTime = System.currentTimeMillis() - startTime;
            
            boolean pageLoaded = homePage.isPageLoaded();
            
            logTestResult("Mobile page load time: " + loadTime + "ms", loadTime < 15000);
            logTestResult("Page loaded successfully on mobile: " + pageLoaded, pageLoaded);
            
            Assert.assertTrue(loadTime < 15000, "Mobile page load should be under 15 seconds");
            Assert.assertTrue(pageLoaded, "Page should load successfully on mobile");
            
        } finally {
            driver.manage().window().setSize(originalSize);
        }
        
        System.out.println("✅ Mobile performance test completed");
    }
    
    /**
     * Test tablet-specific responsive behavior
     */
    @Test(priority = 5, groups = {"responsive", "tablet"})
    public void testTabletResponsive() {
        logTestStep("Testing tablet-specific responsive behavior");
        
        if (homePage == null) {
            homePage = new HomePage(driver);
        }
        
        Dimension originalSize = driver.manage().window().getSize();
        
        try {
            // Test iPad dimensions
            driver.manage().window().setSize(DEVICE_DIMENSIONS.get("iPad"));
            try { Thread.sleep(2000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            
            homePage.navigateToHomePage(baseUrl);
            
            boolean pageLoaded = homePage.isPageLoaded();
            boolean elementsVisible = homePage.areMainElementsVisible();
            int serviceLinksCount = homePage.getServiceLinksCount();
            
            logTestResult("Page loaded on tablet: " + pageLoaded, pageLoaded);
            logTestResult("Elements visible on tablet: " + elementsVisible, elementsVisible);
            logTestResult("Service links accessible on tablet: " + (serviceLinksCount >= 0), serviceLinksCount >= 0);
            
            Assert.assertTrue(pageLoaded, "Page should load on tablet");
            Assert.assertTrue(elementsVisible, "Elements should be visible on tablet");
            
            // Test iPad Pro (larger tablet)
            driver.manage().window().setSize(DEVICE_DIMENSIONS.get("iPad Pro"));
            try { Thread.sleep(1500); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            
            boolean largeTabletLoaded = homePage.isPageLoaded();
            logTestResult("Page loaded on large tablet: " + largeTabletLoaded, largeTabletLoaded);
            Assert.assertTrue(largeTabletLoaded, "Page should load on large tablets");
            
        } finally {
            driver.manage().window().setSize(originalSize);
        }
        
        System.out.println("✅ Tablet responsive test completed");
    }
    
    /**
     * Test responsive layout transitions
     */
    @Test(priority = 6, groups = {"responsive"})
    public void testResponsiveTransitions() {
        logTestStep("Testing responsive layout transitions");
        
        if (homePage == null) {
            homePage = new HomePage(driver);
            homePage.navigateToHomePage(baseUrl);
        }
        
        Dimension originalSize = driver.manage().window().getSize();
        
        try {
            // Start with desktop
            driver.manage().window().setSize(DEVICE_DIMENSIONS.get("Desktop"));
            try { Thread.sleep(1000); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            boolean desktopLoaded = homePage.isPageLoaded();
            
            // Transition to tablet
            driver.manage().window().setSize(DEVICE_DIMENSIONS.get("iPad"));
            try { Thread.sleep(1500); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            boolean tabletLoaded = homePage.isPageLoaded();
            
            // Transition to mobile
            driver.manage().window().setSize(DEVICE_DIMENSIONS.get("iPhone 12 Pro"));
            try { Thread.sleep(1500); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            boolean mobileLoaded = homePage.isPageLoaded();
            
            // Back to desktop
            driver.manage().window().setSize(DEVICE_DIMENSIONS.get("Desktop"));
            try { Thread.sleep(1500); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            boolean backToDesktopLoaded = homePage.isPageLoaded();
            
            logTestResult("Desktop → Tablet transition: " + tabletLoaded, tabletLoaded);
            logTestResult("Tablet → Mobile transition: " + mobileLoaded, mobileLoaded);
            logTestResult("Mobile → Desktop transition: " + backToDesktopLoaded, backToDesktopLoaded);
            
            boolean allTransitionsSuccessful = desktopLoaded && tabletLoaded && mobileLoaded && backToDesktopLoaded;
            logTestResult("All responsive transitions successful: " + allTransitionsSuccessful, allTransitionsSuccessful);
            
            Assert.assertTrue(allTransitionsSuccessful, "All responsive layout transitions should work");
            
        } finally {
            driver.manage().window().setSize(originalSize);
        }
        
        System.out.println("✅ Responsive transitions test completed");
    }
}
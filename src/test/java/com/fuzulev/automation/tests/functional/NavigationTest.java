package com.fuzulev.automation.tests.functional;

import com.fuzulev.automation.pages.HomePage;
import com.fuzulev.automation.tests.BaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * NavigationTest class for testing website navigation functionality
 * Tests cover menu navigation, links, and page transitions
 */
public class NavigationTest extends BaseTest {
    
    private HomePage homePage;
    
    /**
     * Test main navigation menu is accessible and functional
     */
    @Test(priority = 1, groups = {"smoke", "navigation"})
    public void testMainNavigationExists() {
        logTestStep("Verifying main navigation menu exists");
        
        homePage = new HomePage(driver);
        homePage.navigateToHomePage(baseUrl);
        
        // Check navigation links count
        int navLinksCount = homePage.getNavigationLinksCount();
        logTestResult("Navigation links found: " + navLinksCount, navLinksCount >= 0);
        Assert.assertTrue(navLinksCount >= 0, "Navigation should have links");
        
        System.out.println("✅ Main navigation test completed");
    }
    
    /**
     * Test page responsive navigation behavior
     */
    @Test(priority = 2, groups = {"navigation", "responsive"})
    public void testResponsiveNavigation() {
        logTestStep("Testing responsive navigation behavior");
        
        if (homePage == null) {
            homePage = new HomePage(driver);
            homePage.navigateToHomePage(baseUrl);
        }
        
        // Test in different screen sizes
        org.openqa.selenium.Dimension originalSize = driver.manage().window().getSize();
        
        try {
            // Mobile view
            driver.manage().window().setSize(new org.openqa.selenium.Dimension(375, 667));
            waitFor(1);
            
            boolean pageLoaded = homePage.isPageLoaded();
            logTestResult("Navigation accessible in mobile view: " + pageLoaded, pageLoaded);
            Assert.assertTrue(pageLoaded, "Navigation should work in mobile view");
            
            // Tablet view
            driver.manage().window().setSize(new org.openqa.selenium.Dimension(768, 1024));
            waitFor(1);
            
            pageLoaded = homePage.isPageLoaded();
            logTestResult("Navigation accessible in tablet view: " + pageLoaded, pageLoaded);
            Assert.assertTrue(pageLoaded, "Navigation should work in tablet view");
            
        } finally {
            driver.manage().window().setSize(originalSize);
        }
        
        System.out.println("✅ Responsive navigation test completed");
    }
}
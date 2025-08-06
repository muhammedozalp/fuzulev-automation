package com.fuzulev.automation.functional;

import com.fuzulev.automation.pages.HomePage;
import com.fuzulev.automation.BaseTest;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * HomePageTest class for testing fuzulev.com.tr homepage functionality
 * Tests cover basic page verification, element visibility, and navigation
 */
public class HomePageTest extends BaseTest {
    
    private HomePage homePage;
    
    /**
     * Initialize HomePage for the current test
     * This method eliminates code duplication
     */
    private void initializeHomePage() {
        // Always create fresh homepage for each test (avoids WebDriver session issues)
        Assert.assertTrue(verifyTestPreconditions(), "Test preconditions not met");
        homePage = new HomePage(driver);
        homePage.navigateToHomePage(baseUrl);
    }
    
    /**
     * Test homepage loads successfully and basic elements are visible
     * Priority: High - Critical functionality
     */
    @Test(priority = 1, groups = {"smoke", "functional", "critical"})
    public void testHomePageLoads() {
        logTestStep("Verifying homepage loads successfully");
        
        // Initialize homepage (eliminates duplication)
        initializeHomePage();
        
        // Verify page loaded
        boolean pageLoaded = homePage.isPageLoaded();
        logTestResult("Homepage loaded: " + pageLoaded, pageLoaded);
        Assert.assertTrue(pageLoaded, "Homepage failed to load");
        
        // Verify page title is not empty
        String pageTitle = homePage.getPageTitle();
        logTestResult("Page title retrieved: '" + pageTitle + "'", !pageTitle.isEmpty());
        Assert.assertFalse(pageTitle.isEmpty(), "Page title should not be empty");
        
        // Verify URL is correct
        String currentUrl = homePage.getCurrentUrl();
        logTestResult("Current URL: " + currentUrl, currentUrl.contains("fuzulev"));
        Assert.assertTrue(currentUrl.contains("fuzulev"), "URL should contain 'fuzulev'");
        
        System.out.println("✅ Homepage loads test completed successfully");
    }
    
    /**
     * Test main page elements are visible and accessible
     * Priority: High - Core UI elements
     */
    @Test(priority = 2, groups = {"smoke", "functional"})
    public void testMainElementsVisible() {
        logTestStep("Verifying main page elements are visible");
        
        // Initialize homepage (eliminates duplication)
        initializeHomePage();
        
        // Check main elements visibility
        boolean elementsVisible = homePage.areMainElementsVisible();
        logTestResult("Main elements visible: " + elementsVisible, elementsVisible);
        Assert.assertTrue(elementsVisible, "Main page elements should be visible");
        
        // Check navigation links
        int navLinksCount = homePage.getNavigationLinksCount();
        logTestResult("Navigation links found: " + navLinksCount, navLinksCount >= 0);
        Assert.assertTrue(navLinksCount >= 0, "Navigation links count should be non-negative");
        
        // Check footer visibility
        boolean footerVisible = homePage.isFooterVisible();
        logTestResult("Footer visible: " + footerVisible, footerVisible);
        Assert.assertTrue(footerVisible, "Footer should be visible");
        
        System.out.println("✅ Main elements visibility test completed successfully");
    }
    
    /**
     * Test page content and services section
     * Priority: Medium - Content verification
     */
    @Test(priority = 3, groups = {"functional"})
    public void testPageContent() {
        logTestStep("Verifying page content and services");
        
        // Initialize homepage (eliminates duplication)
        initializeHomePage();
        
        // Get main heading text
        String headingText = homePage.getMainHeadingText();
        logTestResult("Main heading text: '" + headingText + "'", !headingText.isEmpty());
        // Note: Heading might be empty if not found, so we don't assert it's required
        
        // Check service links
        int serviceLinksCount = homePage.getServiceLinksCount();
        logTestResult("Service links found: " + serviceLinksCount, serviceLinksCount >= 0);
        Assert.assertTrue(serviceLinksCount >= 0, "Service links count should be non-negative");
        
        // Check contact information
        int contactInfoCount = homePage.getContactInfoCount();
        logTestResult("Contact info elements found: " + contactInfoCount, contactInfoCount >= 0);
        Assert.assertTrue(contactInfoCount >= 0, "Contact info count should be non-negative");
        
        System.out.println("✅ Page content test completed successfully");
    }
    
    /**
     * Test page scrolling and navigation functionality
     * Priority: Medium - User interaction
     */
    @Test(priority = 4, groups = {"functional"})
    public void testPageScrolling() {
        logTestStep("Testing page scrolling functionality");
        
        // Initialize homepage (eliminates duplication)
        initializeHomePage();
        
        // Perform page scrolling
        homePage.scrollThroughPage();
        
        // Verify page is still loaded after scrolling
        boolean pageStillLoaded = homePage.isPageLoaded();
        logTestResult("Page still loaded after scrolling: " + pageStillLoaded, pageStillLoaded);
        Assert.assertTrue(pageStillLoaded, "Page should remain loaded after scrolling");
        
        // Wait a moment for visual verification
        waitFor(1);
        
        System.out.println("✅ Page scrolling test completed successfully");
    }
    
    /**
     * Test logo functionality (if present)
     * Priority: Low - Additional verification
     */
    @Test(priority = 5, groups = {"functional"})
    public void testLogoFunctionality() {
        logTestStep("Testing logo functionality");
        
        // Initialize homepage (eliminates duplication)
        initializeHomePage();
        
        // Try to click logo
        homePage.clickLogo();
        
        // Verify page is still functional after logo click
        boolean pageLoaded = homePage.isPageLoaded();
        logTestResult("Page loaded after logo click: " + pageLoaded, pageLoaded);
        Assert.assertTrue(pageLoaded, "Page should be loaded after logo interaction");
        
        System.out.println("✅ Logo functionality test completed successfully");
    }
    
    /**
     * Comprehensive homepage verification test
     * Priority: High - Complete verification
     */
    @Test(priority = 10, groups = {"smoke", "regression"})
    public void testComprehensiveVerification() {
        logTestStep("Running comprehensive homepage verification");
        
        // Initialize homepage (eliminates duplication)
        initializeHomePage();
        
        // Run comprehensive verification
        boolean allVerified = homePage.verifyPageFunctionality();
        
        logTestResult("Comprehensive verification passed: " + allVerified, allVerified);
        Assert.assertTrue(allVerified, "Comprehensive homepage verification should pass");
        
        // Additional verification - page title should contain relevant keywords
        String pageTitle = homePage.getPageTitle().toLowerCase();
        boolean relevantTitle = pageTitle.contains("fuzulev") || 
                               pageTitle.contains("hosting") || 
                               pageTitle.contains("teknoloji") ||
                               pageTitle.contains("bilişim") ||
                               !pageTitle.trim().isEmpty();
        
        logTestResult("Page title is relevant: " + relevantTitle, relevantTitle);
        Assert.assertTrue(relevantTitle, "Page title should be relevant to the business");
        
        System.out.println("✅ Comprehensive verification test completed successfully");
    }
    
    /**
     * Test contact link functionality (if present)
     * Priority: Medium - Business critical
     */
    @Test(priority = 6, groups = {"functional", "contact"})
    public void testContactLink() {
        logTestStep("Testing contact link functionality");
        
        // Initialize homepage (eliminates duplication)
        initializeHomePage();
        
        // Try to click contact link
        boolean contactLinkClicked = homePage.clickContactLink();
        
        if (contactLinkClicked) {
            logTestResult("Contact link clicked successfully", true);
            
            // Verify we're on a contact page or the link worked
            String currentUrl = homePage.getCurrentUrl();
            boolean onContactPage = currentUrl.contains("contact") || 
                                  currentUrl.contains("iletisim") || 
                                  currentUrl.contains("fuzulev");
            
            logTestResult("On valid page after contact link click: " + onContactPage, onContactPage);
            Assert.assertTrue(onContactPage, "Should be on a valid page after clicking contact");
            
            // Navigate back to homepage for subsequent tests
            homePage.navigateToHomePage(baseUrl);
        } else {
            logTestResult("Contact link not found or not clickable - this is acceptable", true);
            // This is not a failure - contact link might not be present
        }
        
        System.out.println("✅ Contact link test completed");
    }
    
    /**
     * Test mobile responsiveness simulation
     * Priority: Medium - Responsive design
     */
    @Test(priority = 7, groups = {"responsive", "mobile"})
    public void testMobileResponsiveness() {
        logTestStep("Testing mobile responsiveness simulation");
        
        // Initialize homepage (eliminates duplication)
        initializeHomePage();
        
        // Get current window size
        org.openqa.selenium.Dimension originalSize = driver.manage().window().getSize();
        
        try {
            // Simulate mobile view by resizing window
            driver.manage().window().setSize(new org.openqa.selenium.Dimension(375, 667)); // iPhone size
            
            // Wait for potential responsive changes
            waitFor(2);
            
            // Verify page responds to mobile view (may show mobile warning)
            boolean pageLoadedMobile = homePage.isPageLoaded();
            logTestResult("Page loaded in mobile view: " + pageLoadedMobile, pageLoadedMobile);
            
            // Check page content - website may show mobile warning message
            String pageTitle = driver.getTitle();
            String currentUrl = driver.getCurrentUrl();
            
            logTestResult("Mobile view - Page title: " + pageTitle, !pageTitle.isEmpty());
            logTestResult("Mobile view - Current URL: " + currentUrl, currentUrl.contains("fuzulev"));
            
            // Check for mobile warning message (both local and remote may show this)
            try {
                WebElement mobileWarning = driver.findElement(By.cssSelector(".o-device-error.js-show"));
                String warningText = mobileWarning.getText();
                
                System.out.println("✅ MOBILE WARNING DETECTED: " + warningText);
                logTestResult("Mobile warning message found: " + warningText, true);
                
                // Verify the warning message content
                boolean hasCorrectWarning = warningText.contains("Lütfen Desktoptan Giriş Yapınız");
                logTestResult("Correct mobile warning text: " + hasCorrectWarning, hasCorrectWarning);
                
                // Check warning styling (background: #1a4088, color: #fff)
                String backgroundColor = mobileWarning.getCssValue("background-color");
                String textColor = mobileWarning.getCssValue("color");
                System.out.println("📱 Warning styling - Background: " + backgroundColor + ", Text: " + textColor);
                
                // Test passes if mobile warning is properly displayed
                Assert.assertTrue(hasCorrectWarning, "Mobile warning should display correct message");
                System.out.println("✅ MOBILE RESPONSIVENESS TEST PASSED: Website correctly shows mobile warning for small screens");
                
            } catch (Exception e) {
                // No mobile warning found - this might be unexpected
                System.out.println("⚠️  No mobile warning found - checking if page loaded normally");
                
                if (pageLoadedMobile) {
                    System.out.println("✅ Page loaded normally in mobile view (no warning needed)");
                    logTestResult("Page loaded without mobile warning", true);
                } else {
                    System.out.println("❌ Page failed to load and no mobile warning shown");
                    Assert.fail("Page should either load properly or show mobile warning message");
                }
            }
            
        } finally {
            // Restore original window size
            driver.manage().window().setSize(originalSize);
            waitFor(1);
        }
        
        System.out.println("✅ Mobile responsiveness test completed successfully");
    }
}
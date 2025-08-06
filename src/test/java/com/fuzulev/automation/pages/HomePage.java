package com.fuzulev.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import java.util.List;

/**
 * HomePage class for fuzulev.com.tr website
 * Contains page elements and methods specific to the homepage
 */
public class HomePage extends BasePage {
    
    // Page URL patterns
    private static final String HOME_URL_PATTERN = ".*fuzulev.*";

    
    // Header elements
    @FindBy(css = "header.o-header")
    private WebElement headerSection;
    
    @FindBy(css = ".o-header__logo")
    private WebElement logoImage;
    
    @FindBy(css = ".o-nav__item")
    private List<WebElement> navigationLinks;
    
    // Main content elements
    @FindBy(css = "main.main-wrapper")
    private WebElement mainContent;
    
    @FindBy(css = "h1, .title, .main-title")
    private WebElement mainHeading;
    
    @FindBy(css = ".hero, .banner, .jumbotron, .intro")
    private WebElement heroSection;
    
    // Services section
    @FindBy(css = ".services, .service, [class*='service']")
    private WebElement servicesSection;
    
    @FindBy(css = ".services a, .service a, [class*='service'] a")
    private List<WebElement> serviceLinks;
    
    // Contact elements
    @FindBy(css = "a[href*='contact'], .contact, [href*='iletisim']")
    private WebElement contactLink;
    
    @FindBy(css = "a[href*='tel:'], [href*='mailto:']")
    private List<WebElement> contactInfo;
    
    // Footer elements
    @FindBy(css = "footer, .footer")
    private WebElement footerSection;
    
    // Language/Social elements (if any)
    @FindBy(css = ".language, .lang, [class*='social'], .social")
    private List<WebElement> languageOrSocialElements;
    
    /**
     * Constructor for HomePage
     * @param driver WebDriver instance
     */
    public HomePage(WebDriver driver) {
        super(driver);
    }
    
    /**
     * Navigate to homepage
     * @param baseUrl Base URL of the website
     * @return HomePage instance for method chaining
     */
    public HomePage navigateToHomePage(String baseUrl) {
        driver.get(baseUrl);
        waitForPageLoad();
        return this;
    }
    
    /**
     * Check if page is loaded by verifying key elements
     * @return boolean true if page is loaded correctly
     */
    @Override
    public boolean isPageLoaded() {
        try {
            // Check if at least the main content or header is present
            return isElementDisplayed(mainContent) || isElementDisplayed(headerSection);
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Get page URL pattern for verification
     * @return String URL pattern
     */
    @Override
    public String getPageUrlPattern() {
        return HOME_URL_PATTERN;
    }
    
    /**
     * Verify homepage elements are visible
     * @return boolean true if main elements are visible
     */
    public boolean areMainElementsVisible() {
        try {
            System.out.println("DEBUG: Checking header element with selector: header.o-header");
            
            // Check if element exists at all
            try {
                String headerText = headerSection.getTagName();
                System.out.println("Header element found, tag: " + headerText);
                boolean headerDisplayed = headerSection.isDisplayed();
                System.out.println("Header isDisplayed(): " + headerDisplayed);
                
                String headerClass = headerSection.getAttribute("class");
                System.out.println("Header class: " + headerClass);
            } catch (Exception e) {
                System.out.println("Header element NOT FOUND: " + e.getMessage());
            }
            
            System.out.println("DEBUG: Checking main content with selector: main.main-wrapper");
            
            // Check if element exists at all
            try {
                String mainText = mainContent.getTagName();
                System.out.println("Main element found, tag: " + mainText);
                boolean mainDisplayed = mainContent.isDisplayed();
                System.out.println("Main isDisplayed(): " + mainDisplayed);
                
                String mainClass = mainContent.getAttribute("class");
                System.out.println("Main class: " + mainClass);
            } catch (Exception e) {
                System.out.println("Main element NOT FOUND: " + e.getMessage());
            }
            
            boolean headerVisible = isElementDisplayed(headerSection);
            boolean contentVisible = isElementDisplayed(mainContent);
            
            System.out.println("Final result - Header visible: " + headerVisible);
            System.out.println("Final result - Main content visible: " + contentVisible);
            
            return headerVisible && contentVisible;
        } catch (Exception e) {
            System.out.println("ERROR in areMainElementsVisible: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
    
    /**
     * Get main heading text
     * @return String heading text
     */
    public String getMainHeadingText() {
        try {
            return safeGetText(mainHeading);
        } catch (Exception e) {
            return ""; // Return empty string if heading not found
        }
    }
    
    /**
     * Get navigation links count
     * @return int number of navigation links
     */
    public int getNavigationLinksCount() {
        try {
            return navigationLinks.size();
        } catch (Exception e) {
            return 0;
        }
    }
    
    /**
     * Click on logo to verify it's clickable
     * @return HomePage instance for method chaining
     */
    public HomePage clickLogo() {
        try {
            safeClick(logoImage);
            waitForPageLoad();
        } catch (Exception e) {
            System.out.println("Logo not clickable or not found: " + e.getMessage());
        }
        return this;
    }
    
    /**
     * Get service links count
     * @return int number of service links
     */
    public int getServiceLinksCount() {
        try {
            return serviceLinks.size();
        } catch (Exception e) {
            return 0;
        }
    }
    
    /**
     * Click contact link
     * @return boolean true if contact link was clicked successfully
     */
    public boolean clickContactLink() {
        try {
            safeClick(contactLink);
            waitForPageLoad();
            return true;
        } catch (Exception e) {
            System.out.println("Contact link not found or not clickable: " + e.getMessage());
            return false;
        }
    }
    
    /**
     * Verify footer is visible
     * @return boolean true if footer is visible
     */
    public boolean isFooterVisible() {
        return isElementDisplayed(footerSection);
    }
    
    /**
     * Scroll through page sections for visual verification
     * @return HomePage instance for method chaining
     */
    public HomePage scrollThroughPage() {
        // Scroll to top
        scrollToTop();
        
        try {
            // Scroll to services if available
            if (isElementDisplayed(servicesSection)) {
                scrollToElement(servicesSection);
                Thread.sleep(1000); // Brief pause for visual verification
            }
            
            // Scroll to footer
            if (isElementDisplayed(footerSection)) {
                scrollToElement(footerSection);
                Thread.sleep(1000);
            }
            
            // Back to top
            scrollToTop();
        } catch (Exception e) {
            System.out.println("Error during page scrolling: " + e.getMessage());
        }
        
        return this;
    }
    
    /**
     * Get contact information count
     * @return int number of contact info elements (phone, email)
     */
    public int getContactInfoCount() {
        try {
            return contactInfo.size();
        } catch (Exception e) {
            return 0;
        }
    }
    
    /**
     * Comprehensive page verification
     * @return boolean true if all main elements are functioning
     */
    public boolean verifyPageFunctionality() {
        boolean pageLoaded = isPageLoaded();
        boolean elementsVisible = areMainElementsVisible();
        boolean hasFooter = isFooterVisible();
        
        System.out.println("=== Homepage Verification Results ===");
        System.out.println("Page loaded: " + pageLoaded);
        System.out.println("Main elements visible: " + elementsVisible);
        System.out.println("Navigation links count: " + getNavigationLinksCount());
        System.out.println("Service links count: " + getServiceLinksCount());
        System.out.println("Contact info count: " + getContactInfoCount());
        System.out.println("Footer visible: " + hasFooter);
        System.out.println("Page title: " + getPageTitle());
        System.out.println("Current URL: " + getCurrentUrl());
        
        return pageLoaded && elementsVisible;
    }
}
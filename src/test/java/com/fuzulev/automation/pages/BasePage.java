package com.fuzulev.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.By;
import java.time.Duration;


/**
 * BasePage class contains common functionality for all page objects
 * Implements Page Object Model pattern for fuzulev.com.tr automation
 */
public abstract class BasePage {
    
    protected WebDriver driver;
    protected WebDriverWait wait;
    protected JavascriptExecutor jsExecutor;
    
    // Common timeouts
    protected static final int DEFAULT_WAIT_TIME = 10;
    protected static final int LONG_WAIT_TIME = 30;
    protected static final int SHORT_WAIT_TIME = 5;
    
    /**
     * Constructor for BasePage
     * @param driver WebDriver instance
     */
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(DEFAULT_WAIT_TIME));
        this.jsExecutor = (JavascriptExecutor) driver;
        PageFactory.initElements(driver, this);
    }
    
    /**
     * Wait for element to be visible
     * @param element WebElement to wait for
     * @return WebElement when visible
     */
    protected WebElement waitForElementVisible(WebElement element) {
        return wait.until(ExpectedConditions.visibilityOf(element));
    }
    
    /**
     * Wait for element to be clickable
     * @param element WebElement to wait for
     * @return WebElement when clickable
     */
    protected WebElement waitForElementClickable(WebElement element) {
        return wait.until(ExpectedConditions.elementToBeClickable(element));
    }
    
    /**
     * Wait for element by locator to be visible
     * @param locator By locator
     * @return WebElement when visible
     */
    protected WebElement waitForElementVisible(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }
    
    /**
     * Safe click method with wait
     * @param element WebElement to click
     */
    protected void safeClick(WebElement element) {
        waitForElementClickable(element).click();
    }
    
    /**
     * Safe send keys method with wait
     * @param element WebElement to type in
     * @param text Text to type
     */
    protected void safeSendKeys(WebElement element, String text) {
        WebElement visibleElement = waitForElementVisible(element);
        visibleElement.clear();
        visibleElement.sendKeys(text);
    }
    
    /**
     * Get text from element with wait
     * @param element WebElement to get text from
     * @return String text content
     */
    protected String safeGetText(WebElement element) {
        return waitForElementVisible(element).getText();
    }
    
    /**
     * Check if element is displayed
     * @param element WebElement to check
     * @return boolean true if displayed
     */
    protected boolean isElementDisplayed(WebElement element) {
        try {
            return element.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Scroll to element
     * @param element WebElement to scroll to
     */
    protected void scrollToElement(WebElement element) {
        jsExecutor.executeScript("arguments[0].scrollIntoView(true);", element);
    }
    
    /**
     * Scroll to top of page
     */
    protected void scrollToTop() {
        jsExecutor.executeScript("window.scrollTo(0, 0);");
    }
    
    /**
     * Scroll to bottom of page
     */
    protected void scrollToBottom() {
        jsExecutor.executeScript("window.scrollTo(0, document.body.scrollHeight);");
    }
    
    /**
     * Wait for page to load completely
     */
    protected void waitForPageLoad() {
        wait.until(webDriver -> jsExecutor.executeScript("return document.readyState").equals("complete"));
    }
    
    /**
     * Get page title
     * @return String page title
     */
    public String getPageTitle() {
        return driver.getTitle();
    }
    
    /**
     * Get current URL
     * @return String current URL
     */
    public String getCurrentUrl() {
        return driver.getCurrentUrl();
    }
    
    /**
     * Refresh the page
     */
    public void refreshPage() {
        driver.navigate().refresh();
        waitForPageLoad();
    }
    
    /**
     * Take screenshot (utility method)
     * @return String screenshot path
     */
    public String takeScreenshot() {
        // Implementation will be added in utility class
        return "screenshot_" + System.currentTimeMillis() + ".png";
    }
    
    /**
     * Abstract method to verify page is loaded
     * Each page class must implement this method
     * @return boolean true if page is loaded correctly
     */
    public abstract boolean isPageLoaded();
    
    /**
     * Abstract method to get page URL pattern
     * Each page class must implement this method
     * @return String URL pattern for the page
     */
    public abstract String getPageUrlPattern();
}
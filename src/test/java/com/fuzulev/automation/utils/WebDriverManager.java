package com.fuzulev.automation.utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

/**
 * WebDriverManager utility class for managing WebDriver instances
 * Supports Chrome, Firefox, and Edge browsers with various configurations
 */
public class WebDriverManager {
    
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    private static final int DEFAULT_TIMEOUT = 30;
    
    public enum BrowserType {
        CHROME, FIREFOX, EDGE, CHROME_HEADLESS, CHROME_MOBILE
    }
    
    /**
     * Initialize WebDriver based on browser type
     * @param browserType Browser type enum
     * @return WebDriver instance
     */
    public static WebDriver initializeDriver(BrowserType browserType) {
        WebDriver webDriver = null;
        
        try {
            switch (browserType) {
                case CHROME:
                    webDriver = createChromeDriver(false, false);
                    break;
                case CHROME_HEADLESS:
                    webDriver = createChromeDriver(true, false);
                    break;
                case CHROME_MOBILE:
                    webDriver = createChromeDriver(false, true);
                    break;
                case FIREFOX:
                    webDriver = createFirefoxDriver();
                    break;
                case EDGE:
                    webDriver = createEdgeDriver();
                    break;
                default:
                    throw new IllegalArgumentException("Browser type not supported: " + browserType);
            }
            
            // Set common configurations
            webDriver.manage().timeouts().implicitlyWait(Duration.ofSeconds(DEFAULT_TIMEOUT));
            webDriver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(DEFAULT_TIMEOUT));
            webDriver.manage().window().maximize();
            
            driver.set(webDriver);
            System.out.println("WebDriver initialized successfully: " + browserType);
            
        } catch (Exception e) {
            System.err.println("Failed to initialize WebDriver: " + e.getMessage());
            throw new RuntimeException("WebDriver initialization failed", e);
        }
        
        return webDriver;
    }
    
    /**
     * Create Chrome WebDriver with options
     * @param headless Run in headless mode
     * @param mobile Use mobile emulation
     * @return ChromeDriver instance
     */
    private static ChromeDriver createChromeDriver(boolean headless, boolean mobile) {
                            io.github.bonigarcia.wdm.WebDriverManager.chromedriver().setup();
        
        ChromeOptions options = new ChromeOptions();
        
        // Basic Chrome options
        options.addArguments("--disable-blink-features=AutomationControlled");
        options.addArguments("--disable-extensions");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--remote-allow-origins=*");
        
        // Headless mode
        if (headless) {
            options.addArguments("--headless=new");
            options.addArguments("--disable-gpu");
        }
        
        // Mobile emulation for responsive testing
        if (mobile) {
            Map<String, String> mobileEmulation = new HashMap<>();
            mobileEmulation.put("deviceName", "iPhone 12 Pro");
            options.setExperimentalOption("mobileEmulation", mobileEmulation);
        }
        
        // Performance and Turkish language support
        options.addArguments("--lang=tr-TR");
        options.addArguments("--disable-logging");
        options.addArguments("--log-level=3");
        
        return new ChromeDriver(options);
    }
    
    /**
     * Create Firefox WebDriver with options
     * @return FirefoxDriver instance
     */
    private static FirefoxDriver createFirefoxDriver() {
                            io.github.bonigarcia.wdm.WebDriverManager.firefoxdriver().setup();
        
        FirefoxOptions options = new FirefoxOptions();
        options.addArguments("--disable-blink-features=AutomationControlled");
        options.addPreference("intl.accept_languages", "tr-TR, tr, en");
        
        return new FirefoxDriver(options);
    }
    
    /**
     * Create Edge WebDriver with options
     * @return EdgeDriver instance
     */
    private static EdgeDriver createEdgeDriver() {
                            io.github.bonigarcia.wdm.WebDriverManager.edgedriver().setup();
        
        EdgeOptions options = new EdgeOptions();
        options.addArguments("--disable-blink-features=AutomationControlled");
        options.addArguments("--remote-allow-origins=*");
        options.addArguments("--lang=tr-TR");
        
        return new EdgeDriver(options);
    }
    
    /**
     * Get current WebDriver instance
     * @return WebDriver instance
     */
    public static WebDriver getDriver() {
        return driver.get();
    }
    
    /**
     * Initialize driver from string (for TestNG parameters)
     * @param browserName Browser name as string
     * @return WebDriver instance
     */
    public static WebDriver initializeDriver(String browserName) {
        BrowserType browserType;
        
        switch (browserName.toLowerCase()) {
            case "chrome":
                browserType = BrowserType.CHROME;
                break;
            case "chrome-headless":
                browserType = BrowserType.CHROME_HEADLESS;
                break;
            case "chrome-mobile":
                browserType = BrowserType.CHROME_MOBILE;
                break;
            case "firefox":
                browserType = BrowserType.FIREFOX;
                break;
            case "edge":
                browserType = BrowserType.EDGE;
                break;
            default:
                System.out.println("Unknown browser: " + browserName + ", defaulting to Chrome");
                browserType = BrowserType.CHROME;
        }
        
        return initializeDriver(browserType);
    }
    
    /**
     * Close current WebDriver instance
     */
    public static void closeDriver() {
        WebDriver webDriver = driver.get();
        if (webDriver != null) {
            try {
                webDriver.quit();
                System.out.println("WebDriver closed successfully");
            } catch (Exception e) {
                System.err.println("Error closing WebDriver: " + e.getMessage());
            } finally {
                driver.remove();
            }
        }
    }
    
    /**
     * Check if WebDriver is initialized
     * @return boolean true if driver is active
     */
    public static boolean isDriverInitialized() {
        return driver.get() != null;
    }
    
    /**
     * Switch to mobile view (for responsive testing)
     * @param deviceName Device name for emulation
     */
    public static void switchToMobileView(String deviceName) {
        WebDriver webDriver = getDriver();
        if (webDriver instanceof ChromeDriver) {
            // This would require restarting the driver with mobile options
            System.out.println("Mobile view switching requires driver restart with mobile emulation");
        }
    }
    
    /**
     * Get browser information
     * @return String browser details
     */
    public static String getBrowserInfo() {
        WebDriver webDriver = getDriver();
        if (webDriver != null) {
            return "Browser: " + webDriver.getClass().getSimpleName() + 
                   ", Version: " + webDriver.manage().getCookies().size() + " cookies loaded";
        }
        return "No active WebDriver";
    }
    
    /**
     * Set page load timeout
     * @param seconds Timeout in seconds
     */
    public static void setPageLoadTimeout(int seconds) {
        WebDriver webDriver = getDriver();
        if (webDriver != null) {
            webDriver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(seconds));
        }
    }
    
    /**
     * Set implicit wait timeout
     * @param seconds Timeout in seconds
     */
    public static void setImplicitWait(int seconds) {
        WebDriver webDriver = getDriver();
        if (webDriver != null) {
            webDriver.manage().timeouts().implicitlyWait(Duration.ofSeconds(seconds));
        }
    }
}
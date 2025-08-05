package com.fuzulev.automation;

import com.fuzulev.automation.utils.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.*;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

/**
 * BaseTest class containing common test setup and teardown methods
 * All test classes should extend this base class
 */
public class BaseTest {
    
    protected WebDriver driver;
    protected Properties config;
    protected String baseUrl;
    protected String environment;
    
    // Test configuration
    private static final String CONFIG_FILE_PATH = "src/test/resources/config.properties";
    
    /**
     * Suite level setup - runs once before all tests
     */
    @BeforeSuite
    public void suiteSetup() {
        System.out.println("=== Starting Fuzulev Test Suite ===");
        loadConfiguration();
        printTestEnvironmentInfo();
    }
    
    /**
     * Test level setup - runs before each test method
     * @param browser Browser parameter from TestNG
     * @param environment Environment parameter from TestNG
     */
    @BeforeMethod
    @Parameters({"browser", "environment"})
    public void setUp(@Optional("chrome") String browser, @Optional("local") String environment) {
        System.out.println("\n--- Setting up test ---");
        System.out.println("Browser: " + browser);
        System.out.println("Environment: " + environment);
        
        this.environment = environment;
        
        // Initialize WebDriver
        driver = WebDriverManager.initializeDriver(browser);
        
        // Set base URL based on environment
        setBaseUrl(environment);
        
        System.out.println("Base URL: " + baseUrl);
        System.out.println("Test setup completed successfully");
    }
    
    /**
     * Test level teardown - runs after each test method
     */
    @AfterMethod
    public void tearDown() {
        System.out.println("--- Cleaning up test ---");
        
        if (driver != null) {
            // Take screenshot on failure (if needed)
            // captureScreenshotOnFailure();
            
            // Close browser
            WebDriverManager.closeDriver();
            System.out.println("Browser closed");
        }
        
        System.out.println("Test cleanup completed\n");
    }
    
    /**
     * Suite level teardown - runs once after all tests
     */
    @AfterSuite
    public void suiteTeardown() {
        System.out.println("=== Fuzulev Test Suite Completed ===");
        generateTestReport();
    }
    
    /**
     * Load configuration from properties file
     */
    private void loadConfiguration() {
        config = new Properties();
        try {
            FileInputStream fis = new FileInputStream(CONFIG_FILE_PATH);
            config.load(fis);
            fis.close();
            System.out.println("Configuration loaded successfully");
        } catch (IOException e) {
            System.err.println("Failed to load configuration: " + e.getMessage());
            // Set default values
            setDefaultConfiguration();
        }
    }
    
    /**
     * Set default configuration values
     */
    private void setDefaultConfiguration() {
        config = new Properties();
        config.setProperty("local.url", "http://127.0.0.1:5500/fuzulev-local/index.html");
        config.setProperty("remote.url", "https://www.fuzulev.com.tr");
        config.setProperty("default.timeout", "30");
        config.setProperty("screenshot.path", "target/screenshots");
        System.out.println("Using default configuration values");
    }
    
    /**
     * Set base URL based on environment
     * @param environment Test environment (local/remote)
     */
    private void setBaseUrl(String environment) {
        if ("local".equalsIgnoreCase(environment)) {
            baseUrl = config.getProperty("local.url", "http://127.0.0.1:5500/fuzulev-local/index.html");
        } else {
            baseUrl = config.getProperty("remote.url", "https://www.fuzulev.com.tr");
        }
    }
    
    /**
     * Print test environment information
     */
    private void printTestEnvironmentInfo() {
        System.out.println("\n=== Test Environment Information ===");
        System.out.println("Java Version: " + System.getProperty("java.version"));
        System.out.println("OS: " + System.getProperty("os.name"));
        System.out.println("User: " + System.getProperty("user.name"));
        System.out.println("Working Directory: " + System.getProperty("user.dir"));
        System.out.println("Local URL: " + config.getProperty("local.url"));
        System.out.println("Remote URL: " + config.getProperty("remote.url"));
        System.out.println("Default Timeout: " + config.getProperty("default.timeout") + " seconds");
        System.out.println("=======================================\n");
    }
    
    /**
     * Generate test report summary
     */
    private void generateTestReport() {
        System.out.println("\n=== Test Execution Summary ===");
        System.out.println("Test framework: Selenium WebDriver + TestNG");
        System.out.println("Target website: fuzulev.com.tr");
        System.out.println("Test pattern: Page Object Model");
        System.out.println("Configuration file: " + CONFIG_FILE_PATH);
        System.out.println("Report location: target/test-output");
        System.out.println("===============================");
    }
    
    /**
     * Get configuration property
     * @param key Property key
     * @param defaultValue Default value if key not found
     * @return String property value
     */
    protected String getConfigProperty(String key, String defaultValue) {
        return config.getProperty(key, defaultValue);
    }
    
    /**
     * Get configuration property as integer
     * @param key Property key
     * @param defaultValue Default value if key not found
     * @return int property value
     */
    protected int getConfigPropertyAsInt(String key, int defaultValue) {
        try {
            return Integer.parseInt(config.getProperty(key, String.valueOf(defaultValue)));
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }
    
    /**
     * Navigate to base URL
     */
    protected void navigateToHomePage() {
        driver.get(baseUrl);
        System.out.println("Navigated to: " + baseUrl);
    }
    
    /**
     * Wait for specified seconds
     * @param seconds Seconds to wait
     */
    protected void waitFor(int seconds) {
        try {
            Thread.sleep(seconds * 1000L);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
    
    /**
     * Log test step
     * @param stepDescription Description of the test step
     */
    protected void logTestStep(String stepDescription) {
        System.out.println("📋 TEST STEP: " + stepDescription);
    }
    
    /**
     * Log test result
     * @param result Test result description
     * @param success Whether the test passed
     */
    protected void logTestResult(String result, boolean success) {
        String icon = success ? "✅" : "❌";
        System.out.println(icon + " RESULT: " + result);
    }
    
    /**
     * Verify test preconditions
     * @return boolean true if all preconditions are met
     */
    protected boolean verifyTestPreconditions() {
        boolean driverInitialized = WebDriverManager.isDriverInitialized();
        boolean configLoaded = config != null && !config.isEmpty();
        boolean baseUrlSet = baseUrl != null && !baseUrl.isEmpty();
        
        System.out.println("🔍 Pre-condition checks:");
        System.out.println("  Driver initialized: " + driverInitialized);
        System.out.println("  Configuration loaded: " + configLoaded);
        System.out.println("  Base URL set: " + baseUrlSet);
        
        return driverInitialized && configLoaded && baseUrlSet;
    }
}
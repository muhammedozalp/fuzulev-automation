# 🔬 Web Test Automation Learning Framework

[![CI/CD Status](https://github.com/muhammedozalp/fuzulev-automation/actions/workflows/fuzulev-ci-cd.yml/badge.svg?branch=master)](https://github.com/muhammedozalp/fuzulev-automation/actions)
[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://openjdk.java.net/projects/jdk/21/)
[![Selenium](https://img.shields.io/badge/Selenium-4.15.0-green.svg)](https://selenium.dev/)
[![TestNG](https://img.shields.io/badge/TestNG-7.8.0-blue.svg)](https://testng.org/)
[![Maven](https://img.shields.io/badge/Maven-3.9+-red.svg)](https://maven.apache.org/)

## ⚖️ **LEGAL DISCLAIMER & EDUCATIONAL PURPOSE**

> **🎓 EDUCATIONAL PROJECT ONLY**  
> This project is created **solely for learning and educational purposes** to demonstrate test automation concepts, frameworks, and best practices.
>
> **⚠️ IMPORTANT NOTICE:**
> - This is **NOT affiliated** with any real company or commercial entity
> - Any website references are used purely for **technical demonstration**
> - This project is **NOT intended for production use**
> - All content is for **educational and portfolio purposes only**
> - No commercial relationship exists with any referenced websites
>
> **📚 Learning Objectives:**  
> This project demonstrates proficiency in Selenium WebDriver, TestNG, Maven, CI/CD pipelines, and modern QA automation practices.

## 🎯 **What This Framework Demonstrates**

### ✅ **Core Testing Capabilities**
- **🌐 Web UI Automation** - Selenium WebDriver with Page Object Model
- **📱 Responsive Testing** - Multi-device viewport validation  
- **🔗 API Testing** - RESTful API testing with RestAssured
- **⚡ Performance Testing** - Load time and response validation
- **🔄 Cross-Browser Testing** - Chrome, Firefox, Edge support
- **🌍 Multi-Environment** - Local development + Remote testing

### 🏗️ **Framework Architecture**
- **📋 Page Object Model (POM)** - Maintainable test structure
- **🔧 WebDriver Management** - Automated browser configuration
- **📊 Comprehensive Reporting** - TestNG + Extent Reports
- **🛡️ Robust Error Handling** - Screenshots on failure
- **⚙️ Configuration Management** - Environment-specific settings

### 🚀 **DevOps & CI/CD Integration**
- **⏰ Scheduled Testing** - Automated test execution
- **📢 Slack Notifications** - Real-time test results
- **🎫 JIRA Integration** - Automatic defect management
- **🔒 Security Scanning** - Dependency vulnerability checks
- **📦 Artifact Management** - Test reports and screenshots

## 🚀 **Quick Start Guide**

### **Prerequisites**
- **Java 21+** - [Download OpenJDK](https://openjdk.java.net/projects/jdk/21/)
- **Maven 3.9+** - [Install Maven](https://maven.apache.org/install.html)
- **Git** - [Install Git](https://git-scm.com/downloads)

### **Local Setup**

```bash
# Clone repository
git clone https://github.com/muhammedozalp/fuzulev-automation.git
cd fuzulev-automation

# Install dependencies
mvn clean install

# Run smoke tests (local environment)
mvn test -Dgroups=smoke -Dbrowser=chrome -Denvironment=local

# Run smoke tests (remote demonstration)
mvn test -Dgroups=smoke -Dbrowser=chrome -Denvironment=remote
```

### **Project Structure**
```
test-automation-framework/
├── 📁 src/test/java/com/fuzulev/automation/
│   ├── 📄 pages/              # Page Object Model classes
│   ├── 📄 functional/         # UI functional tests
│   ├── 📄 api/               # API tests  
│   ├── 📄 mobile/            # Mobile responsive tests
│   └── 📄 utils/             # Utility classes and configurations
├── 📁 src/test/resources/
│   ├── 📄 config.properties  # Environment configurations
│   ├── 📄 testng.xml         # TestNG test suites
│   └── 📄 log4j2.xml         # Logging configuration
├── 📁 .github/workflows/     # GitHub Actions CI/CD
├── 📁 fuzulev-local/         # Local static demo files
└── 📄 pom.xml                # Maven dependencies
```

## 🧪 **Testing Capabilities Demonstration**

### **Test Suites**

| Suite | Purpose | Command |
|-------|---------|---------|
| **Smoke** | Critical functionality validation | `mvn test -Dgroups=smoke` |
| **Functional** | Complete UI testing scenarios | `mvn test -Dgroups=functional` |
| **API** | HTTP/REST API testing | `mvn test -Dgroups=api` |
| **Mobile** | Responsive design validation | `mvn test -Dgroups=mobile` |
| **Performance** | Load/speed testing | `mvn test -Dgroups=performance` |

### **Environment Options**
- **Local**: `http://127.0.0.1:5500/fuzulev-local/` (local demo files)
- **Remote**: External website for demonstration purposes

### **Example Commands**
```bash
# Smoke tests on Chrome
mvn test -Dgroups=smoke -Dbrowser=chrome -Denvironment=remote

# Mobile tests on Firefox (local demo)
mvn test -Dgroups=mobile -Dbrowser=firefox -Denvironment=local

# API tests demonstration
mvn test -Dgroups=api

# Full test suite
mvn test -Dgroups=smoke,functional,api,mobile
```

## 🚀 **CI/CD Pipeline Demonstration**

### **GitHub Actions Features**
- **⏰ Scheduled Execution**: Automated test runs
- **🔄 Pull Request Validation**: Automatic testing on PRs
- **📢 Slack Integration**: Real-time notifications
- **🎫 JIRA Integration**: Defect management automation
- **🔒 Security Scanning**: Dependency vulnerability checks

### **Required Configuration**
For full CI/CD demonstration, configure these secrets:

```bash
# Slack Integration (optional)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK

# JIRA Integration (optional)
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_USER_EMAIL=your-email@example.com
JIRA_API_TOKEN=your-jira-api-token
```

## 📊 **Reporting & Documentation**

### **Generated Reports**
- **TestNG Reports** - `target/surefire-reports/`
- **Extent Reports** - `target/test-output/ExtentReport.html`
- **Screenshots** - `screenshots/` (failure captures)
- **Logs** - `logs/automation.log`

### **Learning Resources**
This project demonstrates:
- Modern test automation architecture
- Page Object Model implementation
- TestNG framework usage
- Maven project management
- CI/CD pipeline integration
- Error handling and reporting

## 🛠️ **Technical Learning Examples**

### **Page Object Model Example**
```java
public class DemoPage extends BasePage {
    
    @FindBy(css = "header.o-header")
    private WebElement headerSection;
    
    public DemoPage(WebDriver driver) {
        super(driver);
    }
    
    public boolean isHeaderVisible() {
        return isElementDisplayed(headerSection);
    }
}
```

### **Test Class Example**  
```java
public class DemoPageTest extends BaseTest {
    
    @Test(groups = {"functional", "smoke"})
    public void testPageLoad() {
        DemoPage demoPage = new DemoPage(driver);
        demoPage.navigateToPage(baseUrl);
        
        Assert.assertTrue(demoPage.isHeaderVisible(), 
            "Header should be visible on page load");
    }
}
```

## 🎓 **Learning Outcomes**

This project demonstrates proficiency in:

- **Test Automation Frameworks** (Selenium WebDriver, TestNG)
- **Build Tools** (Maven)
- **Design Patterns** (Page Object Model)
- **CI/CD Pipelines** (GitHub Actions)
- **Integration Tools** (Slack, JIRA)
- **Reporting Systems** (TestNG, Extent Reports)
- **Configuration Management** (Properties, Environment handling)
- **Error Handling & Debugging**

## 🤝 **Educational Use & Contributions**

### **For Learning Purposes**
This project is open for:
- Educational reference
- Learning test automation concepts
- Understanding CI/CD implementation
- Studying modern QA practices

### **Contributing to Learning**
If you'd like to contribute educational improvements:
1. Fork the repository
2. Create a feature branch
3. Add educational value or improvements
4. Submit a pull request with clear description

## 📞 **Contact & Portfolio**

- **Developer**: Muhammed Özalp ([@muhammedozalp](https://github.com/muhammedozalp))
- **Purpose**: Educational demonstration of test automation skills
- **Portfolio**: This project showcases modern QA automation practices

---

**🎓 Created for educational purposes to demonstrate test automation expertise** 📚✨
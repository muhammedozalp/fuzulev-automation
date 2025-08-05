# 🔬 Fuzulev QA Automation Framework

[![CI/CD Status](https://github.com/YOUR_USERNAME/fuzulev-automation/actions/workflows/fuzulev-ci-cd.yml/badge.svg)](https://github.com/YOUR_USERNAME/fuzulev-automation/actions)
[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://openjdk.java.net/projects/jdk/21/)
[![Selenium](https://img.shields.io/badge/Selenium-4.15.0-green.svg)](https://selenium.dev/)
[![TestNG](https://img.shields.io/badge/TestNG-7.8.0-blue.svg)](https://testng.org/)
[![Maven](https://img.shields.io/badge/Maven-3.9+-red.svg)](https://maven.apache.org/)

**Comprehensive test automation framework for fuzulev.com.tr** featuring Selenium WebDriver, API testing, mobile responsiveness validation, and CI/CD integration.

## 🎯 **Features**

### ✅ **Testing Capabilities**
- **🌐 Web UI Testing** - Selenium WebDriver with Page Object Model
- **📱 Mobile Responsive** - Multi-device viewport testing  
- **🔗 API Testing** - RESTful API validation with RestAssured
- **⚡ Performance Testing** - Load time and response validation
- **🔄 Cross-Browser** - Chrome, Firefox, Edge support
- **🌍 Multi-Environment** - Local development + Remote production

### 🏗️ **Framework Architecture**
- **📋 Page Object Model (POM)** - Maintainable test structure
- **🔧 WebDriver Management** - Automated browser configuration
- **📊 Comprehensive Reporting** - TestNG + Extent Reports
- **🛡️ Robust Error Handling** - Screenshots on failure
- **⚙️ Configuration Management** - Environment-specific settings

### 🚀 **CI/CD Integration**
- **⏰ Scheduled Testing** - Off-peak hours (2-6 AM Turkish time)
- **📢 Slack Notifications** - Real-time test results
- **🎫 JIRA Integration** - Automatic defect creation
- **🔒 Security Scanning** - Dependency vulnerability checks
- **📦 Artifact Management** - Test reports and screenshots

## 🚀 **Quick Start**

### **Prerequisites**
- **Java 21+** - [Download OpenJDK](https://openjdk.java.net/projects/jdk/21/)
- **Maven 3.9+** - [Install Maven](https://maven.apache.org/install.html)
- **Git** - [Install Git](https://git-scm.com/downloads)

### **Local Setup**

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/fuzulev-automation.git
cd fuzulev-automation

# Install dependencies
mvn clean install

# Run smoke tests (local environment)
mvn test -Dgroups=smoke -Dbrowser=chrome -Denvironment=local

# Run smoke tests (remote fuzulev.com.tr)
mvn test -Dgroups=smoke -Dbrowser=chrome -Denvironment=remote
```

### **Project Structure**
```
fuzulev-automation/
├── 📁 src/test/java/com/fuzulev/automation/
│   ├── 📄 pages/              # Page Object Model classes
│   ├── 📄 tests/              # Test classes organized by type
│   │   ├── functional/        # UI functional tests
│   │   ├── api/              # API tests  
│   │   ├── mobile/           # Mobile responsive tests
│   │   └── performance/      # Performance tests
│   └── 📄 utils/             # Utility classes and configurations
├── 📁 src/test/resources/
│   ├── 📄 config.properties  # Environment configurations
│   ├── 📄 testng.xml         # TestNG test suites
│   └── 📄 log4j2.xml         # Logging configuration
├── 📁 .github/workflows/     # GitHub Actions CI/CD
├── 📁 fuzulev-local/         # Local static website files
├── 📁 todos/                 # Project documentation & planning
└── 📄 pom.xml                # Maven dependencies
```

## 🧪 **Testing**

### **Test Suites**

| Suite | Description | Command |
|-------|-------------|---------|
| **Smoke** | Critical functionality | `mvn test -Dgroups=smoke` |
| **Functional** | Complete UI testing | `mvn test -Dgroups=functional` |
| **API** | HTTP/REST API testing | `mvn test -Dgroups=api` |
| **Mobile** | Responsive design | `mvn test -Dgroups=mobile` |
| **Performance** | Load/speed testing | `mvn test -Dgroups=performance` |

### **Environment Options**
- **Local**: `http://127.0.0.1:5500/fuzulev-local/` (requires Live Server)
- **Remote**: `https://www.fuzulev.com.tr/` (live website)

### **Browser Support**
- **Chrome** (default) - `chrome`
- **Firefox** - `firefox` 
- **Edge** - `edge`

### **Example Commands**
```bash
# Smoke tests on Chrome (remote)
mvn test -Dgroups=smoke -Dbrowser=chrome -Denvironment=remote

# Mobile tests on Firefox (local)  
mvn test -Dgroups=mobile -Dbrowser=firefox -Denvironment=local

# API tests (environment independent)
mvn test -Dgroups=api

# Full test suite
mvn test -Dgroups=smoke,functional,api,mobile
```

## 🚀 **CI/CD Setup**

### **GitHub Actions**
The framework includes automated CI/CD with scheduled testing:

- **⏰ Scheduled Runs**: Daily at 2 AM, 4 AM, 6 AM Turkish time (off-peak)
- **🔄 Pull Request Testing**: Automatic validation on PRs
- **📢 Slack Integration**: Real-time notifications
- **🎫 JIRA Integration**: Automatic defect creation

### **Required Secrets**
Set these in your GitHub repository settings:

```bash
# Slack Integration
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK

# JIRA Integration  
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_USER_EMAIL=your-email@example.com
JIRA_API_TOKEN=your-jira-api-token
```

## 📊 **Reporting**

### **Test Reports**
- **TestNG Reports** - `target/surefire-reports/`
- **Extent Reports** - `target/test-output/ExtentReport.html`
- **Screenshots** - `screenshots/` (failure captures)
- **Logs** - `logs/automation.log`

### **GitHub Actions Artifacts**
- Test reports automatically uploaded
- Screenshots included in failed test artifacts
- Security scan reports available

## 🔧 **Configuration**

### **Environment Configuration** (`src/test/resources/config.properties`)
```properties
# Local Environment
local.url=http://127.0.0.1:5500/fuzulev-local/index.html
local.timeout=30

# Remote Environment (Production)
remote.url=https://www.fuzulev.com.tr
remote.timeout=30

# Browser Settings
browser.chrome.headless=false
browser.firefox.headless=false
browser.edge.headless=false

# Test Data
test.data.path=src/test/resources/testdata
```

### **TestNG Configuration** (`src/test/resources/testng.xml`)
- Configurable test suites
- Parallel execution support  
- Listener integration
- Parameter management

## 🛠️ **Development**

### **Adding New Tests**
1. **Create Page Object** in `src/test/java/com/fuzulev/automation/pages/`
2. **Write Test Class** in appropriate `tests/` subdirectory
3. **Use Annotations**:
   - `@Test(groups = {"smoke", "functional"})`
   - `@Test(priority = 1)`
   - `@Parameters({"browser", "environment"})`

### **Page Object Example**
```java
@Component
public class ContactPage extends BasePage {
    
    @FindBy(id = "contact-form")
    private WebElement contactForm;
    
    public ContactPage(WebDriver driver) {
        super(driver);
    }
    
    public boolean isContactFormVisible() {
        return isElementVisible(contactForm);
    }
}
```

### **Test Class Example**  
```java
public class ContactTest extends BaseTest {
    
    @Test(groups = {"functional", "smoke"})
    public void testContactFormLoad() {
        ContactPage contactPage = new ContactPage(driver);
        contactPage.navigateToContactPage(baseUrl);
        
        Assert.assertTrue(contactPage.isContactFormVisible(), 
            "Contact form should be visible");
    }
}
```

## 📋 **Project Management**

### **JIRA Integration**
- **Project**: FQT (Fuzulev QA Testing)  
- **Issue Types**: Epic, Story, Task, Bug
- **Automated Defect Creation** on CI/CD failures
- **Sprint Planning** with test execution tracking

### **Branch Strategy**
- **main** - Production-ready code
- **develop** - Integration branch
- **feature/FQT-{ID}-{description}** - Feature branches
- **hotfix/** - Critical fixes

### **Commit Convention**
```
FQT-123: Add mobile responsive tests for homepage

✅ IMPLEMENTED:
- Mobile viewport testing
- Cross-device validation  
- Touch interaction simulation

🧪 TESTED:
- iPhone SE, 12 Pro, iPad
- Responsive breakpoints
- Navigation functionality
```

## 🤝 **Contributing**

### **Getting Started**
1. **Fork** the repository
2. **Create feature branch**: `git checkout -b feature/FQT-123-new-feature`
3. **Follow TDD**: Write tests first, then implementation
4. **Run tests**: `mvn test` 
5. **Create Pull Request** with detailed description

### **Code Standards**
- **Java Code Style** - Follow Google Java Style Guide
- **Page Object Model** - One page = one Page Object class
- **Test Independence** - Each test should run independently  
- **Meaningful Names** - Clear, descriptive method/variable names
- **Documentation** - JavaDoc for public methods

## 📞 **Support**

### **Team Contact**
- **QA Lead**: Muhammed Özalp ([@muhammedozalp](https://github.com/muhammedozalp))
- **Project**: [JIRA FQT Project](https://muhammedozalp.atlassian.net/jira/software/projects/FQT)
- **Slack**: `#fuzulev-qa-automation`

### **Resources**
- **Documentation**: [`todos/` directory](./todos/)
- **Test Plans**: [`todos/02_test_planning.md`](./todos/02_test_planning.md)
- **Setup Guide**: [`todos/00_environment_setup.md`](./todos/00_environment_setup.md)
- **CI/CD Guide**: [`.github/workflows/`](./.github/workflows/)

---

**⭐ Built with love for comprehensive QA automation** 🚀
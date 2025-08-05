# 🚀 CI/CD Setup Guide

Complete setup guide for GitHub Actions CI/CD with Slack and JIRA integrations.

## 📋 **Overview**

Our CI/CD pipeline provides:
- **⏰ Scheduled Testing** - Off-peak hours (2-6 AM Turkish time)
- **📢 Slack Notifications** - Real-time test results
- **🎫 JIRA Integration** - Automatic defect creation
- **🔒 Security Scanning** - Dependency vulnerability checks
- **📦 Multi-Environment** - Local development + Remote production

---

## 🏗️ **Step 1: GitHub Repository Setup**

### **1A: Create GitHub Repository**

1. **Go to GitHub**: [github.com](https://github.com)
2. **Click "New Repository"**
3. **Repository Details**:
   ```
   Repository Name: fuzulev-automation
   Description: Comprehensive QA automation framework for fuzulev.com.tr
   Visibility: Private (recommended) or Public
   Initialize: ✅ Add README, ✅ Add .gitignore (Java)
   ```
4. **Click "Create Repository"**

### **1B: Push Local Code to GitHub**

```bash
# Initialize git (if not done)
git init

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/fuzulev-automation.git

# Add all files
git add .

# Commit framework
git commit -m "FQT-4: Initial CI/CD setup with GitHub Actions

✅ IMPLEMENTED:
- Complete test automation framework
- GitHub Actions workflows
- Slack/JIRA integration setup
- Scheduled testing configuration

🧪 READY FOR:
- Off-peak automated testing
- Real-time notifications
- Defect tracking integration"

# Push to GitHub
git push -u origin main
```

---

## 🔔 **Step 2: Slack Integration Setup**

### **2A: Create Slack Webhook**

1. **Go to Slack Apps**: [api.slack.com/apps](https://api.slack.com/apps)
2. **Click "Create New App" → "From scratch"**
3. **App Details**:
   ```
   App Name: Fuzulev QA Bot
   Workspace: Your Slack Workspace
   ```
4. **Click "Create App"**

### **2B: Configure Incoming Webhooks**

1. **In your app dashboard** → **"Incoming Webhooks"**
2. **Activate Incoming Webhooks** → Toggle ON
3. **Click "Add New Webhook to Workspace"**
4. **Select Channel**: `#fuzulev-qa-automation` (create if needed)
5. **Click "Allow"**
6. **Copy Webhook URL** (starts with `https://hooks.slack.com/services/...`)

### **2C: Test Slack Integration**

```bash
# Test webhook (replace with your URL)
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"🔬 Fuzulev QA Bot is ready!"}' \
  YOUR_WEBHOOK_URL
```

### **2D: Create Slack Channels**

**Recommended channels**:
```
#fuzulev-qa-automation    # Main QA notifications
#fuzulev-test-results     # Detailed test reports  
#fuzulev-deployment       # Deployment notifications
#fuzulev-alerts          # Critical alerts only
```

---

## 🎫 **Step 3: JIRA Integration Setup**

### **3A: Generate JIRA API Token**

1. **Go to JIRA**: [your-domain.atlassian.net](https://muhammedozalp.atlassian.net)
2. **Click Profile Icon** → **"Account Settings"**
3. **Go to "Security"** → **"Create and manage API tokens"**
4. **Click "Create API token"**
5. **Label**: `GitHub Actions Fuzulev QA`
6. **Copy token** (store securely - shows only once)

### **3B: Configure JIRA Project**

**Verify your JIRA project settings**:
```
Project Key: FQT
Project Name: Fuzulev QA Testing
Issue Types: Epic, Story, Task, Bug
```

### **3C: Test JIRA API Connection**

```bash
# Test JIRA connection (replace with your details)
curl -X GET \
  -H "Authorization: Basic $(echo -n 'your-email@example.com:your-api-token' | base64)" \
  -H "Accept: application/json" \
  "https://your-domain.atlassian.net/rest/api/3/project/FQT"
```

---

## 🔐 **Step 4: GitHub Secrets Configuration**

### **4A: Add Repository Secrets**

1. **Go to your GitHub repository**
2. **Settings** → **"Secrets and variables"** → **"Actions"**
3. **Click "New repository secret"**

**Add these secrets**:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `SLACK_WEBHOOK_URL` | `https://hooks.slack.com/services/...` | Slack webhook URL |
| `JIRA_BASE_URL` | `https://muhammedozalp.atlassian.net` | Your JIRA instance URL |
| `JIRA_USER_EMAIL` | `your-email@example.com` | Your JIRA email |
| `JIRA_API_TOKEN` | `your-api-token` | Generated JIRA API token |

### **4B: Verify Secrets**

**Secrets should look like**:
```
Repository secrets (4)
✅ SLACK_WEBHOOK_URL        Set 2 hours ago
✅ JIRA_BASE_URL           Set 2 hours ago  
✅ JIRA_USER_EMAIL         Set 2 hours ago
✅ JIRA_API_TOKEN          Set 1 hour ago
```

---

## ⚡ **Step 5: Test CI/CD Pipeline**

### **5A: Manual Workflow Trigger**

1. **Go to GitHub** → **"Actions"** tab
2. **Click "Fuzulev QA Automation CI/CD"**
3. **Click "Run workflow"**
4. **Select Options**:
   ```
   Branch: main
   Test Environment: remote
   Test Suite: smoke  
   Browser: chrome
   ```
5. **Click "Run workflow"**

### **5B: Monitor Execution**

**Watch for**:
- ✅ **Environment Setup** completes
- ✅ **Smoke Tests** execute
- ✅ **Slack notification** sent
- ✅ **Artifacts uploaded**

### **5C: Verify Integrations**

**Check Slack**:
```
🔬 Fuzulev QA Test Results

Repository: your-username/fuzulev-automation
Test Suite: smoke
Environment: remote  
Browser: chrome
Trigger: workflow_dispatch
Status: success ✅
```

**Check JIRA** (only if tests fail):
- New bug issue created automatically
- Contains test execution details
- Links to GitHub Actions run

---

## 📅 **Step 6: Scheduled Testing Configuration**

### **6A: Schedule Overview**

**Current schedule** (Turkish time):
```
2:00 AM - Daily smoke tests
4:00 AM - Daily smoke tests  
6:00 AM - Daily smoke tests
```

**Equivalent UTC times**:
```
23:00 UTC - 2:00 AM Turkish
01:00 UTC - 4:00 AM Turkish
03:00 UTC - 6:00 AM Turkish
```

### **6B: Customize Schedule**

**Edit `.github/workflows/fuzulev-ci-cd.yml`**:
```yaml
schedule:
  - cron: '0 23 * * *'    # 2:00 AM Turkish (UTC-1 in winter, UTC+3 in summer)
  - cron: '0 1 * * *'     # 4:00 AM Turkish  
  - cron: '0 3 * * *'     # 6:00 AM Turkish
```

**Cron syntax reference**:
```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of week (0 - 6) (Sunday to Saturday)
│ │ │ │ │
* * * * *
```

### **6C: Additional Scheduling Options**

```yaml
# Every 2 hours during business hours (9 AM - 5 PM Turkish)
- cron: '0 6-14/2 * * 1-5'   # UTC times for Turkish business hours

# Weekly full regression (Sunday 1 AM Turkish)  
- cron: '0 22 * * 0'         # 1:00 AM Turkish on Sunday

# Monthly comprehensive testing (1st of month, 3 AM Turkish)
- cron: '0 0 1 * *'          # 3:00 AM Turkish on 1st
```

---

## 🔧 **Step 7: Advanced Configuration**

### **7A: Test Environment Variables**

**Add to GitHub secrets** (optional):
```
FUZULEV_LOCAL_URL=http://127.0.0.1:5500/fuzulev-local/
FUZULEV_REMOTE_URL=https://www.fuzulev.com.tr
DEFAULT_BROWSER=chrome
DEFAULT_TIMEOUT=30
```

### **7B: Multi-Environment Matrix**

**For comprehensive testing** - edit workflow:
```yaml
strategy:
  matrix:
    browser: [chrome, firefox, edge]
    environment: [remote]
    test_suite: [smoke, api]
```

### **7C: Failure Threshold Configuration**

```yaml
# Continue pipeline even if some tests fail
continue-on-error: true

# Set test failure threshold
- name: Check Test Results
  run: |
    if [ $FAILURE_RATE -gt 20 ]; then
      echo "Too many failures, stopping pipeline"
      exit 1
    fi
```

---

## 📊 **Step 8: Monitoring & Alerts**

### **8A: GitHub Actions Monitoring**

**Monitor these metrics**:
- **Success Rate** - Target: >95%
- **Execution Time** - Target: <10 minutes
- **Resource Usage** - Track runner minutes
- **Artifact Size** - Monitor storage usage

### **8B: Slack Alert Configuration**

**Custom Slack channels for different alerts**:

```yaml
# Critical failures only
SLACK_CRITICAL_WEBHOOK_URL: ${{ secrets.SLACK_CRITICAL_WEBHOOK }}

# Detailed test reports  
SLACK_REPORTS_WEBHOOK_URL: ${{ secrets.SLACK_REPORTS_WEBHOOK }}
```

### **8C: JIRA Dashboard Setup**

**Create JIRA dashboard with**:
1. **Test Execution Trends** - Success/failure over time
2. **Open Defects** - Current bugs from automation
3. **Test Coverage** - Feature coverage metrics
4. **Performance Trends** - Response time tracking

---

## 🚨 **Troubleshooting**

### **Common Issues**

| Issue | Solution |
|-------|----------|
| **Webhook not working** | Verify URL, check channel permissions |
| **JIRA API 401 error** | Regenerate API token, check email format |
| **Tests timeout** | Increase timeout, check website availability |
| **Browser issues** | Update browser versions in workflow |
| **Scheduling not working** | Verify cron syntax, check repository activity |

### **Debug Commands**

```bash
# Test locally with same parameters as CI/CD
mvn test -Dgroups=smoke -Dbrowser=chrome -Denvironment=remote -X

# Check GitHub Actions runner logs
# Go to Actions → Select run → Click job → View logs

# Validate YAML syntax
# Use GitHub Actions tab → "Set up a workflow yourself"
# Paste YAML and check for syntax errors
```

### **Support Resources**

- **GitHub Actions Docs**: [docs.github.com/actions](https://docs.github.com/en/actions)
- **Slack API Docs**: [api.slack.com](https://api.slack.com/)
- **JIRA REST API**: [developer.atlassian.com](https://developer.atlassian.com/cloud/jira/platform/rest/v3/)
- **Cron Expression Generator**: [crontab.guru](https://crontab.guru/)

---

## ✅ **Verification Checklist**

**Before going live**:

- [ ] **GitHub repository** created and code pushed
- [ ] **Slack webhook** configured and tested  
- [ ] **JIRA API token** generated and tested
- [ ] **GitHub secrets** added correctly
- [ ] **Manual workflow** triggered and passed
- [ ] **Slack notification** received
- [ ] **Test artifacts** uploaded successfully
- [ ] **Schedule configured** for off-peak hours
- [ ] **Documentation updated** with your specific URLs
- [ ] **Team notified** about new automation system

**🎉 CI/CD pipeline is ready for production use!**

---

**⭐ This setup provides enterprise-grade test automation with comprehensive monitoring and alerting** 🚀
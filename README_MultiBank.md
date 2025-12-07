# 💹 MultiBank UI Automation — Playwright + TypeScript

This project showcases end-to-end UI automation testing built on Playwright + TypeScript, targeting the MultiBank web application
:
🔗 https://multibank.io/

👉 GitHub Repo - https://github.com/AnandJeyakumar/multiBank-assessment

🚀 **This framework is integrated with GitHub Actions CI/CD**, allowing you to:

Trigger tests manually by selecting branch and target browser (Chromium, Firefox, WebKit)

View automated Allure Reports after every successful run

📊 Latest test execution report (Allure):
👉 View Report - https://anandjeyakumar.github.io/multiBank-assessment/

- ✅ **Task 2 — Character Frequency**:  
  A TypeScript utility script to compute character frequency is included in the project.  
  📁 Location: `tests/charFrequency.ts`

- 📄 **Documentation Report**:  
  Contains architecture overview, execution steps, CI/CD notes, key findings, and more.  
  📁 Location: `documentation/MultiBank_Automation_Assessment_Documentation.docx`

---

## ✅ Project Highlights

- ✅ **Page Object Model (POM)** with fixtures for modularity
- ✅ **Dynamic locator utilities** for reusable components
- ✅ **Parameterized test data** using JSON
- ✅ **Reusable UI validators** for text, visibility, and navigation checks
- ✅ **Playwright Test + Allure Reporting** integration
- ✅ **Visual evidence**: Screenshots, trace, video on failure
- ✅ **Cross-browser support**: Chromium, Firefox, WebKit
- ✅ **CI/CD compatible structure**

---

## 🧪 Automated Test Scenarios

| Description |
|------------------------|
| Validate menu and submenu items |
| Menu navigation leads to correct URL |
| Trade > Spot opens with correct default pair |
| Validate marketing banner and download links |
| Validate About Us Page |
| Character frequency string utility (TS script) |

---

## 🛠️ Setup Instructions

1) **Clone repository**
```bash
git clone https://github.com/YourUsername/multibank-ui-automation.git
cd multibank-ui-automation
```

2) **Install dependencies**
```bash
npm install
```

3) **Install browsers (if needed)**
```bash
npx playwright install
```

---

## ▶️ Run Tests

**All tests**
```bash
npx playwright test
```

**Single test file**
```bash
npx playwright test tests/assessment.spec.ts
```

**Run a specific test by title**
```bash
npx playwright test -g "Validate marketing banner and download links"
```

**Headed mode**
```bash
npx playwright test --headed
```

**With browser selection**
```bash
npx playwright test --project=chromium
```

---

## 📊 Reports

**HTML Report**
```bash
npx playwright show-report
```

**Allure Report**
```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## 🧠 Task 2 — String Character Frequency

> Included as `charFrequency.ts` - npx tsc charFrequency.ts , node charFrequency.js


```ts
export function getCharFrequency(input: string): string {
  if (!input || input.trim().length === 0) {
    return "Input string is empty.";
  }

  const freqMap = new Map<string, number>();
  for (const char of input) {
    if (char === ' ') continue;
    freqMap.set(char, (freqMap.get(char) || 0) + 1);
  }

  return Array.from(freqMap.entries())
    .map(([char, count]) => \`\${char}:\${count}\`)
    .join(', ');
}

// Example usage:
console.log(getCharFrequency("hello world"));
// Output: h:1, e:1, l:3, o:2, w:1, r:1, d:1
```

---

## 📂 Folder Structure

```
fixtures/                 # Custom Playwright fixtures
pages/                    # Page Object files (POMs)
tests/                    # All test cases
testData/                 # Test data JSON files
utils/                    # Reusable validators, helpers
charFrequency.ts          # String frequency task script
playwright.config.ts      # Test runner configuration
README.md                 # You're reading it!
```

---

## 📸 Sample Evidence

- ✔ Allure HTML reports
- ✔ Screenshots, video, trace on failure
- ✔ Sample execution logs for Chrome, Firefox

---

## 📄 Notes & Assumptions

- 🔹 Menu locators may change based on screen size (responsive)
- 🔹 Assumes public access to multibank.io

---

📬 **Contact**  
For questions or collaboration: **janand819@gmail.com**

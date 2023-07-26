const reporter = require('cucumber-html-reporter');
const { chromium } = require('playwright');

// These options will be used at the time of HTML Report generation
const options = {
  theme: 'bootstrap',
  jsonFile: `cucumber_report_${process.argv[2]}.json`,
  output: `reports/report_${process.argv[2]}.html`,
  reportSuiteAsScenario: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    'App Version': '2.0.0',
    'Test Environment': 'STAGING',
    Browser: 'Chrome 101.0.4951.41',
    Platform: 'MAC OS Monterary - Version: 12.3.1',
  },
};

reporter.generate(options, async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const urlReport = `file:///${process.cwd()}/reports/report_${process.argv[2]}.html`;
  await page.goto(urlReport);
})
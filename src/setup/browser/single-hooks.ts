import { executeCommand, runReport } from '../../common/common-functions';
import { browserOptions, browserContext } from '../../common/config';
import { BROWSER, TIME_OUT } from '../../common/constants';
import { ICustomWorld } from '../../common/custom-world';
import {
  ChromiumBrowser,
  FirefoxBrowser,
  WebKitBrowser,
  chromium,
  firefox,
  webkit,
} from 'playwright';
import { After, AfterAll, Before, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
setDefaultTimeout(TIME_OUT);
// To launch the browser before all the scenarios
BeforeAll(async () => {
  switch (BROWSER) {
    case 'firefox':
      browser = await firefox.launch(browserOptions);
      break;
    case 'webkit':
      browser = await webkit.launch(browserOptions);
      break;
    default:
      browser = await chromium.launch(browserOptions);
      break;
  }
});

// To close the browser after all the scenarios
AfterAll(async function (this: ICustomWorld) {
  await Promise.resolve();
  setTimeout(
    async () => await executeCommand(runReport(process.argv[process.argv.length - 1])),
    5000,
  );
});

// Before every scenario, Create new context and page
Before(async function (this: ICustomWorld) {
  this.context = await browser.newContext(browserContext);
  this.page = await this.context?.newPage();
});

// After every scenario, Close context and page
After(async function (this: ICustomWorld) {
  await this.page.close();
  await this.context.close();
});

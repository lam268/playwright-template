import { executeCommand, runReport } from '../../common/common-functions';
import { browserContext, browserOptions } from '../../common/config';
import { ICustomWorld } from '../../common/custom-world';
import { BROWSER, TIME_OUT } from '../../common/constants';
import { After, AfterAll, Before, BeforeAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import * as dotenv from 'dotenv';
import { ensureDir } from 'fs-extra';
import {
  ChromiumBrowser,
  FirefoxBrowser,
  WebKitBrowser,
  chromium,
  firefox,
  webkit,
} from 'playwright';

dotenv.config();

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
const tracesDir = 'traces';
let oldContext = null;
let oldPage = null;
setDefaultTimeout(TIME_OUT);

BeforeAll(async function () {
  switch (BROWSER) {
    case 'firefox':
      browser = await firefox.launch(browserOptions);
      break;
    case 'webkit':
      browser = await webkit.launch(browserOptions);
      break;
    default:
      browser = await chromium.launch(browserOptions);
  }
  await ensureDir(tracesDir);
});

Before({ tags: '@ignore' }, async function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return 'skipped' as any;
});

Before({ tags: '@debug' }, async function (this: ICustomWorld) {
  this.debug = true;
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  const time = new Date().toISOString().split('.')[0];
  this.testName = pickle.name.replace(/\W/g, '-') + '-' + time.replace(/:|T/g, '-');
  if (!oldContext) {
    // customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)
    this.context = await browser.newContext({
      ...browserContext,
      acceptDownloads: true,
      recordVideo: process.env.PWVIDEO ? { dir: 'screenshots' } : undefined,
    });
    await this.context.tracing.start({ screenshots: true, snapshots: true });
    oldContext = this.context;
    this.page = await this.context.newPage();
    this.page.on('console', async (msg) => {
      if (msg.type() === 'log') {
        await this.attach(msg.text());
      }
    });
    this.feature = pickle;
    oldPage = this.page;
  } else {
    this.context = oldContext;
    this.page = oldPage;
  }
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    await this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s`);
    if (result.status !== Status.PASSED) {
      const image = await this.page?.screenshot();
      image && (await this.attach(image, 'image/png'));
      await this.context?.tracing.stop({ path: `${tracesDir}/${this.testName}-trace.zip` });
    }
  }
  // await this.page?.close();
  // await this.context?.close();
});

AfterAll(async function () {
  await Promise.resolve();
  setTimeout(
    async () => await executeCommand(runReport(process.argv[process.argv.length - 1])),
    5000,
  );
});

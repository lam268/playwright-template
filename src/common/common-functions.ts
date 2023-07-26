import { DYNAMIC_ELEMENT } from './dynamicElement';
import i18n from './i18n';

import {
  LOCAL_STORAGE_KEYS,
  DEFAULT_LANGUAGE,
  LANGUAGE,
  FORMAT_DATA_TYPE,
  MESSAGE_COLOR,
  REPORT,
  APP_URL,
} from './constants';
import { getNumberOfString, randomString } from './helper';
import { Page } from 'playwright';
import { exec } from 'child_process';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function executeCommand(script: string) {
  return new Promise((resolve, reject) => {
    const child = exec(script);
    child.addListener('error', reject);
    child.addListener('exit', resolve);

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    // process.stdin.pipe(child.stdin);
    child.on('exit', function () {
      return resolve(null);
    });
    child.on('close', function () {
      return resolve(null);
    });
  });
}

export function messageError(message: string) {
  /* eslint-disable no-console */
  console.log(MESSAGE_COLOR.FgRed, message, MESSAGE_COLOR.Reset);
}

export function messageSuccess(message: string) {
  /* eslint-disable no-console */
  console.log(MESSAGE_COLOR.FgGreen, message, MESSAGE_COLOR.Reset);
}

export async function question(message: string) {
  const value = (await new Promise((resolve) => {
    rl.question(`${MESSAGE_COLOR.FgBlue} ${message} ${MESSAGE_COLOR.Reset}`, resolve);
  })) as string;
  return value;
}

export async function getLocalStorageInBrowser(page: Page) {
  const localStorage = await page.evaluate(() => Object.assign({}, window.localStorage));
  return localStorage;
}

export async function setLocalStorageInBrowser(page: Page, values = {}) {
  await page.evaluate((values) => {
    for (const key in values) {
      localStorage.setItem(key, values[key]);
    }
  }, values);
}

export async function setLocaleI18n(page: Page) {
  const localStorage = await getLocalStorageInBrowser(page);
  i18n.setLocale(localStorage[LOCAL_STORAGE_KEYS.LANG] || DEFAULT_LANGUAGE);
}

export function getPageURL(page: string) {
  return `${APP_URL as string}/${page}` as string;
}

export async function changeLanguage(page: Page, language: string = LANGUAGE.JP) {
  await page.click(DYNAMIC_ELEMENT.BUTTON_LANGUAGE);
  await clickMenuItem(page, language);
  global.localStorage = await getLocalStorageInBrowser(page);
  await setLocaleI18n(page);
}

export async function clickMenuItem(page: Page, itemText: string) {
  const menuItems = await page.$$(DYNAMIC_ELEMENT.MENU_ITEM);
  for (const menuItem of menuItems) {
    const isEnabled = await menuItem.isEnabled();
    if (isEnabled) {
      const menuItemText = await menuItem.innerText();
      if (menuItemText === itemText) {
        await menuItem.click();
      }
    }
  }
}

export function formatDataTable(dataTable = []) {
  const dataTableResult = [];
  const headers = dataTable.shift() || [];
  dataTable.forEach((dataItem) => {
    const dataItemResult = {};
    dataItem.forEach((itemValue, index) => {
      dataItemResult[headers[index]] = itemValue;
    });
    dataTableResult.push(dataItemResult);
  });
  return dataTableResult;
}

export async function clickSidebarItemTitle(page: Page, title: string) {
  const sidebarItems = await page.$$(DYNAMIC_ELEMENT.SIDEBAR_ITEMS);
  for (const sidebarItem of sidebarItems) {
    const isEnabled = await sidebarItem.isEnabled();
    if (isEnabled) {
      const sidebarItemTitle = await sidebarItem.innerText();
      if (sidebarItemTitle === title) {
        await sidebarItem.click();
      }
    }
  }
}

export async function getPageTile(page: Page) {
  const pageTitle = await page.innerText(DYNAMIC_ELEMENT.PAGE_TITLE);
  return pageTitle;
}

export async function getNumberOfHeaderTable(page: Page, title: string) {
  const headers = await page.$$(DYNAMIC_ELEMENT.TABLE_TH);
  let indexNumber = 0;
  for (const header of headers) {
    ++indexNumber;
    const headerTitle = (await header.innerText()) || '';
    if (headerTitle.trim() === title) {
      break;
    }
  }
  return indexNumber;
}

export async function clearInput(page: Page, dynamicElementInput: string) {
  // clear input field
  await page.waitForSelector(dynamicElementInput);
  await page.click(dynamicElementInput, { clickCount: 3 });
  await page.waitForLoadState();
  await page.keyboard.press('Backspace');
}

export function formatDataInput(dataInput: string) {
  if (dataInput.includes(FORMAT_DATA_TYPE._SPACE_)) {
    return dataInput.replace(/_SPACE_/g, ' ');
  } else if (dataInput.includes(FORMAT_DATA_TYPE._STRING_RANDOM_)) {
    const charactersLength = getNumberOfString(dataInput);
    const arrayInput = dataInput.split(`${FORMAT_DATA_TYPE._STRING_RANDOM_}${charactersLength}`);
    return `${randomString(+charactersLength)}${arrayInput[1] || ''}`;
  }
  return dataInput;
}

export async function openReport(page: Page) {
  page.on('close', async () => {
    process.exit();
  });
  await page.waitForTimeout(1000);
  const urlReport = `file:///${process.cwd()}/${REPORT.PATH_FILE_REPORT}/${
    REPORT.FILE_NAME_REPORT
  }`;
  await page.goto(urlReport);
}

export function getPathCommandCucumber(features: string[], moduleName: string, isSingle = false) {
  if (isSingle)
    return `cucumber-js ${features.join(
      ' ',
    )} --require-module ts-node/register --require 'src/step-definitions/${moduleName}/*steps.ts' --require src/setup/browser/single-hooks.ts ${moduleName}`;
  else
    return `cucumber-js ${features.join(
      ' ',
    )} --require-module ts-node/register --require 'src/step-definitions/${moduleName}/*steps.ts' --require src/setup/browser/multiple-hooks.ts ${moduleName}`;
}

export function runReport(module: string) {
  return `node reporter.js ${module}`;
}

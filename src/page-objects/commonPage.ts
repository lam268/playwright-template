import { API_URL, EMAIL, LOCAL_STORAGE_KEYS, PAGE_URLS, PASSWORD } from '../common/constants';
import { DYNAMIC_ELEMENT } from '../common/dynamicElement';
import { getLocalStorageInBrowser, setLocalStorageInBrowser } from '../common/common-functions';
import { Page } from 'playwright';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
const URL_REFRESH_TOKEN = 'refresh-token';
const BUFFER_TIME = 60 * 1000;

export class CommonPage {
  async gotoWebsite(url: string, page: Page) {
    await page?.goto(url);
    await page?.waitForSelector('#app');
  }

  async callAPIRefreshToken() {
    const response = await axios({
      method: 'POST',
      baseURL: API_URL,
      url: URL_REFRESH_TOKEN,
      headers: {
        Authorization: `Bearer ${global.localStorage[LOCAL_STORAGE_KEYS.REFRESH_TOKEN]}`,
      },
    });
    return response?.data || {};
  }

  async allAPIRefreshToken() {
    const response = await axios({
      method: 'POST',
      baseURL: API_URL,
      url: URL_REFRESH_TOKEN,
      headers: {
        Authorization: `Bearer ${global.localStorage[LOCAL_STORAGE_KEYS.REFRESH_TOKEN]}`,
      },
    });
    return response?.data || {};
  }

  async loginByGmail(page: Page, email = EMAIL, password = PASSWORD) {
    const isNotLoggedEmail = await page.isHidden(DYNAMIC_ELEMENT.GMAIL_CHOOSE_EMAIL(email));
    if (!isNotLoggedEmail) {
      await page.click(DYNAMIC_ELEMENT.GMAIL_CHOOSE_EMAIL(email));
      await page.waitForNavigation();
      return;
    }
    await page.waitForSelector(DYNAMIC_ELEMENT.GMAIL_INPUT_TYPE('email'));
    await page.type(DYNAMIC_ELEMENT.GMAIL_INPUT_TYPE('email'), email);
    await page.keyboard.press('Enter');

    await page.waitForSelector(DYNAMIC_ELEMENT.GMAIL_INPUT_TYPE('password'));
    await page.type(DYNAMIC_ELEMENT.GMAIL_INPUT_TYPE('password'), password);
    await page.keyboard.press('Enter');
    await page.waitForNavigation();

    const checkSubmitApproveAccess = await page.evaluate(
      (GMAIL_SUBMIT_ACCESS: string) => document.querySelector(GMAIL_SUBMIT_ACCESS)?.innerHTML,
      DYNAMIC_ELEMENT.GMAIL_SUBMIT_ACCESS,
    );
    if (checkSubmitApproveAccess) {
      await page.click(DYNAMIC_ELEMENT.GMAIL_SUBMIT_ACCESS);
      await page.waitForNavigation();
    }
  }

  async loginByToken(page: Page, email = EMAIL, password = PASSWORD) {
    await page?.goto(PAGE_URLS.LOGIN);
    await page?.waitForSelector(DYNAMIC_ELEMENT.APP);
    const dateNow = Date.now();
    global.localStorage = await getLocalStorageInBrowser(page);
    const refreshTokenExpiredAt = global.localStorage[LOCAL_STORAGE_KEYS.REFRESH_TOKEN_EXPIRED_AT];
    const tokenExpiredAt = global.localStorage[LOCAL_STORAGE_KEYS.ACCESS_TOKEN_EXPIRED_AT];
    if (!refreshTokenExpiredAt || +refreshTokenExpiredAt <= dateNow) {
      await page.click(DYNAMIC_ELEMENT.GMAIL_LOGIN);
      await page.waitForNavigation();
      await this.loginByGmail(page, email, password);
      await page.waitForSelector(DYNAMIC_ELEMENT.SIDEBAR);
      return;
    }

    if (+tokenExpiredAt <= dateNow && +refreshTokenExpiredAt > dateNow) {
      const resultRefreshToken = await this.callAPIRefreshToken();
      const dataRefreshToken = resultRefreshToken.data;
      if (!dataRefreshToken) {
        delete global.localStorage;
        return this.loginByToken(page);
      }
      Object.assign(global.localStorage, {
        [LOCAL_STORAGE_KEYS.ACCESS_TOKEN]: dataRefreshToken?.accessToken?.token,
        [LOCAL_STORAGE_KEYS.ACCESS_TOKEN_EXPIRED_AT]:
          +dataRefreshToken?.accessToken?.expiredAt - BUFFER_TIME,
        [LOCAL_STORAGE_KEYS.REFRESH_TOKEN]: dataRefreshToken?.refreshToken?.token,
        [LOCAL_STORAGE_KEYS.REFRESH_TOKEN_EXPIRED_AT]:
          +dataRefreshToken?.refreshToken?.expiredAt - BUFFER_TIME,
      });
      await setLocalStorageInBrowser(page, global.localStorage);
      await page.reload();
    }
  }
  async logout(page: Page) {
    await page.click(DYNAMIC_ELEMENT.PROFILE_NAME);
    await page.click(DYNAMIC_ELEMENT.LOGOUT);
    await page.waitForNavigation();
  }
}

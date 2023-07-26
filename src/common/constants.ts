export enum FORMAT_DATA_TYPE {
  _SPACE_ = '_SPACE_',
  _STRING_RANDOM_ = 'STRING_RANDOM_',
}

export const DEFAULT_LANGUAGE = 'ja';

export enum LOCAL_STORAGE_KEYS {
  LANG = 'lang',
  USER = 'user',
  ACCESS_TOKEN = 'access_token',
  ACCESS_TOKEN_EXPIRED_AT = 'token_expired_at',
  REFRESH_TOKEN = 'refresh_token',
  REFRESH_TOKEN_EXPIRED_AT = 'refresh_token_expired_at',
}

export enum LANGUAGE {
  EN = 'English',
  JP = '日本語',
}

export const OptionLanguage = {
  EN: 'en',
  JA: 'ja',
};

function getPageURL(page?: string) {
  if (page) return `${APP_URL as string}/${page}` as string;
  return `${APP_URL as string}` as string;
}

export const PAGE_URLS = {
  HOME_PAGE: getPageURL(),
  LOGIN: getPageURL(),
};

export enum MESSAGE_COLOR {
  FgRed = '\x1b[31m',
  Reset = '\x1b[0m',
  FgBlue = '\x1b[34m',
  FgGreen = '\x1b[32m',
}

export enum REPORT {
  PATH_FILE_REPORT = 'reports',
  FILE_NAME_REPORT = 'report.html',
}

export const EMAIL = 'testshz6@gmail.com';
export const PASSWORD = '@Tt1234567';

export const APP_URL = 'https://shz-dev.tokyotechlab.com';
export const API_URL = '';
export const TIME_OUT = 6000;

export const SHOW_BROWSER = true;
export const IS_MOBILE = false;
export const DEVICE = '';
export const BROWSER = '' as string;

export enum DB {
  DATABASE_USERNAME = 'shozemi',
  DATABASE_PASSWORD = 'tt@1234',
  DATABASE_NAME = 'shozemi',
  DATABASE_HOST = '54.178.140.57',
  DATABASE_PORT = 3306,
  DATABASE_TOTAL_SEED_ITEMS = 10,
}

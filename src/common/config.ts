import { DEVICE, IS_MOBILE, SHOW_BROWSER } from './constants';
import { BrowserContextOptions, LaunchOptions, devices } from 'playwright';

export const browserOptions: LaunchOptions = {
  headless: !SHOW_BROWSER,
  slowMo: 0,
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
};

export const browserContext: BrowserContextOptions = IS_MOBILE
  ? {
      isMobile: IS_MOBILE,
      ...devices[DEVICE]
    }
  : {
    ...devices['Desktop Chrome']
  };

/* eslint-disable no-console */
import { DEFAULT_LANGUAGE } from './constants';
import { I18n } from 'i18n';
import * as path from 'path';
import * as fs from 'fs';

const data = fs.readFileSync(path.join(__dirname, '../configLocale.txt'), 'utf8');
const defaultConfig = {
  locales: ['en', 'ja'],
  defaultLocale: DEFAULT_LANGUAGE,
  directory: path.join(__dirname, '../locales'),
};
const optionConfig = data ? JSON.parse(data) : defaultConfig;
const language = optionConfig.language || DEFAULT_LANGUAGE;
delete optionConfig.language;
const i18n = new I18n();
i18n.configure({
  ...optionConfig,
});
i18n.setLocale(language);

export default i18n;

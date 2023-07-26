import { Loading } from './loading';
import { DYNAMIC_ELEMENT } from '../dynamicElement';
import { Page } from 'playwright';
import * as expect from 'expect';

const loading = new Loading();

export class Radio {
  async checkedRadioByValue(page: Page, radioValue: string) {
    await page.click(DYNAMIC_ELEMENT.RADIO_LABEL(radioValue));
  }
}

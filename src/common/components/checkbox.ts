import { Loading } from './loading';
import { DYNAMIC_ELEMENT } from '../support/dynamicElement';
import { Page } from 'playwright';

const loading = new Loading();

export class Checkbox {
  async clickCheckboxByTitle(page: Page, checkboxLabel: string) {
    await page.click(DYNAMIC_ELEMENT.CHECKBOX_LABEL(checkboxLabel));
    await page.waitForLoadState();
    await loading.waitLoadingHidden(page);
  }
}

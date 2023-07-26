import { DYNAMIC_ELEMENT } from '../dynamicElement';
import { formatDataInput } from '../common-functions';
import * as expect from 'expect';
import { Page } from 'playwright';

export class Textbox {
  oldTextboxValue = '';
  async focusTextboxByTextboxPlaceholder(page: Page, placeholder: string, prefix = '') {
    await page.focus(DYNAMIC_ELEMENT.TEXTBOX_PLACEHOLDER(placeholder, prefix));
    await page.waitForLoadState();
  }

  async clearTextBox(page: Page, dynamicElementTextbox: string) {
    await page.waitForSelector(dynamicElementTextbox);
    await page.click(dynamicElementTextbox, { clickCount: 3 });
    await page.waitForLoadState();
    await page.keyboard.press('Backspace');
  }

  async clearTextBoxByTextboxPlaceholder(page: Page, placeholder: string, prefix = '') {
    await this.clearTextBox(page, DYNAMIC_ELEMENT.TEXTBOX_PLACEHOLDER(placeholder, prefix));
  }

  async sendKeysToDynamicElementTextbox(
    page: Page,
    dynamicElementTextbox: string,
    textboxValue: string,
  ) {
    await this.clearTextBox(page, dynamicElementTextbox);
    this.oldTextboxValue = formatDataInput(textboxValue as string);
    await page.type(dynamicElementTextbox, this.oldTextboxValue);
  }

  async sendKeysToTextboxName(page: Page, textboxValue: string, textboxName: string, prefix = '') {
    await this.sendKeysToDynamicElementTextbox(
      page,
      DYNAMIC_ELEMENT.TEXTBOX_NAME(textboxName, prefix),
      textboxValue,
    );
  }

  async sendKeysTextboxPlaceholder(
    page: Page,
    textboxValue: string,
    textboxName: string,
    prefix = '',
  ) {
    await this.sendKeysToDynamicElementTextbox(
      page,
      DYNAMIC_ELEMENT.TEXTBOX_PLACEHOLDER(textboxName, prefix),
      textboxValue,
    );
  }

  async sendKeysTextboxClass(page: Page, textboxValue: string, textboxName: string, prefix = '') {
    await this.sendKeysToDynamicElementTextbox(
      page,
      DYNAMIC_ELEMENT.TEXTBOX_CLASS(textboxName, prefix),
      textboxValue,
    );
  }

  async checkTextboxBlankByTextboxPlaceholder(page: Page, placeholder: string, prefix = '') {
    const inputValue = await page.inputValue(
      DYNAMIC_ELEMENT.TEXTBOX_PLACEHOLDER(placeholder, prefix),
    );
    expect(inputValue).toEqual('');
  }

  async checkTextboxValueByTextboxPlaceholder(
    page: Page,
    textboxValue: string,
    placeholder: string,
    prefix = '',
  ) {
    const inputValue = await page.inputValue(
      DYNAMIC_ELEMENT.TEXTBOX_PLACEHOLDER(placeholder, prefix),
    );
    if (textboxValue.includes('_SPACE_') || textboxValue.includes('_RANDOM_')) {
      expect(inputValue).toEqual(this.oldTextboxValue);
    } else {
      expect(inputValue).toEqual(textboxValue);
    }
  }

  async checkLabelTextboxPlaceholder(page: Page, label: string, placeholder: string, prefix = '') {
    await page.isEnabled(DYNAMIC_ELEMENT.TEXTBOX_LABEL_PLACEHOLDER(label, placeholder, prefix));
  }

  async checkTextboxMessageByTextboxPlaceholder(
    page: Page,
    textboxMessage: string,
    placeholder: string,
    prefix = '',
  ) {
    const textboxMessageText = await page.innerText(
      DYNAMIC_ELEMENT.TEXTBOX_MESSAGE_PLACEHOLDER(placeholder, prefix),
    );
    expect(textboxMessageText).toEqual(textboxMessage);
  }

  async checkTextboxEnableByPlaceholder(page: Page, placeholder: string, prefix = '') {
    await page.isDisabled(DYNAMIC_ELEMENT.TEXTBOX_PLACEHOLDER(placeholder, prefix));
  }

  async checkDropdownEnableByName(page: Page, dropdownName: string, prefix = '') {
    await page.isDisabled(DYNAMIC_ELEMENT.DROPDOWN_NAME(dropdownName, prefix));
  }
}

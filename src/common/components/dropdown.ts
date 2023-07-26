import { DYNAMIC_ELEMENT } from '../support/dynamicElement';
import { formatDataInput } from '../support/common-functions';
import * as expect from 'expect';
import { Page } from 'playwright';

export class Dropdown {
  async clearDropdown(page: Page, dynamicElementDropdown: string) {
    await page.click(DYNAMIC_ELEMENT.DROPDOWN_CLEAR(dynamicElementDropdown));
  }

  async clearDropdownByName(page: Page, dropdownName: string, prefix = '') {
    await this.clearDropdown(page, DYNAMIC_ELEMENT.DROPDOWN_NAME(dropdownName, prefix));
  }

  async scrollToBottomOfInfiniteList(page: Page, prefix = '', prev?: string) {
    const items = await page.$$(DYNAMIC_ELEMENT.OPTIONS_ITEMS(prefix));
    const lastItemRendered = items[items.length - 1];
    const control = prev ?? (await lastItemRendered.getAttribute('id'));
    await lastItemRendered.scrollIntoViewIfNeeded();
    // going straight to the next eval wasn't catching the newly rendered row items
    await page.waitForTimeout(100);
    const currentItems = await page.$$(DYNAMIC_ELEMENT.OPTIONS_ITEMS(prefix));
    const lastItemId = await currentItems[currentItems.length - 1].getAttribute('id');
    if (lastItemId === control) return;
    await this.scrollToBottomOfInfiniteList(page, prefix, lastItemId);
  }

  async scrollDropdown(page: Page, dropdownLabel = '', prefix = '') {
    await page.waitForSelector(DYNAMIC_ELEMENT.OPTIONS_MENU(dropdownLabel, prefix));
    await this.scrollToBottomOfInfiniteList(page, prefix);
  }

  async scrollDropdownPage(page: Page, dropdownName = '') {
    await page.waitForSelector(DYNAMIC_ELEMENT.OPTIONS_MENU_PAGE(dropdownName));
    await this.scrollToBottomOfInfiniteList(page);
  }

  async scrollDropdownPageFilterForm(page: Page) {
    await page.waitForSelector(DYNAMIC_ELEMENT.OPTIONS_MENU_DROPDOWN_PAGE());
    await this.scrollToBottomOfInfiniteList(page);
  }

  async getOptions(page: Page, prefix = '') {
    await page.waitForSelector(DYNAMIC_ELEMENT.OPTIONS(prefix));
    const options = await page.$$(DYNAMIC_ELEMENT.OPTIONS(prefix));
    const optionValues = [];
    for (const option of options) {
      const optionTitle = await option.innerText();
      optionValues.push(optionTitle);
    }
    return optionValues;
  }

  async getCountOptions(page: Page, prefix = '') {
    const optionValues = await this.getOptions(page, prefix);
    return optionValues.length;
  }

  async selectItemToDynamicElementDropdown(
    page: Page,
    dynamicElementDropdown: string,
    itemValue: string,
    prefix = '',
  ) {
    await page.click(dynamicElementDropdown);
    await page.waitForLoadState();
    const dropdownValue = await page.inputValue(dynamicElementDropdown);
    if (dropdownValue) {
      this.clearDropdown(page, dynamicElementDropdown);
    }
    const options = await page.$$(DYNAMIC_ELEMENT.OPTIONS(prefix));
    for (const option of options) {
      const isEnabled = await option.isEnabled();
      if (isEnabled) {
        const optionTitle = await option.innerText();
        const itemValues = itemValue.split(',');
        if (optionTitle.trim() === itemValue || itemValues.includes(optionTitle.trim())) {
          await option.click();
          await page.waitForLoadState();
        }
      }
    }
    const isHiddenOptions = await page.isHidden(DYNAMIC_ELEMENT.OPTIONS_PARENT(prefix));
    if (!isHiddenOptions) {
      await page.keyboard.press('Escape');
    }
  }

  async selectItemToDropdownName(page: Page, itemValue: string, dropdownName: string, prefix = '') {
    await this.selectItemToDynamicElementDropdown(
      page,
      DYNAMIC_ELEMENT.DROPDOWN_NAME(dropdownName, prefix),
      itemValue,
      prefix,
    );
  }

  async clickDropdownByName(page: Page, dropdownName: string, prefix = '') {
    await page.click(DYNAMIC_ELEMENT.DROPDOWN_NAME(dropdownName, prefix));
  }

  async checkDropdownBlankByDropdownLabel(page: Page, dropdownLabel: string, prefix = '') {
    const inputValue = await page.inputValue(
      DYNAMIC_ELEMENT.DROPDOWN_LABEL_INPUT(dropdownLabel, prefix),
    );
    expect(inputValue).toEqual('');
  }

  async checkDropdownValues(page: Page, values: string[], prefix = '') {
    const optionValues = await this.getOptions(page, prefix);
    expect(optionValues).toEqual(expect.arrayContaining(values));
  }

  async checkDropdownCountValues(page: Page, countValues: number, prefix = '') {
    const countOptionValues = await this.getCountOptions(page, prefix);
    expect(countOptionValues).toEqual(countValues);
  }

  async sendKeysToDynamicElementDropdown(
    page: Page,
    dynamicElementDropdown: string,
    inputValue: string,
  ) {
    await page.type(dynamicElementDropdown, formatDataInput(inputValue as string));
  }

  async sendKeysToDropdownName(page: Page, inputValue: string, dropdownName: string, prefix = '') {
    await this.sendKeysToDynamicElementDropdown(
      page,
      DYNAMIC_ELEMENT.DROPDOWN_NAME(dropdownName, prefix),
      inputValue,
    );
  }

  async checkValueDropdownByName(
    page: Page,
    dropdownValue: string,
    dropdownName: string,
    prefix = '',
  ) {    
    const inputValue = await page.inputValue(DYNAMIC_ELEMENT.DROPDOWN_NAME(dropdownName, prefix));    
    expect(inputValue).toEqual(dropdownValue);
  }

  async tabDropdownByName(page: Page, dropdownName: string, prefix = '') {
    await this.clickDropdownByName(page, dropdownName, prefix);
    await page.keyboard.press('Tab');
  }

  async checkDropdownMessageByDropdownName(
    page: Page,
    dropdownMessage: string,
    dropdownName: string,
    prefix = '',
  ) {
    const dropdownMessageText = await page.innerText(
      DYNAMIC_ELEMENT.DROPDOWN_MESSAGE_NAME(dropdownName, prefix),
    );
    expect(dropdownMessageText).toEqual(dropdownMessage);
  }

  async checkDropdownEnableByName(page: Page, dropdownName: string, prefix = '') {
    await page.isEnabled(DYNAMIC_ELEMENT.DROPDOWN_NAME(dropdownName, prefix));
  }

  async checkDropdownBlankByDropdownName(page: Page, dropdownName: string, prefix = '') {
    const inputValue = await page.inputValue(DYNAMIC_ELEMENT.DROPDOWN_NAME(dropdownName, prefix));
    expect(inputValue).toEqual('');
  }

  async checkSelectedItemsToDropdownLabel(
    page: Page,
    itemValue: string,
    dropdownLabel: string,
    prefix = '',
  ) {
    const optionValues = await this.getSelectedOptions(page, dropdownLabel, prefix);
    const values = itemValue.split(',');

    expect(optionValues.length).toEqual(values.length);
    expect(optionValues).toEqual(expect.arrayContaining(values));
  }

  async getSelectedOptions(page: Page, dropdownLabel: string, prefix = '') {
    // await page.waitForSelector(DYNAMIC_ELEMENT.OPTIONS_SELECTED(prefix));
    const options = await page.$$(DYNAMIC_ELEMENT.OPTIONS_SELECTED(dropdownLabel, prefix));

    const optionValues = [];
    for (const option of options) {
      const optionTitle = await option.innerText();
      optionValues.push(optionTitle);
    }
    return optionValues;
  }
}

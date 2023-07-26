import { Pagination } from '../../common/components/pagination';
import { Then, When } from '@cucumber/cucumber';

const pagination = new Pagination();
const backPageClass = 'mdi-chevron-left';
const nextPageClass = 'mdi-chevron-right';
const PAGINATION = {
  BACK_PAGE: 'backPage',
  NEXT_PAGE: 'nextPage',
  LAST_PAGE: 'lastPage',
};

Then('Verify character {string} is displayed in the paging', async function (character) {
  await pagination.checkPageMoreEnable(this.page, character);
});

Then('Verify character {string} is not displayed in the paging', async function (character) {
  await pagination.checkPageMoreHidden(this.page, character);
});

Then('Verify textbox go is displayed in the paging', async function () {
  await pagination.checkPageGoInputEnable(this.page);
});

Then('Verify textbox go is not displayed in the paging', async function () {
  await pagination.checkPageGoInputHidden(this.page);
});

Then('Verify button go is displayed in the paging', async function () {
  await pagination.checkPageGoButtonEnable(this.page);
});

Then('Verify button go is not displayed in the paging', async function () {
  await pagination.checkPageGoButtonHidden(this.page);
});

When('I input value {string} in textbox go in the paging', async function (pageNumber) {
  await pagination.sendKeysPageGoInput(this.page, pageNumber);
});

Then('I click button go in the paging', async function () {
  await pagination.clickPageGoButton(this.page);
});

Then('Verify {string} value is displayed in textbox go in the paging', async function (pageNumber) {
  await pagination.checkPageNumberGoInput(this.page, pageNumber);
});

Then('Verify pagination is not displayed', async function () {
  await pagination.checkPaginationHidden(this.page);
});

Then('Verify pagination {string} icon is displayed', async function (icon) {
  if (PAGINATION.BACK_PAGE === icon) {
    await pagination.checkPaginationIconEnableByIconClass(this.page, backPageClass);
  } else if (PAGINATION.NEXT_PAGE === icon) {
    await pagination.checkPaginationIconEnableByIconClass(this.page, nextPageClass);
  }
});

Then('Verify page number {string} is highlighted and displayed', async function (pageNumber) {
  if (pageNumber === PAGINATION.LAST_PAGE) {
    pageNumber = await pagination.getLastPageNumber(this.page);
  }
  await pagination.checkPageNumberActive(this.page, pageNumber);
});

Then('Verify page number {string} is displayed', async function (pageNumber) {
  await pagination.checkPageNumber(this.page, pageNumber);
});

Then('I click page number {string}', async function (pageNumber) {
  if (pageNumber === PAGINATION.LAST_PAGE) {
    await pagination.clickLastPageNumber(this.page);
  } else {
    await pagination.clickPageNumber(this.page, pageNumber);
  }
});

Then('I click {string} button page', async function (buttonName) {
  if (buttonName === PAGINATION.BACK_PAGE) {
    await pagination.clickButtonBackPage(this.page);
  } else if (buttonName === PAGINATION.NEXT_PAGE) {
    await pagination.clickButtonNextPage(this.page);
  }
});

Then('Verify {string} button page is disable', async function (buttonName) {
  if (buttonName === PAGINATION.BACK_PAGE) {
    await pagination.checkButtonBackPageDisabled(this.page);
  } else if (buttonName === PAGINATION.NEXT_PAGE) {
    await pagination.checkButtonNextPageDisabled(this.page);
  }
});

Then('Verify {string} button page is enable', async function (buttonName) {
  if (buttonName === PAGINATION.BACK_PAGE) {
    await pagination.checkButtonBackPageEnabled(this.page);
  } else if (buttonName === PAGINATION.NEXT_PAGE) {
    await pagination.checkButtonNextPageEnabled(this.page);
  }
});

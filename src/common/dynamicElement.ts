// A, B, C, D, E, F, G, H, I ,J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z
export const DYNAMIC_ELEMENT = {
  BUTTON_TITLE: (buttonTitle: string, prefix = '') => {
    return `${prefix}//button//*[text()[normalize-space()='${buttonTitle}']] | ${prefix}//button[text()[normalize-space()='${buttonTitle}']]`;
  },
  POPUP_TITLE: (title: string) => {
    return `${DYNAMIC_ELEMENT.POPUP}//h2[text()[normalize-space()='${title}']]`;
  },
  TEXTBOX_PLACEHOLDER: (placeholder: string, prefixParent = '') => {
    return `${prefixParent}//input[@placeholder='${placeholder}']`;
  },
  DROPDOWN_NAME: (dropdownName: string, prefix = '') => {
    return `${prefix}//div[@role='combobox']//input[@name="${dropdownName}"]`;
  },
  DROPDOWN_LABEL_INPUT: (label: string, prefixParent = '') => {
    return `${prefixParent}//label[text()[normalize-space()='${label}']]//following-sibling::input`;
  },
  DROPDOWN_MESSAGE_NAME: (dropdownName: string, prefix = '') => {
    return `${DYNAMIC_ELEMENT.DROPDOWN_NAME(
      dropdownName,
      prefix,
    )}//ancestor::span[1]//div[contains(@class, 'error-message__ellipsis')]`;
  },
  TEXTBOX_MESSAGE_PLACEHOLDER: (placeholder: string, prefixParent = '') => {
    return `${DYNAMIC_ELEMENT.TEXTBOX_PLACEHOLDER(
      placeholder,
      prefixParent,
    )}//ancestor::span[1]//div[contains(@class,'error-message__ellipsis')]`;
  },
  SIDEBAR_ITEMS: '.nav-sidebar .nav-item div.nav-link',
  POPUP_ALERT: '#swal2-content',
  PAGE_TITLE: '.container-breadcrumb span.breadcrumb-item.active',
  OPTIONS: (prefixParent = '') => {
    return `${prefixParent}//div[contains(@class,'v-list-item__title')]`;
  },
  POPUP_MESSAGE_ERROR: `//div[contains(@class,'v-dialog--active')]//div[contains(@class, 'v-alert__content')]/span`,

  HOTEL_NAME: (hotelName: string) => {
    return `//p[contains(text(),'${hotelName}')]`;
  },
  PAGE_NAME: "//p[@data-testid = 'hotel_general_info_hotel_name']",
  BUTTON_OPTION: (optionValue: string, buttonName: string) => {
    return `//p[contains(text(),'${optionValue}')]//ancestor::div[contains(@class,'shadow')]//button[text()='${buttonName}']`;
  },
  TEXTBOX_CLASS: (classValue: string, prefixParent = '') => {
    return `${prefixParent}//input[contains(@class,'${classValue}')] | ${prefixParent}//input[contains(@name,'${classValue}')]`;
  },
  RADIO_LABEL: (labelValue: string) => {
    return `//label[contains(text(),'${labelValue}')]//preceding-sibling::input[@type='radio']`;
  },
  CHECKBOX_LABEL: (labelValue: string) => {
    return `//a[contains(text(),'${labelValue}')]//parent::label//span[contains(@class,'styles_checkmark')]`;
  },

  ALERT_BUTTON_CONFIRM: '//button[contains(@class, "swal2-confirm")]',
  ALERT_CONTENT: '#swal2-content',
  APP: '#app',
  BUTTON: (label: string, prefixParent = '') => {
    return `${prefixParent}//button//*[text()[normalize-space()='${label}']] | ${prefixParent}//button[text()[normalize-space()='${label}']]`;
  },
  BUTTON_LANGUAGE: 'div.setLanguage button',
  BUTTON_NAME: (buttonName: string, prefix = '') => {
    return `${prefix}//button[@name="${buttonName}"]`;
  },
  DROPDOWN: (_optionValue, prefixParent = '', label = '') => {
    const dynamicElementDropdown = "//div[@role='combobox']//input";
    if (label) {
      const dynamicElementLabel = `label[contains(text(), '${label}')]`;
      const dynamicElementInputByLabel = `${dynamicElementLabel}//following-sibling::input`;
      const blankDropdownLabel = `${prefixParent}${dynamicElementDropdown}/parent::*//${dynamicElementInputByLabel}`;
      const dropDownLabel = `${prefixParent}//${dynamicElementLabel}/following-sibling::*${dynamicElementDropdown}`;
      return `${dropDownLabel} | ${blankDropdownLabel}`;
    }
    return `${prefixParent}${dynamicElementDropdown}`;
  },
  DROPDOWN_CLEAR: (dynamicElementDropdown = '') => {
    return `${dynamicElementDropdown}//following-sibling::*//button[@aria-label="clear icon"]`;
  },
  DROPDOWN_LABEL: (xpathDropdown: string) => {
    return `${xpathDropdown}/parent::*//label`;
  },
  DROPDOWN_MESSAGE: (optionValue = '', prefixParent = '', label = '') => {
    const xpathDropdown = DYNAMIC_ELEMENT.DROPDOWN(optionValue, prefixParent, label);
    const xpathDropdownMessage =
      "//ancestor::span[1]//div[contains(@class, 'error-message__ellipsis')]";
    if (xpathDropdown.includes('|')) {
      const xpathDropdownArray = xpathDropdown.split('|').map((xpath) => {
        return `${xpath}${xpathDropdownMessage}`;
      });
      return xpathDropdownArray.join(' | ');
    }
    return `${xpathDropdown}${xpathDropdownMessage}`;
  },
  GMAIL_CHOOSE_EMAIL: (email: string) => {
    return `//div[@data-identifier='${email}']`;
  },
  GMAIL_INPUT_TYPE: (type: string) => {
    return `input[type='${type}']`;
  },
  GMAIL_LOGIN: 'button.google-login',
  GMAIL_SUBMIT_ACCESS: 'button#submit_approve_access',
  ICON: (icon: string, prefixParent = '') => {
    return `${prefixParent}//i[contains(@class,'${icon}')]`;
  },
  ICON_CLASS: (iconClass: string, prefixParent = '') => {
    return `${prefixParent}//i[contains(@class,'${iconClass}')]`;
  },
  INPUT: (label: string, prefixParent = '') => {
    return `${prefixParent}//input[@placeholder='${label}']`;
  },

  INPUT_MESSAGE: (label: string, prefixParent = '') => {
    return `${DYNAMIC_ELEMENT.INPUT(
      label,
      prefixParent,
    )}//ancestor::span[1]//div[contains(@class, 'error-message__ellipsis')]`;
  },
  INPUT_NAME: (label: string, prefixParent = '') => {
    return `${prefixParent}//input[@name='${label}']`;
  },
  LOADING: "//div[@class='wrapper-loader']//img[@class='loading']",
  LOGOUT: "//div[@role='menu']//i[@class='icon-switch2']//parent::a",
  MENU_ITEM: 'div[role="menuitem"]',
  OPTIONS_SELECTED: (dropdownLabel = '', prefixParent = '') => {
    return `${DYNAMIC_ELEMENT.OPTIONS_MENU(
      dropdownLabel,
      prefixParent,
    )}${DYNAMIC_ELEMENT.OPTIONS()}/ancestor::div[@aria-selected='true']`;
  },
  OPTIONS_PARENT: (prefixParent = '') => {
    return `${DYNAMIC_ELEMENT.OPTIONS(
      prefixParent,
    )}/ancestor::div[contains(@class,'v-menu__content')]`;
  },
  OPTIONS_ITEMS: (prefixParent = '') => {
    return `${prefixParent}//*[@role='option']`;
  },
  OPTIONS_MENU_PAGE: (dropdownName = '') => {
    return `//input[@name = '${dropdownName}']/ancestor::div[contains(@class,'v-autocomplete')]`;
  },
  OPTIONS_MENU_DROPDOWN_PAGE: () => {
    return `//div[@role='listbox']/ancestor::div[contains(@class, 'menuable__content__active')]`;
  },
  OPTIONS_MENU: (dropdownLabel = '', prefixParent = '') => {
    if (!dropdownLabel) {
      return `${prefixParent}//div[@role='listbox']/parent::*`;
    }
    return `${prefixParent}//label[contains(text(),'${dropdownLabel}')]//following-sibling::div//div[@role='listbox']/parent::*`;
  },
  PAGE_BUTTON_BACK: () => {
    return `${DYNAMIC_ELEMENT.PAGINATION}//button[contains(@class,'v-pagination__navigation')]//i[contains(@class,'mdi-chevron-left')]//parent::button`;
  },
  PAGE_BUTTON_BACK_DISABLED: () => {
    return `${DYNAMIC_ELEMENT.PAGINATION}//button[contains(@class,'v-pagination__navigation--disabled')]//i[contains(@class,'mdi-chevron-left')]//parent::button`;
  },
  PAGE_BUTTON_NEXT: () => {
    return `${DYNAMIC_ELEMENT.PAGINATION}//button[contains(@class,'v-pagination__navigation')]//i[contains(@class,'mdi-chevron-right')]//parent::button`;
  },
  PAGE_BUTTON_NEXT_DISABLED: () => {
    return `${DYNAMIC_ELEMENT.PAGINATION}//button[contains(@class,'v-pagination__navigation--disabled')]//i[contains(@class,'mdi-chevron-right')]//parent::button`;
  },
  PAGE_GO_BUTTON: "//div[@id='go-to-page']//button",
  PAGE_GO_INPUT: "//div[@id='go-to-page']//input",
  PAGE_LAST_NUMBER: () => {
    return `(${DYNAMIC_ELEMENT.PAGINATION}//nav//button[contains(@class,'v-pagination__item')])[last()]`;
  },
  PAGE_MORE: (character: string) => {
    return `${DYNAMIC_ELEMENT.PAGINATION}//span[contains(@class,'v-pagination__more') and text() = '${character}']`;
  },
  PAGE_NUMBER: (pageNumber: string) => {
    return `${DYNAMIC_ELEMENT.PAGINATION}//button[contains(@class,'v-pagination__item') and text() = '${pageNumber}']`;
  },
  PAGE_NUMBER_ACTIVE: (pageNumber: string) => {
    return `${DYNAMIC_ELEMENT.PAGINATION}//button[contains(@class,'v-pagination__item--active') and text() = '${pageNumber}']`;
  },

  PAGINATION: "//div[contains(@class,'pagination-layout')]",
  POPUP: "//div[contains(@class,'v-dialog--active')]",
  PROFILE_NAME: "//div[contains(@class,'header')]//button//span//p[contains(@class,'name')]",
  SIDEBAR: 'div.sidebar',
  TABLE_HEADER: (header: string) => {
    return `//table//th[text()[normalize-space()='${header}']]`;
  },
  TABLE_ICON: (indexNumber: number, icon: string) => {
    return `//table//td[${indexNumber}]//i[contains(@class, '${icon}')]`;
  },
  TABLE_NO_RESULT: (resultValue: string) => {
    return `//div[contains(@class,'no-result')][contains(text(), '${resultValue}')]`;
  },
  TABLE_TBODY_RESULT: (resultValue: string) => {
    return `//table//tbody//tr//td[contains(text(), '${resultValue}')]`;
  },
  TABLE_TBODY_TR: '//table//tbody//tr',
  TABLE_TD: '//table//td',
  TABLE_TD_INDEX: (indexNumber: number) => {
    return `//table//td[${indexNumber}]`;
  },
  TABLE_TH: '//table//th',
  TEXTBOX_LABEL_PLACEHOLDER: (label: string, placeholder: string, prefixParent = '') => {
    return `${prefixParent}//label[text()[normalize-space()='${label}']]//parent::*//input[@placeholder='${placeholder}']`;
  },
  TEXTBOX_NAME: (textboxName: string, prefix = '') => {
    return `${prefix}//input[@name="${textboxName}"]`;
  },
  TOOLTIP: (tooltipText: string) => {
    return `//div[contains(@class,'v-tooltip__content')]//*[text()[normalize-space()='${tooltipText}']]`;
  },
};

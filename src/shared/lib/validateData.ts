export default class ValidateData {
  /**
   * @example +77003534533
   * @param {string} value - phone format +xxxxxxxxxxxx
   * @returns {boolean}
   */
  static phone(value = '') {
    const formattedValue = value.replace(/[ +)(]/g, '');
    return formattedValue.length >= 12 && !isNaN(parseInt(formattedValue, 9));
  }

  /**
   * @example alex@tapston.com
   * @param {string} value - email format xxxx@xxx.domain
   * @returns {boolean}
   */
  static email(value = '') {
    // eslint-disable-next-line no-useless-escape
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
      value,
    );
  }

  /**
   * @example Alex
   * @param {string} value - name format String
   * @returns {boolean}
   */
  static userName(value = '') {
    return /^[a-zа-яё]{3,20}$/i.test(value.trim());
  }

  static homeAddress(value = '') {
    // eslint-disable-next-line no-useless-escape
    return /^[A-Za-z0-9'\.\-\s\,]{5,40}$/i.test(value.trim());
  }

  static characters = (password = '') => password?.length >= 8 && password?.length <= 20;
  static uppercase = (password = '') => /[A-Z]/.test(password);
  static lowercase = (password = '') => /[a-z]/.test(password);
  static number = (password = '') => /[0-9]/.test(password);
  static special = (password = '') => /([@#!$?])/.test(password);
  static allValidationPassword = (password = '') =>
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#!$?])[-\w@#!$?]{5,20}$/.test(password);

  /**
   * @example 22.12.1999
   * @param {string} value - date format dd.mm.yyyy
   * @returns {boolean}
   */
  static date(value = '') {
    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
      return false;
    }
    const date = new Date(value.split('.').reverse().join('-'));
    return (
      !isNaN(date.getTime()) && date.getTime() <= Date.now() && date.getFullYear() >= 1900
    );
  }

  private static expiryDataRegex = /^(\d{2})\/(\d{4}|\d{2})$/;
  private static monthRegex = /(0[1-9]|1[0-2])/;
  static expiryDate = (expiryDate: string) => {
    const splitDate = expiryDate.split('/');
    if (!this.expiryDataRegex.test(expiryDate)) {
      return 'Expiry date is invalid';
    }
    const expiryMonth = splitDate[0];
    if (!this.monthRegex.test(expiryMonth)) {
      return 'Expiry month should be between 01 and 12';
    }

    const expiryYear = splitDate[1];
    const currentYear = new Date().getFullYear().toString()?.substring(2, 4);
    if (currentYear > expiryYear) {
      return 'Expiry year cannot be in the past, error';
    }
    if (currentYear === expiryYear && Number(expiryMonth) - 1 < new Date().getMonth()) {
      return 'Already expired';
    }
    return false;
  };
}

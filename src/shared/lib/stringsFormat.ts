import dayjs from "dayjs";

export default class StringsFormat {
  static deleteLetters = (str: string = ""): string => {
    return str.replace(/[^0-9,\s]/g, "");
  };
  static deleteSpaces = (str: string = ""): string => {
    return str.replace(/\s/g, "");
  };

  static formatYMD(date: Date): string {
    return dayjs(date).format("YYYY-MM-DD");
  }

  static dateInput = (date: Date): string => {
    if (!date) {
      return "";
    }
    return dayjs(date).format("DD/MM/YYYY");
  };

  static dateTransaction = (date: Date | string): string => {
    return dayjs(date).format("DD MMM YYYY [at] h:mm A");
  };

  static dateFormInput = (date: string): Date => {
    if (!date) {
      return new Date();
    }
    const d = date.split("/");
    return new Date(d[2] + "-" + d[1] + "-" + d[0]);
  };

  static dateISOFromInput = (date: string): string => {
    if (!date) {
      return new Date().toISOString();
    }
    return this.dateFormInput(date).toISOString();
  };

  static getMinSecFromTimer = (timer: number): string => {
    const min = Math.floor(timer / 60);
    const sec = timer - 60 * min;
    return `${min}:${sec}`;
  };

  static securityMobileNumber = (number = ""): string => {
    const length = number.length;
    const first = number.substring(0, Math.floor(length / 4));
    const last = number.substring(length - 3, length);

    return `${first} XXX ${last}`;
  };

  static securityMobileNumberWithCode = (number = ""): string => {
    const length = number.length;
    const first = number.substring(0, Math.floor(length / 4));
    const last = number.substring(length - 3, length);
    return `+${first}, XXX XXX ${last}`;
  };

  static returnMaskedMobileNumber = (number = ""): string => {
    const firstPart = number.slice(0, 3);
    const secondPart = ` XXX ${number.slice(3)}`;

    return firstPart + secondPart;
  };

  static abbreviatedName = (firstname: string, lastname: string) => {
    return `${firstname} ${lastname.slice(0, 1)}.`;
  };

  static extractMobileNumber(mobileNumber: string, mobileCode: string) {
    const regex = new RegExp(`^${mobileCode}`);
    let result = mobileNumber;
    if (mobileNumber?.length >= 10) {
      result = mobileNumber.replace(regex, "");
    }

    // const result = mobileNumber.replace(mobileCode, "");
    return result;
  }

  static formatDateForOnboarding(date: string) {
    const result = date.replace(/\//g, "-").split("-").reverse().join("-");
    return result;
  }


  static formatName(name: string) {
    if (!name) {
      return null;
    }
    return name.replace(
      /^(.)(.*)$/,
      (_, firstLetter, restOfName) =>
        firstLetter?.toUpperCase() + restOfName?.toLowerCase()
    );
  }

  static takeFourDigits = (str: string = "") => {
    const length = str.length;
    if (length <= 4) {
      return str;
    }
    return str.substring(length, length - 4);
  };

  static takeFourDigitsWithMask = (str: string = "") => {
    return `XXXX XXXX ${str.slice(str.length - 4)}`;
  };

  static replaceAmountValue = (text: string) => {
    return text.match(/^0+$/)
      ? "0"
      : text[0] && text[0].match(/\.|,/)
      ? "0."
      : text.match(/^0\d+$/)
      ? text.substring(1)
      : text
          .replace(",", ".")
          .replace(/[^0-9.]/g, "")
          .replace(
            /^([^.]*\.)(.*)$/,
            (a, b, c) => b + c.replace(/\./g, "").substring(0, 2)
          );
  };

  static replaceNumberValue = (text: string) => {
    return text.match(/^0+$/)
      ? "0"
      : text[0] && text[0].match(/\.|,/)
      ? "0."
      : text.match(/^0\d+$/)
      ? text.substring(1)
      : text
          .replace(",", ".")
          .replace(/[^0-9.]/g, "")
          .replace(
            /^([^.]*\.)(.*)$/,
            (a, b, c) => b + c.replace(/\./g, "").substring(0, 2)
          );
  };

  static dateFromISOString(defaultDate: string) {
    if (!defaultDate) {
      return null;
    }

    const date = new Date(defaultDate);
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    return `${day}.${month}.${year}`;
  }

  static getHour = (date: number): string => {
    return dayjs(date).format("HH");
  };

  static dateExpressToken = (date: number): string => {
    return dayjs(date).format("h:mm A | DD/MM/YYYY");
  };
}

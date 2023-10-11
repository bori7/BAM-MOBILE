import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const apiCallInit = (otherHeaders: any) =>
  axios.create({
    baseURL: "",
    headers: {
      "Content-Type": "application/json",
      ...otherHeaders,
    },
    // timeout: 5000,
    timeoutErrorMessage: "RISE API Time out Exceeded",
  });

export const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  // console.log(day);
  // const month = monthName[date.getMonth()];

  const month = monthNumber[date.getMonth()];

  const year = date.getFullYear();
  // return `${day}-${month.substring(0, 3)}-${year}`;
  return `${year}-${month}-${day}`;
};

export const formatDatePlaDetails = (date: String | undefined) => {
  if (!date) {
    return date;
  }
  console.log(date);
  date = date.substring(0, 10);
  const day = date.substring(8);
  const m: any = date.substring(5, 7);
  const y = date.substring(0, 4);

  const month = monthName[+m];

  // const month = monthNumber[date.getMonth()];

  const year = y;
  return `${day} ${month}, ${year}`;
  // return `${year}-${month}-${day}`;
};

export const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const monthNumber = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

export const computeEstimatedMonthlyInvestment = (
  amount: string | undefined,
  date: string | undefined
) => {
  let ans = 0;

  const yearDiff =
    new Date(date || new Date()).getFullYear() + 2 - new Date().getFullYear();
  ans = Math.floor(parseFloat(amount || "0.00") / (yearDiff * 12));

  console.log(ans, amount, yearDiff);

  return ans;
};

export async function secureSave(key: string, value: any) {
  console.log("Value: ", value);
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }
  // console.log('Value1: ', value);
  await SecureStore.setItemAsync(key, value);
}

export async function secureGet(key: string, funcTodo: Function) {
  const result = await SecureStore.getItemAsync(key);

  // if (typeof result == 'string') {
  //   result = JSON.parse(result);
  // }

  if (funcTodo != null) {
    funcTodo(result);
  } else if (result) {
    // console.log(`🔐 Here's your value 🔐 \n${result}`);
  } else {
    // console.log('No values stored under that key.');
  }
}

export async function getStuffFromSecureStore(key: string) {
  // const result =
  try {
    return await SecureStore.getItemAsync(key).then((token) => {
      // console.log(`🔐 Here's your value 🔐 \n${token}`);
      // console.log('this is the token from SecureGet', key, token);
      return token;
    });
  } catch (error) {
    // console.log('Errors in getTokenFromSecureStore', error);
    return null;
  }

  // return result;
}

export async function secureDelete(key: string) {
  await SecureStore.deleteItemAsync(key);
}

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
    timeoutErrorMessage: "Bible App API timed out",
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

export const formatDatePlanDetails = (date: String | undefined) => {
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

export const formatNoteDate = (date: Date) => {
  const day = date.getDate();
  const month = monthName[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};

export const getDayOfTheWeek = (val: number) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // const date = new Date(dateString);
  // const dayOfWeek = date.getDay();

  return daysOfWeek[val];
};

export const getPartOfDay = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Afternoon";
  } else {
    return "Evening";
  }
};

export const formatSubscriptionDate = (date: Date) => {
  const day = date.getDate();
  const month = monthName[date.getMonth()];
  const year = date.getFullYear();

  return `${month.substring(0, 3)} ${day}, ${year}`;
};
export const convertTo12HourFormat = (timeStr: string) => {
  const [hour, minute, second] = timeStr.split(":");
  const hh = parseInt(hour, 10);

  // Determine AM or PM
  const ampm = hh >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  const hh12 = hh % 12 || 12; // 0 should be converted to 12

  // Formatted time string
  // const formattedTime = `${hh12}:${minute}:${second} ${ampm}`;

  const formattedTime = `${hh12}:${minute} ${ampm}`;

  return formattedTime;
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

export const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    let l = v
      .toString(16)
      .replace("-", "")
      .replace("-", "")
      .replace("-", "")
      .replace("-", "")
      .replace("-", "");
    return l;
  });
};

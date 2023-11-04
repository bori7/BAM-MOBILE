import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ActiveSubscriptionDataType,
  GivingTransactionDataType,
  InitialMoreStateType,
  MoreDataType,
} from "../../shared/types/slices";
import {
  dateOptions,
  testGivingTransactions,
  timeOptions,
} from "../../constants/values";
import {
  formatNoteDate,
  formatSubscriptionDate,
  generateUUID,
} from "../../shared/helper";

const initialMoreState: InitialMoreStateType = {
  moreData: {},
  moreLoading: false,
  activeSubscriptionData: {
    subscriptionType: "Annually",
    dateNextSubscription: "",
    numberOfDaysLeft: "",
    status: "Suspended",
    amountPaid: "",
    paymentMethod: "Card",
    dateOfSubscription: new Date(),
  },
  moreError: null,
  moreMessage: "",
  givingTransactions: testGivingTransactions || [],
  selectedGivingTransaction: null,
};

export const moreSlice = createSlice({
  name: "moreSlice",
  initialState: initialMoreState,
  reducers: {
    updateMoreData: (state, action: PayloadAction<MoreDataType>) => {
      state.moreData = action.payload;
    },

    updateActiveSubsriptionData: (
      state,
      action: PayloadAction<ActiveSubscriptionDataType>
    ) => {
      let addMonths = 1;
      switch (action.payload.subscriptionType) {
        case "Annually":
          addMonths = 12;
          break;
        case "Monthly":
          addMonths = 1;
          break;
        case "Quarterly":
          addMonths = 3;
          break;
        default:
          addMonths = 1;
          break;
      }

      const nextSubscription = new Date(
        new Date().setMonth(new Date().getMonth() + addMonths)
      );

      let numberOfDaysLeft = Math.floor(
        (Number(nextSubscription) - Number(new Date())) / (1000 * 3600 * 24)
      );
      console.log(nextSubscription);
      console.log(numberOfDaysLeft);

      let newActiveSubscriptionData: ActiveSubscriptionDataType = {
        subscriptionType: action.payload.subscriptionType,
        dateNextSubscription: formatSubscriptionDate(nextSubscription),
        numberOfDaysLeft: numberOfDaysLeft,
        status: "Active",
        amountPaid: action.payload.amountPaid.replace("/year", ""),
        paymentMethod: "Card",
        dateOfSubscription: new Date(),
      };
      state.activeSubscriptionData = newActiveSubscriptionData;
    },

    addGivingTransaction: (
      state,
      action: PayloadAction<GivingTransactionDataType>
    ) => {
      let newGivingTransactionList = [];
      const datetime = new Date().toISOString();
      const time = new Date()
        .toLocaleTimeString(undefined, timeOptions)
        .toLocaleUpperCase();
      // const date = new Date()
      //   .toLocaleDateString(undefined, dateOptions)
      //   .toLocaleUpperCase();
      const date = formatSubscriptionDate(new Date());
      const reference = "BAM" + generateUUID().substring(0, 10).toUpperCase();
      const status = "Successful";
      const uid =
        action.payload.uid || (newGivingTransactionList.length + 1).toString();
      newGivingTransactionList = [
        { ...action.payload, datetime, date, uid, time, reference, status },
        ...state.givingTransactions,
      ];

      state.givingTransactions = newGivingTransactionList;
    },

    setSelectedGivingTransaction: (state, action: PayloadAction<number>) => {
      state.selectedGivingTransaction =
        state.givingTransactions[action.payload] || null;
    },

    updateMoreLoading: (state, action: PayloadAction<boolean>) => {
      state.moreLoading = action.payload;
    },

    updateMoreState: (state, action: PayloadAction<InitialMoreStateType>) => {
      state.moreData = action.payload.moreData;
      state.moreError = action.payload.moreError;
      state.moreLoading = action.payload.moreLoading;
      state.moreMessage = action.payload.moreMessage;
      state.activeSubscriptionData = action.payload.activeSubscriptionData;
    },

    clearMoreState: (state) => {
      state.moreLoading = false;
      state.moreError = null;
      state.moreMessage = "";
      state.moreData = null;
      state.activeSubscriptionData = null;
    },
  },
});

export const { actions: moreActions, reducer: moreReducer } = moreSlice;

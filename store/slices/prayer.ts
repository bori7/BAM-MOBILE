import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InitialPrayersStateType,
  PrayerProps,
  PrayersDataType,
} from "../../shared/types/slices";
import { dateOptions, testPrayers, timeOptions } from "../../constants/values";
import { formatNoteDate } from "../../shared/helper";

const initialPrayersState: InitialPrayersStateType = {
  prayersData: {
    prayersList: testPrayers || [],
  },
  prayersLoading: false,
  prayersError: null,
  prayersMessage: "",
};

export const prayersSlice = createSlice({
  name: "prayerslice",
  initialState: initialPrayersState,
  reducers: {
    updatePrayersData: (state, action: PayloadAction<PrayersDataType>) => {
      state.prayersData = action.payload;
    },

    updateOrAddPrayer: (state, action: PayloadAction<PrayerProps>) => {
      let newPrayerList =
        state.prayersData?.prayersList?.filter((prayer, _) => {
          return prayer.uid != action.payload.uid;
        }) || [];
      const datetime = new Date().toISOString();
      const time = new Date()
        .toLocaleTimeString(undefined, timeOptions)
        .toLocaleUpperCase();
      // const date = new Date()
      //   .toLocaleDateString(undefined, dateOptions)
      //   .toLocaleUpperCase();
      const date = formatNoteDate(new Date());
      const uid = action.payload.uid || (newPrayerList.length + 1).toString();
      newPrayerList = [
        { ...action.payload, datetime, date, uid, time },
        ...newPrayerList,
      ];

      state.prayersData = { ...state.prayersData, prayersList: newPrayerList };
    },

    deletedPrayer: (state, action: PayloadAction<string>) => {
      const newPrayerList =
        state.prayersData?.prayersList?.filter((prayer, _) => {
          return prayer.uid != action.payload;
        }) || [];

      state.prayersData = { ...state.prayersData, prayersList: newPrayerList };
    },
    updatePrayersLoading: (state, action: PayloadAction<boolean>) => {
      state.prayersLoading = action.payload;
    },

    updatePrayersState: (
      state,
      action: PayloadAction<InitialPrayersStateType>
    ) => {
      state.prayersData = action.payload.prayersData;
      state.prayersError = action.payload.prayersError;
      state.prayersLoading = action.payload.prayersLoading;
      state.prayersMessage = action.payload.prayersMessage;
    },

    clearPrayersState: (state) => {
      state.prayersLoading = false;
      state.prayersError = null;
      state.prayersMessage = "";
      state.prayersData = null;
    },
  },
});

export const { actions: prayersActions, reducer: prayersReducer } =
  prayersSlice;

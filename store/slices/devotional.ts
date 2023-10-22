import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InitialDevotionalStateType,
  DevotionalDataType,
  DevotionalItemProps,
} from "../../shared/types/slices";
import { testDevotional } from "../../constants/values";
import { formatNoteDate } from "../../shared/helper";

const initialDevotionalState: InitialDevotionalStateType = {
  devotionalData: {
    devotionalList: testDevotional || [],
  },
  devotionalLoading: false,
  devotionalError: null,
  devotionalMessage: "",
};

export const devotionalSlice = createSlice({
  name: "devotionalslice",
  initialState: initialDevotionalState,
  reducers: {
    updateDevotionalData: (
      state,
      action: PayloadAction<DevotionalDataType>
    ) => {
      state.devotionalData = action.payload;
    },

    updateOrAddDevotional: (
      state,
      action: PayloadAction<DevotionalItemProps>
    ) => {
      let newDevotionalList =
        state.devotionalData?.devotionalList?.filter((note, _) => {
          return note.uid != action.payload.uid;
        }) || [];
      //   const datetime = new Date().toISOString();
      //   const time = new Date()
      //     .toLocaleTimeString(undefined, timeOptions)
      //     .toLocaleUpperCase();
      // const date = new Date()
      //   .toLocaleDateString(undefined, dateOptions)
      //   .toLocaleUpperCase();
      const date = formatNoteDate(new Date());
      const uid =
        action.payload.uid || (newDevotionalList.length + 1).toString();
      newDevotionalList = [
        { ...action.payload, date, uid },
        ...newDevotionalList,
      ];

      state.devotionalData = {
        ...state.devotionalData,
        devotionalList: newDevotionalList,
      };
    },

    deletedDevotional: (state, action: PayloadAction<string>) => {
      const newDevotionalList =
        state.devotionalData?.devotionalList?.filter((note, _) => {
          return note.uid != action.payload;
        }) || [];

      state.devotionalData = {
        ...state.devotionalData,
        devotionalList: newDevotionalList,
      };
    },
    updateDevotionalLoading: (state, action: PayloadAction<boolean>) => {
      state.devotionalLoading = action.payload;
    },

    updateDevotionalState: (
      state,
      action: PayloadAction<InitialDevotionalStateType>
    ) => {
      state.devotionalData = action.payload.devotionalData;
      state.devotionalError = action.payload.devotionalError;
      state.devotionalLoading = action.payload.devotionalLoading;
      state.devotionalMessage = action.payload.devotionalMessage;
    },

    clearDevotionalState: (state) => {
      state.devotionalLoading = false;
      state.devotionalError = null;
      state.devotionalMessage = "";
      state.devotionalData = null;
    },
  },
});

export const { actions: devotionalActions, reducer: devotionalReducer } =
  devotionalSlice;

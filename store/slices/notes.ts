import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InitialNotesStateType,
  NoteProps,
  NotesDataType,
} from "../../shared/types/slices";
import { dateOptions, testNotes, timeOptions } from "../../constants/values";
import { formatNoteDate } from "../../shared/helper";

const initialNotesState: InitialNotesStateType = {
  notesData: {
    notesList: testNotes || [],
  },
  notesLoading: false,
  notesError: null,
  notesMessage: "",
};

export const notesSlice = createSlice({
  name: "notesSlice",
  initialState: initialNotesState,
  reducers: {
    updateNotesData: (state, action: PayloadAction<NotesDataType>) => {
      state.notesData = action.payload;
    },

    updateOrAddNote: (state, action: PayloadAction<NoteProps>) => {
      let newNoteList =
        state.notesData?.notesList?.filter((note, _) => {
          return note.uid != action.payload.uid;
        }) || [];
      const datetime = new Date().toISOString();
      const time = new Date()
        .toLocaleTimeString(undefined, timeOptions)
        .toLocaleUpperCase();
      // const date = new Date()
      //   .toLocaleDateString(undefined, dateOptions)
      //   .toLocaleUpperCase();
      const date = formatNoteDate(new Date());
      const uid = action.payload.uid || (newNoteList.length + 1).toString();
      newNoteList = [
        { ...action.payload, datetime, date, uid, time },
        ...newNoteList,
      ];

      state.notesData = { ...state.notesData, notesList: newNoteList };
    },

    deletedNote: (state, action: PayloadAction<string>) => {
      const newNoteList =
        state.notesData?.notesList?.filter((note, _) => {
          return note.uid != action.payload;
        }) || [];

      state.notesData = { ...state.notesData, notesList: newNoteList };
    },
    updateNotesLoading: (state, action: PayloadAction<boolean>) => {
      state.notesLoading = action.payload;
    },

    updateNotesState: (state, action: PayloadAction<InitialNotesStateType>) => {
      state.notesData = action.payload.notesData;
      state.notesError = action.payload.notesError;
      state.notesLoading = action.payload.notesLoading;
      state.notesMessage = action.payload.notesMessage;
    },

    clearNotesState: (state) => {
      state.notesLoading = false;
      state.notesError = null;
      state.notesMessage = "";
      state.notesData = null;
    },
  },
});

export const { actions: notesActions, reducer: notesReducer } = notesSlice;

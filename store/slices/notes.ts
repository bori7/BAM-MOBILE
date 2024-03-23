import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    DevotionalItemProps,
    InitialNotesStateType,
    NoteProps,
    NotesDataType,
} from "../../shared/types/slices";
import {dateOptions, testNotes, timeOptions} from "../../constants/values";
import {formatNoteDate} from "../../shared/helper";
import {createNoteCall, deleteNoteCall, fetchNoteByUserIdCall, updateNoteCall} from "../apiThunks/note";
import {fetchAllDevotionalCall} from "../apiThunks/devotional";
import {CreateNoteRequestType} from "../../services/note/type";

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
                {...action.payload, datetime, date, uid, time},
                ...newNoteList,
            ];

            state.notesData = {...state.notesData, notesList: newNoteList};
        },

        deletedNote: (state, action: PayloadAction<string>) => {
            const newNoteList =
                state.notesData?.notesList?.filter((note, _) => {
                    return note.uid != action.payload;
                }) || [];

            state.notesData = {...state.notesData, notesList: newNoteList};
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

        clearNotesError: (state) => {

            state.notesError = null;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchNoteByUserIdCall.pending, state => {
            state.notesLoading = true
        })
        builder.addCase(fetchNoteByUserIdCall.rejected, (state, action: any) => {
            state.notesLoading = false;
            state.notesMessage = "";
            state.notesError = {
                code: action.payload?.response?.data?.responseCode || "89",
                message:
                    action.payload?.response?.data?.message ||
                    // action.error?.message ||
                    "Unable to fetch notes at the moment",
            }
            state.notesData = {
                ...state.notesData,
                notesList: []
            }

        })
        builder.addCase(fetchNoteByUserIdCall.fulfilled, (state, {payload}) => {
            state.notesLoading = false;
            state.notesError = null;
            state.notesMessage = `Successfully fetched notes from the server`;
            const notesList: NoteProps[] = payload.payload?.filter((note,_)=>!note.deleted).map((note, idx) => {

                const datetime = note.datetime || "";
                const time = new Date(note.updatedAt || "")
                    .toLocaleTimeString(undefined, timeOptions)
                    .toLocaleUpperCase();
                const date = formatNoteDate(new Date(note.updatedAt || ""));

                return {
                    uid: note.id || "",
                    title: note.title,
                    text: note.text,
                    datetime: datetime,
                    date: date,
                    time: time,
                }
            });

            debug.log("notesList", notesList)
            state.notesData = {
                ...state.notesData,
                notesList
            }
        })
        builder.addCase(createNoteCall.pending, state => {
            state.notesLoading = true
        })
        builder.addCase(createNoteCall.rejected, (state, action: any) => {
            state.notesLoading = false;
            state.notesMessage = "";
            state.notesError = {
                code: action.payload?.response?.data?.responseCode || "89",
                message:
                    action.payload?.response?.data?.message ||
                    // action.error?.message ||
                    "Unable to create note at the moment",
            }
        })
        builder.addCase(createNoteCall.fulfilled, (state, {payload}) => {
            state.notesLoading = false;
            state.notesError = null;
            state.notesMessage = `Successfully created note in the server`;

        })
        builder.addCase(updateNoteCall.pending, state => {
            state.notesLoading = true
        })
        builder.addCase(updateNoteCall.rejected, (state, action: any) => {
            state.notesLoading = false;
            state.notesMessage = "";
            state.notesError = {
                code: action.payload?.response?.data?.responseCode || "89",
                message:
                    action.payload?.response?.data?.message ||
                    // action.error?.message ||
                    "Unable to update note at the moment",
            }
        })
        builder.addCase(updateNoteCall.fulfilled, (state, {payload}) => {
            state.notesLoading = false;
            state.notesError = null;
            state.notesMessage = `Successfully updated note in the server`;
        })
        builder.addCase(deleteNoteCall.pending, state => {
            state.notesLoading = true
        })
        builder.addCase(deleteNoteCall.rejected, (state, action: any) => {
            state.notesLoading = false;
            state.notesMessage = "";
            state.notesError = {
                code: action.payload?.response?.data?.responseCode || "89",
                message:
                    action.payload?.response?.data?.message ||
                    // action.error?.message ||
                    "Unable to delete note at the moment",
            }
        })
        builder.addCase(deleteNoteCall.fulfilled, (state, {payload}) => {
            state.notesLoading = false;
            state.notesError = null;
            state.notesMessage = `Successfully deleted note in the server`;
        })


    }
});

export const {actions: notesActions, reducer: notesReducer} = notesSlice;

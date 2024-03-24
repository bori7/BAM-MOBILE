import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    InitialPrayersStateType, NoteProps,
    PrayerProps,
    PrayersDataType,
} from "../../shared/types/slices";
import {dateOptions, testPrayers, timeOptions} from "../../constants/values";
import {formatNoteDate} from "../../shared/helper";
import {createPrayerCall, deletePrayerCall, fetchPrayerByUserIdCall, updatePrayerCall} from "../apiThunks/prayer";
import {createNoteCall, deleteNoteCall, fetchNoteByUserIdCall, updateNoteCall} from "../apiThunks/note";

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
                {...action.payload, datetime, date, uid, time},
                ...newPrayerList,
            ];

            state.prayersData = {...state.prayersData, prayersList: newPrayerList};
        },

        deletedPrayer: (state, action: PayloadAction<string>) => {
            const newPrayerList =
                state.prayersData?.prayersList?.filter((prayer, _) => {
                    return prayer.uid != action.payload;
                }) || [];

            state.prayersData = {...state.prayersData, prayersList: newPrayerList};
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

        clearPrayersError: (state) => {
            state.prayersError = null;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchPrayerByUserIdCall.pending, state => {
            state.prayersLoading = true
        })
        builder.addCase(fetchPrayerByUserIdCall.rejected, (state, action: any) => {
            state.prayersLoading = false;
            state.prayersMessage = "";
            state.prayersError = {
                code: action.payload?.response?.data?.responseCode || "89",
                message:
                    action.payload?.response?.data?.message ||
                    // action.error?.message ||
                    "Unable to fetch notes at the moment",
            }
            state.prayersData = {
                ...state.prayersData,
                prayersList: []
            }
        })
        builder.addCase(fetchPrayerByUserIdCall.fulfilled, (state, {payload}) => {
            state.prayersLoading = false;
            state.prayersError = null;
            state.prayersMessage = `Successfully fetched notes from the server`;
            const prayersList: PrayerProps[] = payload.payload?.filter((prayer, _) => !prayer.deleted).map((prayer, idx) => {

                const datetime = prayer.dateTime || prayer.updatedAt || "";
                const time = new Date(prayer.updatedAt || "")
                    .toLocaleTimeString(undefined, timeOptions)
                    .toLocaleUpperCase();
                const date = formatNoteDate(new Date(prayer.updatedAt || ""));

                return {
                    uid: prayer.id || "",
                    title: prayer.title,
                    text: prayer.text,
                    datetime: datetime,
                    date: date,
                    time: time,
                    answered: prayer.answered || false
                }
            });
            debug.log("prayersList", prayersList)
            state.prayersData = {
                ...state.prayersData,
                prayersList
            }
        })
        builder.addCase(createPrayerCall.pending, state => {
            state.prayersLoading = true
        })
        builder.addCase(createPrayerCall.rejected, (state, action: any) => {
            state.prayersLoading = false;
            state.prayersMessage = "";
            state.prayersError = {
                code: action.payload?.response?.data?.responseCode || "89",
                message:
                    action.payload?.response?.data?.message ||
                    // action.error?.message ||
                    "Unable to create prayer at the moment",
            }
        })
        builder.addCase(createPrayerCall.fulfilled, (state, {payload}) => {
            state.prayersLoading = false;
            state.prayersError = null;
            state.prayersMessage = `Successfully created prayer in the server`;

        })

        builder.addCase(updatePrayerCall.pending, state => {
            state.prayersLoading = true
        })
        builder.addCase(updatePrayerCall.rejected, (state, action: any) => {
            state.prayersLoading = false;
            state.prayersMessage = "";
            state.prayersError = {
                code: action.payload?.response?.data?.responseCode || "89",
                message:
                    action.payload?.response?.data?.message ||
                    // action.error?.message ||
                    "Unable to update prayer at the moment",
            }
        })
        builder.addCase(updatePrayerCall.fulfilled, (state, {payload}) => {
            state.prayersLoading = false;
            state.prayersError = null;
            state.prayersMessage = `Successfully prayer note in the server`;
        })

        builder.addCase(deletePrayerCall.pending, state => {
            state.prayersLoading = true
        })
        builder.addCase(deletePrayerCall.rejected, (state, action: any) => {
            state.prayersLoading = false;
            state.prayersMessage = "";
            state.prayersError = {
                code: action.payload?.response?.data?.responseCode || "89",
                message:
                    action.payload?.response?.data?.message ||
                    // action.error?.message ||
                    "Unable to delete prayers at the moment",
            }
        })
        builder.addCase(deletePrayerCall.fulfilled, (state, {payload}) => {
            state.prayersLoading = false;
            state.prayersError = null;
            state.prayersMessage = `Successfully deleted prayers in the server`;
        })
    }
});

export const {actions: prayersActions, reducer: prayersReducer} =
    prayersSlice;

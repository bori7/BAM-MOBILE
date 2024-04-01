import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    InitialDevotionalStateType,
    DevotionalDataType,
    DevotionalItemProps,
    SelectedDevotionalDataType, GeneralVerseOfTheDayType,
} from "../../shared/types/slices";
import {testDevotional, testSelectedDevotional} from "../../constants/values";
import {formatNoteDate} from "../../shared/helper";
import {signUpCall} from "../apiThunks/user";
import {
    fetchAllDevotionalCall,
    fetchDevotionalByIdCall,
    fetchUserDevotionalCall,
    updateUserDevotionalCall
} from "../apiThunks/devotional";
import {fetchAllVodCall} from "../apiThunks/vod";
import {ImageSourcePropType} from "react-native";
import {FetchUserDevotionalPayloadType} from "../../services/userdevotional/type";

const initialDevotionalState: InitialDevotionalStateType = {
    devotionalData: {
        // devotionalList: testDevotional || [],
        devotionalList: [],
        userDevotional: null
    },
    devotionalLoading: false,
    devotionalError: null,
    devotionalMessage: "",
    selectedDevotionalData: null,
    // selectedDevotionalData: testSelectedDevotional || null,
};

export const devotionalSlice = createSlice({
    name: "devotionalslice",
    initialState: initialDevotionalState,
    reducers: {
        updateSelectedDevotionalData: (
            state,
            action: PayloadAction<SelectedDevotionalDataType>
        ) => {
            state.selectedDevotionalData = action.payload;
        },
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
            //   const date = new Date()
            //   .toLocaleDateString(undefined, dateOptions)
            //   .toLocaleUpperCase();
            const date = formatNoteDate(new Date());
            const uid =
                action.payload.uid || (newDevotionalList.length + 1).toString();
            newDevotionalList = [
                {...action.payload, date, uid},
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

        updateUserDevotionalState: (
            state,
            action: PayloadAction<string[]>
        ) => {
            const readIdsSet = new Set(action.payload)
            state.devotionalData.userDevotional = {
                ...state.devotionalData.userDevotional as FetchUserDevotionalPayloadType,
                readIds: [...readIdsSet]
            };
        },
        clearDevotionalError: (state) => {
            state.devotionalError = null;
        },

        clearDevotionalState: (state) => {
            state.devotionalLoading = false;
            state.devotionalError = null;
            state.devotionalMessage = "";
            state.devotionalData = {
                devotionalList: [],
                userDevotional: null
            };
            state.selectedDevotionalData = null
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchAllDevotionalCall.pending, state => {
            state.devotionalLoading = true
        })
        builder.addCase(fetchAllDevotionalCall.rejected, (state, action: any) => {
            state.devotionalLoading = false;
            state.devotionalMessage = "";
            state.devotionalError = null;
            // state.devotionalError = {
            //     code: action.payload?.response?.data?.responseCode || "89",
            //     message:
            //         action.payload?.response?.data?.message ||
            //         // action.error?.message ||
            //         "Unable to fetch devotionals at the moment",
            // }

        })
        builder.addCase(fetchAllDevotionalCall.fulfilled, (state, {payload}) => {
            state.devotionalLoading = false;
            state.devotionalError = null;
            state.devotionalMessage = `Successfully fetched devotionals from the server`;
            const devotionalList: DevotionalItemProps[] = payload.payload.devotionals?.map((devo, idx) => {
                return {
                    uid: devo.id,
                    image: {
                        uri: devo.image
                    },
                    date: devo.date,
                    title: devo.title,
                    text: devo.text,
                    ticked: false,
                    datetime: devo.updatedAt
                }
            });
            debug.log("devotionalList", devotionalList)
            state.devotionalData = {
                ...state.devotionalData,
                devotionalList: devotionalList
            }
        })
        builder.addCase(fetchUserDevotionalCall.pending, state => {
            state.devotionalLoading = true
        })
        builder.addCase(fetchUserDevotionalCall.rejected, (state, action: any) => {
            state.devotionalLoading = false;
            state.devotionalMessage = "";
            state.devotionalError = null;
            // state.devotionalError = {
            //     code: action.payload?.response?.data?.responseCode || "89",
            //     message:
            //         action.payload?.response?.data?.message ||
            //         // action.error?.message ||
            //         "Unable to fetch user devotional at the moment",
            // }

        })
        builder.addCase(fetchUserDevotionalCall.fulfilled, (state, {payload}) => {
            state.devotionalLoading = false;
            state.devotionalError = null;
            state.devotionalMessage = `Successfully fetched user devotional from the server`;
            state.devotionalData.userDevotional = payload.payload

        })
        builder.addCase(updateUserDevotionalCall.pending, state => {
            state.devotionalLoading = true
        })
        builder.addCase(updateUserDevotionalCall.rejected, (state, action: any) => {
            state.devotionalLoading = false;
            state.devotionalMessage = "";
            state.devotionalError = {
                code: action.payload?.response?.data?.responseCode || "89",
                message:
                    action.payload?.response?.data?.message ||
                    // action.error?.message ||
                    "Unable to update user devotional at the moment",
            }

        })
        builder.addCase(updateUserDevotionalCall.fulfilled, (state, {payload}) => {
            state.devotionalLoading = false;
            state.devotionalError = null;
            state.devotionalMessage = `Successfully fetched user devotional from the server`;
            state.devotionalData.userDevotional = {
                ...state.devotionalData.userDevotional as FetchUserDevotionalPayloadType,
                id: payload.payload.userDevotionalId
            }

        })
        builder.addCase(fetchDevotionalByIdCall.pending, state => {
            state.devotionalLoading = true
        })
        builder.addCase(fetchDevotionalByIdCall.rejected, (state, action: any) => {
            state.devotionalLoading = false;
            state.devotionalMessage = "";
            state.devotionalError = {
                code: action.payload?.response?.data?.responseCode || "89",
                message:
                    action.payload?.response?.data?.message ||
                    // action.error?.message ||
                    "Unable to fetch the selected devotional at the moment",
            }

        })
        builder.addCase(fetchDevotionalByIdCall.fulfilled, (state, {payload}) => {
            state.devotionalLoading = false;
            state.devotionalError = null;
            state.devotionalMessage = `Successfully fetched the selected devotional from the server`;
            state.selectedDevotionalData = {
                ...payload.payload.devotional,
                uid: payload.payload.devotional.id,
                ticked: true,
                image: {
                    uri: payload.payload.devotional.image
                },
                subMessages: payload.payload.devotional?.subMessages?.map(sub => {
                    return {
                        title: sub.title,
                        message: sub.message
                    }
                }) || []

            }


        })
    }
});

export const {actions: devotionalActions, reducer: devotionalReducer} =
    devotionalSlice;

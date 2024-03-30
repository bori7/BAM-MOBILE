import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {
    InitialGeneralStateType,
    GeneralDataType,
    NotificationsFormSliceType, GeneralVerseOfTheDayType,
} from "../../shared/types/slices";
import {
    testNotificationsForm,
    testVerseOfTheDayList,
} from "../../constants/values";
import {NotificationsFormType} from "../../pages/More/EmailNotifications";
import {signInCall, signUpCall} from "../apiThunks/user";
import {fetchAllVodCall} from "../apiThunks/vod";
import {initiatePaymentCall} from "../apiThunks/payment";

const initialGeneralState: InitialGeneralStateType = {
    generalData: null,
    generalEmailNotificationForms: testNotificationsForm,
    generalPushNotificationForms: testNotificationsForm,
    generalVerseOfTheDayList: testVerseOfTheDayList,
    generalLoading: false,
    generalError: null,
    generalMessage: "",
};

export const generalSlice = createSlice({
    name: "generalslice",
    initialState: initialGeneralState,
    reducers: {
        updateGeneralData: (state, action: PayloadAction<GeneralDataType>) => {
            state.generalData = action.payload;
        },
        updateGeneralState: (
            state,
            action: PayloadAction<InitialGeneralStateType>
        ) => {
            state.generalData = action.payload.generalData;
            state.generalError = action.payload.generalError;
            state.generalLoading = action.payload.generalLoading;
            state.generalMessage = action.payload.generalMessage;
        },
        clearGeneralState: (state) => {
            state.generalLoading = false;
            state.generalError = null;
            state.generalMessage = "";
            state.generalData = null;
            state.generalVerseOfTheDayList = [];
        },
        updateEmailNotificationsForm: (
            state,
            action: PayloadAction<
                Pick<NotificationsFormType, "name" | "enable" | "timeValue">
            >
        ) => {
            // let newNotificationsForm = state.generalNotificationForms || {};
            state.generalEmailNotificationForms[action.payload.name] = {
                timeValue: action.payload.timeValue,
                enable: action.payload.enable,
            };
        },
        updatePushNotificationsForm: (
            state,
            action: PayloadAction<
                Pick<NotificationsFormType, "name" | "enable" | "timeValue">
            >
        ) => {
            // let newNotificationsForm = state.generalNotificationForms || {};
            state.generalPushNotificationForms[action.payload.name] = {
                timeValue: action.payload.timeValue,
                enable: action.payload.enable,
            };
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchAllVodCall.pending, state => {
            state.generalLoading = true
        })
        builder.addCase(fetchAllVodCall.rejected, (state, action: any) => {
            state.generalLoading = false;
            state.generalMessage = "";
            state.generalError = {
                code: action.payload?.response?.data?.responseCode || "89",
                message:
                    action.payload?.response?.data?.message ||
                    // action.error?.message ||
                    "Unable to fetch verse of the day at the moment",
            }

        })
        builder.addCase(fetchAllVodCall.fulfilled, (state, {payload}) => {
            state.generalLoading = false;
            state.generalError = null;
            state.generalMessage = `Successfully fetched verse of the day from the server`;
            const vodList: GeneralVerseOfTheDayType[] = payload.payload.map((vod, idx) => {
                return {
                    verse: vod.verse,
                    text: vod.text,
                    date: vod.date,
                }
            });
            debug.log("vodList", vodList)
            state.generalVerseOfTheDayList = vodList
        })

        builder.addCase(initiatePaymentCall.pending, state => {
            state.generalLoading = true
        })
        builder.addCase(initiatePaymentCall.rejected, (state, action: any) => {
            state.generalLoading = false;
            state.generalMessage = "";
            state.generalError = {
                code: action.payload?.response?.data?.responseCode || "89",
                message:
                    action.payload?.response?.data?.message ||
                    // action.error?.message ||
                    "Unable to initiate payment at the moment",
            }

        })
        builder.addCase(initiatePaymentCall.fulfilled, (state, {payload}) => {
            state.generalLoading = false;
            state.generalError = null;
            state.generalMessage = `Successfully initiated payment`;
            state.generalData = {
                paymentReference: payload.payload.data.reference,
                paymentAccessCode: payload.payload.data.access_code,
                paymentWebUrl: payload.payload.data.authorization_url,
            }

        })
    }
});

export const {actions: generalActions, reducer: generalReducer} =
    generalSlice;

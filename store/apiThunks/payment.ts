import {createAsyncThunk} from "@reduxjs/toolkit";
import {GenericResponseType} from "../../services/type";
import {
    InitBAMThunkApiConfig,
    InitFetchAllGivingThunkArg, InitFetchGivingThunkArg, InitFetchLiveSubscriptionThunkArg, InitInitiatePaymentThunkArg,
    InitPaystaclkGetThunkArg,
    InitPaystaclkPostThunkArg, InitVerifyPaymentThunkArg
} from "../../shared/types/thunkArgs";
import {getDeviceIpAddress} from "../../shared/helper";
import {PaystackService} from "../../services/payments/paystack";
import {CallbackService} from "../../services/payments/callback";
import {CallbackGetResponsePayload} from "../../services/payments/callback/type";
import {FetchGivingPayloadType} from "../../services/payments/giving/type";
import {GivingService} from "../../services/payments/giving";
import {InitiatePaystackPayloadType, VerifyPaystackRequestType} from "../../services/payments/paystack/type";
import {SubscriptionPayloadType} from "../../services/payments/subscription/type";
import {SubscriptionService} from "../../services/payments/subscription";

export const paystackPostCall = createAsyncThunk<
    GenericResponseType<null>,
    InitPaystaclkPostThunkArg,
    InitBAMThunkApiConfig
>(
    "payment/paystackPost",
    async (
        {paystackPostRequest},
        {rejectWithValue, getState, dispatch}
    ) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await CallbackService.paystackPost(accessToken, paystackPostRequest)
            .then((res) => {
                debug.api_success("paybackPost", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("paybackPost Error", err);
                return rejectWithValue(err);
            });
    }
);

export const paystackGetCall = createAsyncThunk<
    GenericResponseType<CallbackGetResponsePayload>,
    InitPaystaclkGetThunkArg,
    InitBAMThunkApiConfig
>(
    "payment/paystackget",
    async (
        {paystackGetRequest},
        {rejectWithValue, getState, dispatch}
    ) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await CallbackService.paystackGet(accessToken, paystackGetRequest)
            .then((res) => {
                debug.api_success("paystackGet", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("paystackGetRequestError", err);
                return rejectWithValue(err);
            });
    }
);

export const fetchAllGivingCall = createAsyncThunk<
    GenericResponseType<FetchGivingPayloadType[]>,
    InitFetchAllGivingThunkArg,
    InitBAMThunkApiConfig
>(
    "payment/fetchAllGiving",
    async (
        {fetchAllGivingRequest},
        {rejectWithValue, getState, dispatch}
    ) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await GivingService.fetchAllGiving(
            accessToken,
        )
            .then((res) => {
                debug.api_success("fetchAllGiving", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("fetchAllGiving Error", err);
                return rejectWithValue(err);
            });
    }
);

export const fetchGivingCall = createAsyncThunk<
    GenericResponseType<FetchGivingPayloadType>,
    InitFetchGivingThunkArg,
    InitBAMThunkApiConfig
>(
    "payment/fetchGiving",
    async (
        {fetchGivingRequest},
        {rejectWithValue, getState, dispatch}
    ) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await GivingService.fetchGiving(
            accessToken,
        )
            .then((res) => {
                debug.api_success("fetchGiving", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("fetchGiving Error", err);
                return rejectWithValue(err);
            });
    }
);

export const initiatePaymentCall = createAsyncThunk<
    GenericResponseType<InitiatePaystackPayloadType>,
    InitInitiatePaymentThunkArg,
    InitBAMThunkApiConfig
>(
    "payment/initiatePaystack",
    async (
        {initiatePaymentPaystack},
        {rejectWithValue, getState, dispatch}
    ) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await PaystackService.initiatePayment(
            accessToken,
            initiatePaymentPaystack
        )
            .then((res) => {
                debug.api_success("initiatePayment", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("initiatePayment Error", err);
                return rejectWithValue(err);
            });
    }
);

export const verifyPaymentCall = createAsyncThunk<
    GenericResponseType<VerifyPaystackRequestType>,
    InitVerifyPaymentThunkArg,
    InitBAMThunkApiConfig
>(
    "payment/verifyPayment",
    async (
        {verifyPaymentPaystack},
        {rejectWithValue, getState, dispatch}
    ) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await PaystackService.verifyPayment(
            accessToken,
        )
            .then((res) => {
                debug.api_success("verifyPayment", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("verifyPayment Error", err);
                return rejectWithValue(err);
            });
    }
);


export const fetchLiveSubscriptionCall = createAsyncThunk<
    GenericResponseType<SubscriptionPayloadType>,
    InitFetchLiveSubscriptionThunkArg,
    InitBAMThunkApiConfig
>(
    "payment/fetchlivesubscription",
    async (
        {fetchLiveSubscriptionRequest},
        {rejectWithValue, getState, dispatch}
    ) => {
        let ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || "";
        return await SubscriptionService.fetchLiveSubscription(
            accessToken,
        )
            .then((res) => {
                debug.api_success("fetchLiveSubscription", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("fetchLiveSubscription Error", err);
                return rejectWithValue(err);
            });
    }
);
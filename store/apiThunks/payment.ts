import {createAsyncThunk} from "@reduxjs/toolkit";
import {GenericResponseType} from "../../services/type";
import {
    InitBAMThunkApiConfig,
    InitFetchAllGivingThunkArg,
    InitPaystaclkGetThunkArg,
    InitPaystaclkPostThunkArg
} from "../../shared/types/thunkArgs";
import {getDeviceIpAddress} from "../../shared/helper";
import {PaystackService} from "../../services/payments/paystack";
import {CallbackService} from "../../services/payments/callback";
import {CallbackGetResponsePayload} from "../../services/payments/callback/type";
import {FetchGivingPayloadType} from "../../services/payments/giving/type";
import {GivingService} from "../../services/payments/giving";

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

export const fetchCartItemByUserIdCall = createAsyncThunk<
    GenericResponseType<CartItemType[]>,
    InitFetchCartItemByUserIdThunkArg,
    InitCosalThunkApiConfig
>(
    "cartitem/fetchbyuserid",
    async (
        {fetchCartItemByUserIdRequest},
        {rejectWithValue, getState, dispatch}
    ) => {
        let ipAddress = await deviceInfo.getIpAddress();
        const state = getState();

        const accessToken = state.global.globalData?.accessToken || "";
        return await CartService.fetchCartItemByUserId(
            accessToken,
            fetchCartItemByUserIdRequest
        )
            .then((res) => {
                debug.api_success("fetchCartItemByUserId", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("fetchCartItemByUserId Error", err);
                return rejectWithValue(err);
            });
    }
);

export const fetchCartItemByCartItemIdCall = createAsyncThunk<
    GenericResponseType<CartItemType>,
    InitFetchCartItemByCartItemIdThunkArg,
    InitCosalThunkApiConfig
>(
    "cartitem/fetchbycartitemid",
    async (
        {fetchCartItemByCartItemIdRequest},
        {rejectWithValue, getState, dispatch}
    ) => {
        let ipAddress = await deviceInfo.getIpAddress();
        const state = getState();

        const accessToken = state.global.globalData?.accessToken || "";
        return await CartService.fetchCartItemByCartItemId(
            accessToken,
            fetchCartItemByCartItemIdRequest
        )
            .then((res) => {
                debug.api_success("fetchCartItemByCartItemId", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("fetchCartItemByCartItemId Error", err);
                return rejectWithValue(err);
            });
    }
);

export const deleteCartItemCall = createAsyncThunk<
    GenericResponseType<CartItemType>,
    InitDeleteCartItemThunkArg,
    InitCosalThunkApiConfig
>(
    "cartitem/delete",
    async (
        {deleteCartItemRequest},
        {rejectWithValue, getState, dispatch}
    ) => {
        let ipAddress = await deviceInfo.getIpAddress();
        const state = getState();

        const accessToken = state.global.globalData?.accessToken || "";
        return await CartService.deleteCartItem(accessToken, deleteCartItemRequest)
            .then((res) => {
                debug.api_success("deleteCartItem", res);

                return res;
            })
            .catch((err) => {
                debug.api_error("deleteCartItem Error", err);
                return rejectWithValue(err);
            });
    }
);

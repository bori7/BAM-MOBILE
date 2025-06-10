import {createAsyncThunk} from '@reduxjs/toolkit';

import {getDeviceIpAddress} from '@shared/helper';
import {
    InitBAMThunkApiConfig, InitPlaceOrderProductThunkArg
} from '@shared/types/thunkArgs';

import {OrderService} from '@services/order';
import {
    CreateCheckOutSessionPayloadType,
    PlaceOrderPayloadType,
} from '@services/order/type';
import {GenericResponseType} from "@services/type";

export const placeOrderCall = createAsyncThunk<
    GenericResponseType<PlaceOrderPayloadType>,
    InitPlaceOrderProductThunkArg,
    InitBAMThunkApiConfig
>(
    'order/place-order',
    async ({placeOrderRequest}, {rejectWithValue, getState, dispatch}) => {
        const ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || '';
        return await OrderService.placeOrder(accessToken, placeOrderRequest)
            .then(res => {
                debug.api_success('placeOrder', res);

                return res;
            })
            .catch(err => {
                debug.api_error('placeOrder Error', err);
                return rejectWithValue(err);
            });
    },
);

export const createCheckoutSessionCall = createAsyncThunk<
    GenericResponseType<CreateCheckOutSessionPayloadType>,
    InitPlaceOrderProductThunkArg,
    InitBAMThunkApiConfig
>(
    'order/create-checkout-session',
    async ({placeOrderRequest}, {rejectWithValue, getState, dispatch}) => {
        const ipAddress = await getDeviceIpAddress();
        const state = getState();

        const accessToken = state.user.userData?.token || '';
        return await OrderService.createCheckoutSession(accessToken, placeOrderRequest)
            .then(res => {
                debug.api_success('createCheckoutSession', res);

                return res;
            })
            .catch(err => {
                debug.api_error('createCheckoutSession Error', err);
                return rejectWithValue(err);
            });
    },
);

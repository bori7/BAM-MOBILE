import {createSlice, PayloadAction} from '@reduxjs/toolkit';


import {createCheckoutSessionCall, placeOrderCall} from '@store/apiThunks/order';
import {InitialOrderStateType, OrderDataType} from "@shared/types/slices";

const initialOrderState: InitialOrderStateType = {
    orderData: null,
    allOrders: [],
    orderLoading: false,
    orderError: null,
    orderMessage: '',
};

export const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: initialOrderState,
    reducers: {
        updateOrderData: (state, action: PayloadAction<OrderDataType>) => {
            state.orderData = {
                ...state.orderData,
                ...action.payload,
            };
        },
        // updateOrderScreenForVerify: (state, action: PayloadAction<ScreensType>) => {
        //   state.orderData = {
        //     ...state.orderData,
        //     previousScreenForVerify: action.payload,
        //   };
        // },
        updateOrderState: (state, action: PayloadAction<InitialOrderStateType>) => {
            state.orderData = action.payload.orderData;
            state.orderError = action.payload.orderError;
            state.orderLoading = action.payload.orderLoading;
            state.orderMessage = action.payload.orderMessage;
        },
        clearOrderState: state => {
            state.orderLoading = false;
            state.orderError = null;
            state.orderMessage = '';
            state.orderData = null;
        },
        clearOrderError: (state) => {
            state.orderError = null;
        },
    },
    extraReducers: builder => {
        builder.addCase(placeOrderCall.pending, state => {
            state.orderLoading = true;
        });
        builder.addCase(placeOrderCall.fulfilled, (state, {payload}) => {
            state.orderLoading = false;
            state.orderError = null;
            state.orderMessage = payload.payload.message;
            // state.orderData = {
            //     ...state.cartData,
            //     cartItems: payload.payload.cartItems,
            // };
        });
        builder.addCase(placeOrderCall.rejected, (state, action: any) => {
            state.orderLoading = false;
            state.orderMessage = '';
            state.orderData = null;
            state.orderError = {
                code: action.payload?.response?.data?.responseCode || '87',
                message: '',
                // action.payload?.response?.data?.message ||
                // // action.error?.message ||
                // 'Unable to fetch cart items at the moment',
            };
        });

        builder.addCase(createCheckoutSessionCall.pending, state => {
            state.orderLoading = true;
        });
        builder.addCase(createCheckoutSessionCall.fulfilled, (state, {payload}) => {
            state.orderLoading = false;
            state.orderError = null;
            state.orderMessage = payload.payload.message;
            state.orderData = {
                ...state.orderData,
                ...payload.payload
            };
        });
        builder.addCase(createCheckoutSessionCall.rejected, (state, action: any) => {
            state.orderLoading = false;
            state.orderMessage = '';
            state.orderData = null;
            state.orderError = {
                code: action.payload?.response?.data?.responseCode || '87',
                // message: '',
                message: action?.payload?.response?.data?.message || "Unable to create a session at the moment",
                // action.payload?.response?.data?.message ||
                // // action.error?.message ||
            };
        });
    },
});

export const {actions: orderActions, reducer: orderReducer} = orderSlice;

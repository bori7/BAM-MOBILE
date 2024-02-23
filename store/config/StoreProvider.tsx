import {ReactNode} from "react";
import {Provider} from "react-redux";
import {DeepPartial, ReducersMapObject} from "@reduxjs/toolkit";
import {PersistGate} from "redux-persist/es/integration/react";

import {StateSchema} from "./StateSchema";
import {persistor, store} from "./store";
import React from "react";

// import { persistStore } from 'redux-persist';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const {
        children,
        // initialState, asyncReducers
    } = props;

    // const store = createReduxStore(
    //   initialState as StateSchema,
    //   asyncReducers as ReducersMapObject<StateSchema>,
    // );

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>{children}</PersistGate>
        </Provider>
    );
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import {configureStore, ReducersMapObject} from "@reduxjs/toolkit";
import {CombinedState, Reducer} from "redux";
import {createLogger} from "redux-logger";
import {persistReducer, persistStore} from "redux-persist";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import {createReducerManager} from "./reducerManager";
import {PersistSchema, StateSchema} from "./StateSchema";
import {generalReducer} from "../slices/general";
import {userReducer} from "../slices/user";
import {screenNotificationReducer} from "../slices/notification";
import {notesReducer} from "../slices/notes";
import {devotionalReducer} from "../slices/devotional";
import {moreReducer} from "../slices/more";
import {prayersReducer} from "../slices/prayer";

// TODO: rootReducers (add new app)
const persistConfig: PersistSchema = {
    key: "root",
    blacklist: [
        "user",
        "screenNotification",
        "general",
        "notes",
        "devotional",
        "more",
        "prayer",
    ],
    storage: AsyncStorage,
};


export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>
) {
    // TODO: rootReducers (add new rootReducers)
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        screenNotification: screenNotificationReducer,
        notes: notesReducer,
        devotional: devotionalReducer,
        more: moreReducer,
        prayer: prayersReducer,
        general: generalReducer,
    };


    const reducerManager = createReducerManager(rootReducers);

    const reducers = reducerManager.reduce as Reducer<CombinedState<StateSchema>>;

    const persistedReducer = persistReducer(persistConfig, reducers);

    const loggerMiddleware = createLogger({
        predicate: () => __DEV__,
    });

    // const middlewares = getDefaultMiddleware({
    //   serializableCheck: false,
    // })
    //   .concat(thunkMiddleware)
    //   .concat(logger)
    //   .concat(loggerMiddleware);

    // if (__DEV__) {
    //   // eslint-disable-next-line @typescript-eslint/no-var-requires
    //   const createDebugger = require("redux-flipper").default;
    //   middlewares.push(createDebugger());
    // }

    const store = configureStore({
        reducer: persistedReducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => {
            const modifiedMiddleware = getDefaultMiddleware({
                serializableCheck: false,
            })
                .concat(thunkMiddleware)
                .concat(logger)
                .concat(loggerMiddleware);

            if (__DEV__) {
                const createDebugger = require("redux-flipper").default;
                modifiedMiddleware.push(createDebugger());
            }

            return modifiedMiddleware;
        },
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export const store = createReduxStore();

export const persistor = persistStore(store);

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];

// eslint-disable-next-line @typescript-eslint/no-var-requires

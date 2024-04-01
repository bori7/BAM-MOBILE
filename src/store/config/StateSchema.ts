import {AsyncStorageStatic} from "@react-native-async-storage/async-storage";
import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from "@reduxjs/toolkit";
import {
    InitialDevotionalStateType, InitialGeneralStateType,
    InitialMoreStateType,
    InitialNotesStateType, InitialPrayersStateType,
    InitialScreenNotificationStateType, InitialUserStateType
} from "../../shared/types/slices";


export interface StateSchema {
    devotional: InitialDevotionalStateType;
    user: InitialUserStateType;
    screenNotification: InitialScreenNotificationStateType;
    notes: InitialNotesStateType;
    more: InitialMoreStateType;
    prayer: InitialPrayersStateType;
    general: InitialGeneralStateType;
}


export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface PersistSchema {
    key: "root";
    blacklist: StateSchemaKey[];
    storage: AsyncStorageStatic;
}

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    // true - mounted, false - unmounted
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

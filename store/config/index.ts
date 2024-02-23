import type {
  PersistSchema,
  ReduxStoreWithManager,
  StateSchema,
  StateSchemaKey,
} from "./StateSchema";
import { AppDispatch, createReduxStore, store } from "./store";
import { StoreProvider } from "./StoreProvider";

export { StoreProvider, createReduxStore, store };

export type {
  StateSchema,
  AppDispatch,
  ReduxStoreWithManager,
  StateSchemaKey,
  PersistSchema,
};

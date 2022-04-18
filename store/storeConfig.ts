import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension";
import rootReducer from "@store/rootReducer";
import { useMemo } from "react";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

let store: any;
let middleWare: any;

if (process.env.NODE_ENV === "production") {
  middleWare = applyMiddleware(thunkMiddleware);
} else {
  middleWare = composeWithDevToolsDevelopmentOnly(
    applyMiddleware(thunkMiddleware)
  );
}

function initStore(initialState: any) {
  return createStore(
    combineReducers({
      rootReducer,
    }),
    initialState,
    middleWare
  );
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

export type RootState = ReturnType<typeof store>;

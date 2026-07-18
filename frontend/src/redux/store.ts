//This file combines all Redux slices into one global store

import { configureStore } from "@reduxjs/toolkit"; //configureStore creates the Redux store easily.

import quickViewReducer from "./features/quickView-slice";
import cartReducer from "./features/cart-slice";
import shopReducer from "./features/shop-slice";
import productDetailsReducer from "./features/product-details";

import { TypedUseSelectorHook, useSelector } from "react-redux";

//. Creating the Store. These are all the parts of my application state.
export const store = configureStore({
  reducer: {
    quickViewReducer,
    cartReducer,
    shopReducer,
    productDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

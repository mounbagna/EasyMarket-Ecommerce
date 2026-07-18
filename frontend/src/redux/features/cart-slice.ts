/*
Redux is a tool for managing global state in an application. This file is responsible for storing, updating and 
controlling all cart data globally. It does the following;
- Adding products to cart
- Removing products from cart
- updating quantity
- Clearing the cart
- Calculating total price
*/
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialState = {
  items: CartItem[];
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  discounted_price: number;
  quantity: number;
  thumbnail: string[];
  preview: string[];
  
};

const initialState: InitialState = {
  items: [],
};

//Redux Toolkit automatically generates cart.actions which contains the function such as
//addItemsToCart, removeItemFromCart, updateCartItemQuantity and removeAllItemsFromCart
//It is been exported so as to be used like dispatch(addItemsToCart(product))
export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, title, price, quantity, discounted_price, thumbnail,preview } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          title,
          price,
          quantity,
          discounted_price,
          thumbnail,
          preview
        });
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity; 
      }
    },

    removeAllItemsFromCart: (state) => {
      state.items = [];
    },
  },
});

//This line reads cart data from the Redux store.
//(state: RootState) gives the entire Redux state object
//state.cartReducer.items gets item array from cart reducer
export const selectCartItems = (state: RootState) => state.cartReducer.items; 


//Calculates the total price of all items in the cart.
//createSelector(...) only recalculates the total price when the cart items changes
export const selectTotalPrice = createSelector([selectCartItems], (items) => {
  return items.reduce((total, item) => {
    return total + item.discounted_price * item.quantity;
  }, 0);
});

//Redux Toolkit that automatically creates action functions
//.reducer is automatically created by createSlice()
export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  removeAllItemsFromCart,
} = cart.actions;
export default cart.reducer;

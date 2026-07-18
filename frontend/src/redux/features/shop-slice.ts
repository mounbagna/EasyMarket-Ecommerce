import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialState = {
  items: ShopItem[];
};

type ShopItem = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  thumbnail: string[];
  preview: string[];
};

const initialState: InitialState = {
  items: [],
};

export const shop = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addItemToShop: (state, action: PayloadAction<ShopItem>) => {
      const { id, title, price, quantity, discountedPrice, thumbnail,preview } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          title,
          price,
          quantity,
          discountedPrice,
          thumbnail,
          preview
        });
      }
    },
    removeItemFromShop: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    updateShopItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },

    removeAllItemsFromShop: (state) => {
      state.items = [];
    },
  },
});

export const selectShopItems = (state: RootState) => state.cartReducer.items; 

export const selectTotalPrice = createSelector([selectShopItems], (items) => {
  return items.reduce((total, item) => {
    return total + item.discounted_price * item.quantity;
  }, 0);
});

export const {
  addItemToShop,
  removeItemFromShop,
  updateShopItemQuantity,
  removeAllItemsFromShop,
} = shop.actions;
export default shop.reducer;

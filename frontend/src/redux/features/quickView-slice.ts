import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type InitialState = {
  value: Product;
};

const initialState = {
  value: {
    id: 0,
    title: "",
    reviews: 0,
    price: 0,
    discounted_price: 0,
    quantity: 0,
    description: "",
    thumbnail: [], 
    preview: [] ,
  } as Product,
} as InitialState;

export const quickView = createSlice({
  name: "quickView",
  initialState,

  //The state changes are defined here. Each function = one function
  reducers: {
    updateQuickView: (_, action) => {

      //Replaces the current Quick View product with new one
      return {
        value: {
          ...action.payload,
        },
      };
    },

    //Resets the quick view state
    resetQuickView: () => {
      return {
        value: initialState.value,
      };
    },
  },
});

export const { updateQuickView, resetQuickView } = quickView.actions;
export default quickView.reducer;

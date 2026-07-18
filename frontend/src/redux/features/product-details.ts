import { createSlice } from "@reduxjs/toolkit";
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
  },
} as InitialState;

export const productDetails = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    updateproductDetails: (_, action) => { //the minus(-) sign is because we don't need previous/current state here.It's been replaced or updated
      return {
        //Replaces the entire product state with new product data
        //... means copy all properties from payload into the new object
        //payload is the data carried by an action
        value: {
          ...action.payload, //the actual data send to redux when you dispatch an action
        },
      };
    },
  },
});

export const { updateproductDetails } = productDetails.actions;
export default productDetails.reducer;

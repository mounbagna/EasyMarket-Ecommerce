import React, { useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/redux/features/cart-slice";

import Image from "next/image";

const SingleItem = ({ item }) => {

  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-7.5">
      <div className="min-w-[400px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5">
              <Image width={50} height={50} src={item.imgs?.thumbnails[0]} alt="product" />
            </div>
          </div>
              <h4 className="min-w-[110px] font-medium text-dark" >{item.discountedPrice} FCFA</h4>
        </div>
      </div>
      <div className="min-w-[180px]">
        
      </div>
    </div>
  );
};

export default SingleItem;
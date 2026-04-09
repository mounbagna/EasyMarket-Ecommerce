import Cart from "@/components/Cart";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cart Page | EasyMarket Nextjs E-commerce website",
  description: "This is the Cart Page EasyMarket website",
};

const CartPage = () => {
  return (
    <>
      <Cart />
    </>
  );
};

export default CartPage;

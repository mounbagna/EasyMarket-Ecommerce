import ProductList from "@/components/Admin/ProductList";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Products Page | EasyMarket E-commerce website",
  description: "This is the EasyMarket Products Page website",
};

const PendingShopsPage = () => {
  return (
    <>
      <ProductList />
    </>
  );
};

export default PendingShopsPage;

import ShopOwnerList from "@/components/Admin/ShopOwnerList";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Shop Owner's Page | EasyMarket E-commerce website",
  description: "This is the EasyMarket Shop Owner's Page website",
};

const PendingShopsPage = () => {
  return (
    <>
      <ShopOwnerList />
    </>
  );
};

export default PendingShopsPage;

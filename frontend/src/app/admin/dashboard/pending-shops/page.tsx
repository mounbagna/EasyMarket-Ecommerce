import PendingShops from "@/components/Admin/PendingShops";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pending Shops Page | EasyMarket E-commerce website",
  description: "This is the EasyMarket Pending Shops page website",
};

const PendingShopsPage = () => {
  return (
    <>
      <PendingShops />
    </>
  );
};

export default PendingShopsPage;

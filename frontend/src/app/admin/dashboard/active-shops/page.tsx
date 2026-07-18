import ActiveShops from "@/components/Admin/ActiveShops";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Active Shops Page | EasyMarket E-commerce website",
  description: "This is the EasyMarket Active Shops Page website",
};

const PendingShopsPage = () => {
  return (
    <>
      <ActiveShops />
    </>
  );
};

export default PendingShopsPage;

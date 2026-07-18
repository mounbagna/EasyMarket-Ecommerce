import SuspendedShops from "@/components/Admin/SuspendedShops";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "SuspendedShops Page | EasyMarket E-commerce website",
  description: "This is the EasyMarket Suspended Shops Page website",
};

const PendingShopsPage = () => {
  return (
    <>
      <SuspendedShops />
    </>
  );
};

export default PendingShopsPage;

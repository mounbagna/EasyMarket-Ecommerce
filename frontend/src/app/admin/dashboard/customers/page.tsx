import CustomerList from "@/components/Admin/CustomerList";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Customers Page | EasyMarket E-commerce website",
  description: "This is the EasyMarket Customers Page website",
};

const PendingShopsPage = () => {
  return (
    <>
      <CustomerList />
    </>
  );
};

export default PendingShopsPage;

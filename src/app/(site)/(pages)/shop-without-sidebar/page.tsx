import ShopWithoutSidebar from "@/components/ShopWithoutSidebar";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "EasyMarket",
  description: "This is the Shop Page of EasyMarket",
};

const ShopWithoutSidebarPage = () => {
  return (
    <main>
      <ShopWithoutSidebar />
    </main>
  );
};

export default ShopWithoutSidebarPage;

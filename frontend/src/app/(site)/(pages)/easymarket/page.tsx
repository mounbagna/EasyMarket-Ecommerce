import Easymarket from "@/components/About/Easymarket"

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "EasyMarket About Page | EasyMarket Nextjs E-commerce website",
  description: "This page contains all what you need to know about EasyMarket website",
};

const EasyMarketPage = () =>  { 
  return (
    <>
      <Easymarket />
    </>
  );
};

export default EasyMarketPage;
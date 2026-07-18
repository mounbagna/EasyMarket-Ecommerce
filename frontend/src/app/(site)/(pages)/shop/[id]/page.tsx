import ShopOwnerContent from "@/components/Home/Shops/shopownerscontent";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "EasyMarket",
  description: "Shop-owner's page",
};

type Props={
  params: Promise<{
    id:string;
  }>;
}; 

const ShopPage = async({
    params,
}: Props) => {

  const {id} = await params;
    
    return (
    <main>
      <ShopOwnerContent 
      shopOwnerId={Number(id)}/>
    </main>
  );
};

export default ShopPage;

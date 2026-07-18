import ItemList from "@/components/ItemList";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "EasyMarket",
  description: "This is the Shop Page of EasyMarket",
};

const ListOfItemsPage = () => {
  return (
    <main>
      <ItemList /> 
    </main>
  );
};

export default ListOfItemsPage;

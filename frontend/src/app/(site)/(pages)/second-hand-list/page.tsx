import SecondHandList from "@/components/SecondHandList";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "EasyMarket",
  description: "This is the Second Hand List of Items Page of EasyMarket",
};

const ListOfItemsPage = () => {
  return (
    <main>
      <SecondHandList /> 
    </main>
  );
};

export default ListOfItemsPage;

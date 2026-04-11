import Arami from "@/components/Arami";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "EasyMarket",
  description: "This is the Shop Page of Arami",
};

const AramiPage = () => {
  return (
    <main>
      <Arami />
    </main>
  );
};

export default AramiPage;

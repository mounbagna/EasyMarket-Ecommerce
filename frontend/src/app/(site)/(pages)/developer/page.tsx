import Developer from "@/components/About/Developer";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Developer Page | EasyMarket Nextjs E-commerce website",
  description: "This is the Developer Page EasyMarket website",
};

const DeveloperPage = () => {
  return (
    <>
      <Developer />
    </> 
  );
};

export default DeveloperPage;
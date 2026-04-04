import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EasyMarket",
  description: "This is Home for EasyMarket",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}

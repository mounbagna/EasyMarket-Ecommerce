import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EasyMarket",
  description: "Homepage of EasyMarket",
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}

import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EasyMarket",
  description: "Admin page of EasyMarket",
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}

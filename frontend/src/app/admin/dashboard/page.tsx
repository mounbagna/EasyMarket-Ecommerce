import Admin from "@/components/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EasyMarket",
  description: "Homepage of EasyMarket",
};

export default function HomePage() {
  return (
    <>
      <Admin />
    </>
  );
}
"use client";

import ActiveShops from "./ActiveShops";
import { useState,useEffect } from "react";
import PendingShops from "@/components/Admin/Dashboard/PendingShops";
import SuspendedShops from "./SuspendedShops";
import Products from "./Products";
import Customers from "./Customers";
import Breadcrumb from "@/components/Common/Breadcrumb";

const Dashboard = () => {

  const [stats, setStats] = useState<any>(null);
  
      useEffect(()=>{
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`).then(res=>res.json()).then(data=>{setStats(data);})
      },[]);
      
  return (
    <>
    <section>
        <Breadcrumb title={"Admin's Page"} pages={["Admin"]} />
      </section>
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-0 sm:pt-0 lg:pt-0 xl:pt-0 bg-[#E5EAF4]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-wrap items-center justify-between gap-5 mt-10">
              <h2 className="font-medium text-dark text-2xl mb-8">Dashboard</h2>
            </div>
            <div className="flex sm:flex-row gap-5">
              <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5">
                  <PendingShops />
              </div>
              <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5">
                   <ActiveShops />
              </div>
              <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5">
                   <SuspendedShops />
              </div>
            </div>

            <div className="flex sm:flex-row gap-5">
              <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5">
                  <Products />
              </div>
              <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5">
                  <Customers />
              </div>
            </div>
        </div>
      </div>

    </section>
    </>
  );
};

export default Dashboard;

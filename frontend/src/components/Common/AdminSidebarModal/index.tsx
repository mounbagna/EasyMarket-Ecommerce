"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAdminSidebarContext } from "@/context/AdminSidebarModalContext";

import Link from "next/link";
import {LayoutDashboard,Store, Clock, Ban, CheckCircle,Package,ShoppingCart,Users,CreditCard,Settings,LogOut} from "lucide-react"

const menu = [
    { 
        title:"Dashboard",
        icon:LayoutDashboard,
        Link:"/admin/dashboard"
    },
    {
        title:"Pending Shops",
        icon:Clock,
        Link:"/admin/dashboard/pending-shops"
    },
    {
        title:"Active Shops",
        icon:CheckCircle,
        Link:"/admin/dashboard/active-shops"
    },
    {
        title:"Suspended Shops",
        icon:Ban,
        Link:"/admin/dashboard/suspended-shops"
    },
    {
        title:"products",
        icon:Package,
        Link:"/admin/dashboard/products"
    },
    {
        title:"Orders",
        icon:ShoppingCart,
        Link:"/admin/dashboard"
    },
    {
        title:"Shop Owners",
        icon:Users,
        Link:"/admin/dashboard/shopowners"
    },
    {
        title:"Customers",
        icon:Users,
        Link:"/admin/dashboard/customers"
    },
    {
        title:"Payments",
        icon:CreditCard,
        Link:"/admin/dashboard"
    },
    {
        title:"Settings",
        icon:Settings,
        Link:"/admin/dashboard"
    },
];

const AdminSidebarModal = () => {
  const router = useRouter();
  
      const logout = () => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("user");
  
          router.push("/");
          router.refresh();
      };

  const { isAdminSidebarModalOpen, closeAdminSidebarModal } = useAdminSidebarContext();

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".modal-content")) {
        closeAdminSidebarModal();
      }
    }

    if (isAdminSidebarModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAdminSidebarModalOpen, closeAdminSidebarModal]);

  return (
    <div
      className={`fixed top-0 left-0 z-99999 overflow-y-auto no-scrollbar w-full h-screen bg-dark/70 ease-linear duration-300 ${
        isAdminSidebarModalOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-end">
        <div className="w-full max-w-[500px] shadow-1 bg-white px-4 sm:px-7.5 lg:px-11 relative modal-content">
          <div className="sticky top-0 bg-white flex items-center justify-between pb-7 pt-4 sm:pt-7.5 lg:pt-11 border-b border-gray-3 mb-7.5">
            <h2 className="font-medium text-dark text-lg sm:text-2xl">
              Admin Panel
            </h2>
            <button
              onClick={() => closeAdminSidebarModal()}
              aria-label="button for close modal"
              className="flex items-center justify-center ease-in duration-150 bg-meta text-dark-5 hover:text-dark"
            >
              <svg
                className="fill-current"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5379 11.2121C12.1718 10.846 11.5782 10.846 11.212 11.2121C10.8459 11.5782 10.8459 12.1718 11.212 12.5379L13.6741 15L11.2121 17.4621C10.846 17.8282 10.846 18.4218 11.2121 18.7879C11.5782 19.154 12.1718 19.154 12.5379 18.7879L15 16.3258L17.462 18.7879C17.8281 19.154 18.4217 19.154 18.7878 18.7879C19.154 18.4218 19.154 17.8282 18.7878 17.462L16.3258 15L18.7879 12.5379C19.154 12.1718 19.154 11.5782 18.7879 11.2121C18.4218 10.846 17.8282 10.846 17.462 11.2121L15 13.6742L12.5379 11.2121Z"
                  fill=""
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15 1.5625C7.57867 1.5625 1.5625 7.57867 1.5625 15C1.5625 22.4213 7.57867 28.4375 15 28.4375C22.4213 28.4375 28.4375 22.4213 28.4375 15C28.4375 7.57867 22.4213 1.5625 15 1.5625ZM3.4375 15C3.4375 8.61421 8.61421 3.4375 15 3.4375C21.3858 3.4375 26.5625 8.61421 26.5625 15C26.5625 21.3858 21.3858 26.5625 15 26.5625C8.61421 26.5625 3.4375 21.3858 3.4375 15Z"
                  fill=""
                />
              </svg>
            </button>
          </div>

          <div className="border-t border-gray-3 bg-white pt-5 pb-4 sm:pb-7.5 lg:pb-11 mt-7.5 sticky bottom-0">
            <div className="flex items-center justify-between gap-5 mb-6">
              <nav className="p-4">
                <p className="text-xs uppercase text-gray-400 mb-3">Menu</p>
                {menu.map((item) => {
                    const Icon=item.icon;
                    return (
                        <Link key={item.title} href={item.Link} className="mb-4 flex items-center gap-4 px-4 rounded-lg hover:bg-green transition">
                        <Icon size={20}/>
                        <span onClick={() => closeAdminSidebarModal()}>{item.title}</span>
                         </Link>
                    )
                })}
                </nav>
            </div>

            <div className="flex items-center gap-4 mt-110">
              <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
                <button onClick={logout} className="flex items-center gap-4 px-4 rounded-lg hover:bg-red transition">
                    <LogOut size={20}/> Logout
                </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebarModal;

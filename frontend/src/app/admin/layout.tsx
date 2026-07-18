"use client";
import React,{ useState, ReactNode } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";

import Header from "@/components/Admin/Header";

import { QuickViewModalProvider } from "../../context/QuickViewModalContext"; 
import { AdminSidebarModalProvider } from "@/context/AdminSidebarModalContext";
import { AuthProvider } from "@/context/AuthContext";
import { SearchProvider } from "@/context/searchContext";


import { ReduxProvider } from "@/redux/provider";

import QuickViewModal from "@/components/Common/QuickViewModal";
import AdminSidebarModal from "@/components/Common/AdminSidebarModal";
import ScrollToTop from "@/components/Common/ScrollToTop";

export default function RootLayout({children}:{children: React.ReactNode;}) {

  return (
    <html lang="en">
      <body>
        (
            <ReduxProvider>
              <AuthProvider>
              <AdminSidebarModalProvider>
                <QuickViewModalProvider> 
                  <SearchProvider>

                    <Header />
                    {children}
                    <QuickViewModal />
                    <AdminSidebarModal />
                  </SearchProvider>       
                </QuickViewModalProvider>
              </AdminSidebarModalProvider>
              </AuthProvider>
            </ReduxProvider>
            <ScrollToTop />
        )
      </body>
    </html>
  );
}

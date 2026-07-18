"use client";
import React,{ useState, ReactNode } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { QuickViewModalProvider } from "@/context/QuickViewModalContext"; 
import { CartModalProvider } from "@/context/CartSidebarModalContext";
import { LoginModalProvider } from "@/context/LoginModalContext";
import { SignupModalProvider } from "@/context/SignupModalContext";
import { AddItemModalProvider } from "@/context/AddItemModalContext";
import { EditItemModalProvider } from "@/context/EditItemModalContext";
import { SearchProvider } from "@/context/searchContext"; 

import { AuthProvider } from "@/context/AuthContext";


import { ReduxProvider } from "@/redux/provider";

import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import LoginModal from "@/components/Common/LoginModal";
import SignupModal from "@/components/Common/SignupModal";
import AddItemModal from "@/components/Common/AddItemModal";
import ModalManager from "@/components/Common/ModalManager";


import ScrollToTop from "@/components/Common/ScrollToTop";

export default function RootLayout({children}:{children: React.ReactNode;}) {

  return (
    <html lang="en">
      <body>
        (
          <>
            <ReduxProvider>
              <AuthProvider>
              <CartModalProvider>
                <QuickViewModalProvider>
                  <LoginModalProvider>
                    <SignupModalProvider>
                      <AddItemModalProvider>
                      <EditItemModalProvider>
                        <SearchProvider>

                    <Header />

                    {children}
                      
                    <QuickViewModal />
                    <CartSidebarModal />
                    <LoginModal />
                    <SignupModal />
                    <AddItemModal />
                    <ModalManager />

                    <ToastContainer position="top-right" autoClose={4000} />
                      </SearchProvider>
                    </EditItemModalProvider>
                    </AddItemModalProvider>
                   </SignupModalProvider>
                  </LoginModalProvider>
                </QuickViewModalProvider>
              </CartModalProvider>
              </AuthProvider>
            </ReduxProvider>

            <ScrollToTop />
            <Footer />
          </>
        )
      </body>
    </html>
  );
}

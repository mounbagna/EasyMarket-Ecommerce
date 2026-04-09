"use client";
import { useState, useEffect } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";

import ScrollToTop from "@/components/Common/ScrollToTop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        (
          <>
            <ReduxProvider>
              <CartModalProvider>
                <ModalProvider>
                    <Header />
                    {children}
                    <QuickViewModal />
                    <CartSidebarModal />
                </ModalProvider>
              </CartModalProvider>
            </ReduxProvider>
            <ScrollToTop />
            <Footer />
          </>
        )
      </body>
    </html>
  );
}

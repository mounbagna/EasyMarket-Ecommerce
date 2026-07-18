"use client";

import React,{ ReactNode } from "react";

import { AuthProvider } from "@/context/AuthContext";
import { ReduxProvider } from "@/redux/provider";


export default function DashboardLayout({children}:{children: React.ReactNode;}) {

  return (
            <ReduxProvider>
              <AuthProvider>
              <div className="flex min-h-screen">
              
                <main className="flex-1 p-6 bg-gray-100">
                    {children}
                </main>
              </div>
              </AuthProvider>
            </ReduxProvider>

  );
}


"use client";

//It connects your entire React/Next.js application to the Redux store. Without it, Redux state connot be accessed by your components
import { store } from "./store";
import { Provider } from "react-redux";
import React from "react";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

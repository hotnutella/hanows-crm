'use client';

import { Provider } from "react-redux";
import { store } from "@/store";
import '@/styles/global.css';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
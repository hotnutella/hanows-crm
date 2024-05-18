'use client';

import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@mui/material";
import lightTheme from "@/themes/light";
import '@/styles/global.css';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Hanows CRM</title>
      <body>
        <ThemeProvider theme={lightTheme}>
          <Provider store={store}>
            {children}
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}

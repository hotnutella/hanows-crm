'use client';

import { Provider } from "react-redux";
import { store } from "../../store";
import DrawerAppBar from "@/components/DrawerAppBar";
import { Stack } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Hanows CRM</title>
      <body>
        <Provider store={store}>
          <Stack direction="column" spacing={8}>
            <DrawerAppBar />
            {children}
          </Stack>
        </Provider>
      </body>
    </html>
  );
}

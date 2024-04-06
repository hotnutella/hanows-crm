'use client';

import { Provider } from "react-redux";
import { store } from "../../store";
import DrawerAppBar from "@/components/DrawerAppBar";
import { Container, Stack } from "@mui/material";
import Footer from "@/components/Footer";

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
          <Stack direction="column" spacing={8} mb={8}>
            <DrawerAppBar />
              <Container>
                {children}
              </Container>
          </Stack>
        </Provider>
        <Footer />
      </body>
    </html>
  );
}

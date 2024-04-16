'use client';

import { Provider } from "react-redux";
import { store } from "@/store";
import { Box, Grid } from "@mui/material";
import '@/styles/global.css';

export default function RootLayout({
  children,
  clients
}: Readonly<{
  children: React.ReactNode;
  clients: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Hanows CRM</title>
      <body>
        <Provider store={store}>
          <Grid container spacing={2}>
            <Grid item width={400} minWidth={400}>
              <Box height="100vh" overflow="auto">
                {clients}
              </Box>
            </Grid>
            <Grid item xs>
              <Box height="100vh" overflow="hidden">
                {children}
              </Box>
            </Grid>
          </Grid>
        </Provider>
      </body>
    </html>
  );
}

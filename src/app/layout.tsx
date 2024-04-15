'use client';

import { Provider } from "react-redux";
import { store } from "../../store";
import { Grid } from "@mui/material";

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
              {clients}
            </Grid>
            <Grid item xs>
              {children}
            </Grid>
          </Grid>
        </Provider>
      </body>
    </html>
  );
}

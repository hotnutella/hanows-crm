'use client';

import { Provider } from "react-redux";
import { store } from "@/store";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import '@/styles/global.css';

export default function RootLayout({
  clients,
  chat
}: Readonly<{
  children: React.ReactNode;
  clients: React.ReactNode;
  chat: React.ReactNode;
}>) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <html lang="en">
      <title>Hanows CRM</title>
      <body>
        <Provider store={store}>
          <Grid container>
            {isMd && (
              <>
                <Grid item width={400} minWidth={400}>
                  <Box height="100vh" overflow="auto">
                    {clients}
                  </Box>
                </Grid>
                <Grid item xs={12} md>
                  <Box height="100vh" overflow="hidden">
                    {chat}
                  </Box>
                </Grid>
              </>
            )}
            {!isMd && (
              <Grid item xs={12}>
                <Box height="100vh" overflow="auto">
                  {chat}
                </Box>
              </Grid>
            )}

          </Grid>
        </Provider>
      </body>
    </html>
  );
}

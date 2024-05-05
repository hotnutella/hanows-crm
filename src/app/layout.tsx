'use client';

import { Provider } from "react-redux";
import { store } from "@/store";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import '@/styles/global.css';

export default function RootLayout({
  clients,
  chat,
  params,
}: Readonly<{
  children: React.ReactNode;
  clients: React.ReactNode;
  chat: React.ReactNode;
  params: {
    id: string;
  };
}>) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Hanows CRM</title>
      <body>
        <Provider store={store}>
          <Grid container>
            {!isXs && (
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
            {isXs && (
              <Grid item xs={12}>
                <Box height="100vh" overflow="auto">
                  {clients}
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

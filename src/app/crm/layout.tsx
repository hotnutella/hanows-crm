'use client';

import { Box, Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import TokenHandler from "@/components/auth/TokenHandler";
import Sidebar from "@/components/ui/Sidebar";
import { useParams } from "next/navigation";

export default function RootLayout({
    clients,
    chat,
}: Readonly<{
    children: React.ReactNode;
    clients: React.ReactNode;
    chat: React.ReactNode;
}>) {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));
    const params = useParams();

    return (
        <>
            <Grid container>
                {!isXs && (
                    <>
                        <Grid item width={60} minWidth={60}>
                            <Sidebar />
                        </Grid>
                        <Grid item width={400} minWidth={400}>
                            <Box height="100vh" overflow="auto" borderRight="1px solid #eee">
                                {clients}
                            </Box>
                        </Grid>
                        <Grid item md>
                            <Box height="100vh" overflow="hidden">
                                {chat}
                            </Box>
                        </Grid>
                    </>
                )}
                {isXs && (
                    <Grid item xs={12}>
                        <Stack height="100vh" overflow="auto" justifyContent="space-between">
                            {!params.id && clients}
                            {params.id && chat}
                            {!params.id && <Sidebar direction='row' />}
                        </Stack>
                    </Grid>
                )}

            </Grid>
            <TokenHandler />
        </>
    );
}

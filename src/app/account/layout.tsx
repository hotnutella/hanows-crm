'use client';

import Sidebar from '@/components/ui/Sidebar';
import { Box, Grid, Stack, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

export default function AccountLayout({
    form,
}: Readonly<{
    form: React.ReactNode;
}>) {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Grid container>
            {!isXs && (
                <>
                    <Grid item width={60} minWidth={60}>
                        <Sidebar />
                    </Grid>
                    <Grid item md>
                        <Box height="100vh" overflow="auto">
                            {form}
                        </Box>
                    </Grid>
                </>
            )}
            {isXs && (
                <Grid item xs={12}>
                    <Stack height="100vh" overflow="auto" justifyContent="space-between">
                        {form}
                        <Sidebar direction='row' />
                    </Stack>
                </Grid>
            )}
        </Grid>
    );
}
'use client';

import Sidebar from '@/components/ui/Sidebar';
import { Box, Grid } from '@mui/material';
import React from 'react';

export default function AccountLayout({
    form,
}: Readonly<{
    form: React.ReactNode;
}>) {
    return (
        <Grid container>
            <Grid item width={60} minWidth={60}>
                <Sidebar />
            </Grid>
            <Grid item md>
                <Box height="100vh" overflow="auto">
                    {form}
                </Box>
            </Grid>
        </Grid>
    );
}
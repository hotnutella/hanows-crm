'use client';

import React from 'react';
import ClientsPageComponent, { SelectedClientOptionPageProps } from '../page';
import { useMediaQuery, useTheme } from '@mui/material';

const ClientsPage: React.FC<SelectedClientOptionPageProps> = (props) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    if (isXs) {
        return <></>;
    }

    return <ClientsPageComponent {...props} />;
};

export default ClientsPage;
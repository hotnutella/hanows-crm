'use client';

import React, { useEffect } from 'react';
import ClientsPage from '../page'; 
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setSelectedClient } from '@/store/slices/clientSearchSlice';
import { useMediaQuery, useTheme } from '@mui/material';

export interface SelectedClientOptionPageProps {
    params: {
        id: string;
    };
}

const SelectedClientOptionPage: React.FC<SelectedClientOptionPageProps> = ({ params }) => {
    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        dispatch(setSelectedClient(Number(params.id)));
    }, [dispatch, params.id]);

    if (isXs) {
        return <></>;
    }

    return <ClientsPage />;
};

export default SelectedClientOptionPage;
'use client';

import React, { useEffect } from 'react';
import ClientsPage from '../page'; 
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setSelectedClient } from '@/store/slices/clientSearchSlice';

interface SelectedClientOptionPageProps {
    params: {
        id: string;
    };
}

const SelectedClientOptionPage: React.FC<SelectedClientOptionPageProps> = ({ params }) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(setSelectedClient(Number(params.id)));
    }, [dispatch, params.id]);

    return <ClientsPage />;
};

export default SelectedClientOptionPage;
'use client'

import React from 'react';
import { useGetClientsQuery } from '../../../store/clientsApi';
import { Stack } from '@mui/material';
import ClientOption from '@/components/clients/ClientOption';
import ClientsHeader from '@/components/clients/ClientsHeader';

const ClientsPage: React.FC = () => {
    const { data: clients } = useGetClientsQuery();

    return (
        <Stack spacing={2}>
            <ClientsHeader />
            {clients?.map((client) => (
                <ClientOption key={client.id} client={client} />
            ))}
        </Stack>
    );
};

export default ClientsPage;
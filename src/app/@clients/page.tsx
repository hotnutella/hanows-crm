'use client'

import React from 'react';
import { useGetClientsQuery } from '../../store/api/clientsApi';
import { Stack } from '@mui/material';
import ClientOption from '@/components/clients/ClientOption';
import ClientsHeader from '@/components/clients/ClientsHeader';
import { useSelector } from 'react-redux';
import { selectSearchTerm } from '@/store/slices/clientSearchSlice';

const ClientsPage = () => {
    const { data: clients } = useGetClientsQuery();
    const searchTerm = useSelector(selectSearchTerm);

    const filteredClients = clients?.filter((client) => {
        return client.name.toLowerCase().includes(searchTerm.toLowerCase());
    }) || [];

    return (
        <Stack spacing={2} mx={1}>
            <ClientsHeader />
            {filteredClients.map((client) => (
                <ClientOption 
                    key={client.id} 
                    client={client} />
            ))}
        </Stack>
    );
};

export default ClientsPage;
'use client'

import React from 'react';
import { useGetClientsQuery } from '../../store/clientsApi';
import { Stack } from '@mui/material';
import ClientOption from '@/components/clients/ClientOption';
import ClientsHeader from '@/components/clients/ClientsHeader';
import { useSelector } from 'react-redux';
import { selectSearchTerm } from '@/store/clientSearchSlice';

const ClientsPage: React.FC = () => {
    const { data: clients } = useGetClientsQuery();
    const searchTerm = useSelector(selectSearchTerm);

    const filteredClients = clients?.filter((client) => {
        return client.name.toLowerCase().includes(searchTerm.toLowerCase());
    }) || [];

    return (
        <Stack spacing={2} mr={2}>
            <ClientsHeader />
            {filteredClients.map((client) => (
                <ClientOption key={client.id} client={client} />
            ))}
        </Stack>
    );
};

export default ClientsPage;
'use client'

import React from 'react';
import { useGetClientsQuery } from '../../../store/api/clientsApi';
import { Stack, Typography } from '@mui/material';
import ClientOption from '@/components/clients/ClientOption';
import ClientsHeader from '@/components/clients/ClientsHeader';
import { useSelector } from 'react-redux';
import { getAccessToken } from '@/store/slices/accountSlice';
import { selectSearchTerm } from '@/store/slices/clientSearchSlice';

const ClientsPage = () => {
    const accessToken = useSelector(getAccessToken) || '';
    const { data: clients } = useGetClientsQuery(accessToken);
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
            {filteredClients.length === 0 && (
                <Stack justifyContent="center" alignItems="center">
                    <Typography variant="body2">No clients found</Typography>
                </Stack>
            )}
        </Stack>
    );
};

export default ClientsPage;
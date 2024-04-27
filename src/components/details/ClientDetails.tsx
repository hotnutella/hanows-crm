import { useGetClientQuery } from '@/store/api/clientsApi';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface DetailsContentProps {
    clientId: number;
}

const ClientDetails: React.FC<DetailsContentProps> = ({ clientId }) => {
    const { data: client } = useGetClientQuery(String(clientId));

    return (
        <Box
            height={`calc(100vh - 58px)`}
            width="100%"
        >
            {client && (
                <Box p={2}>
                    <Typography variant="h4">{client.name}</Typography>
                    <Typography variant="body1">{client.email}</Typography>
                    <Typography variant="body1">{client.phone}</Typography>
                    <Typography variant="body1">{client.address?.line1}</Typography>
                    <Typography variant="body1">{client.address?.line2}</Typography>
                    <Typography variant="body1">{client.address?.country}</Typography>
                </Box>
            )}
        </Box>
    );
}

export default ClientDetails;
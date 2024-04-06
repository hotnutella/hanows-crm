import React from 'react';
import WidgetCard from '@/components/WidgetCard';
import { useGetClientsQuery } from '../../../store/clientsApi';
import { Skeleton, Stack, Typography } from '@mui/material';

const ClientsWidget: React.FC = () => {
    const { data: clients, isLoading } = useGetClientsQuery({});

    if (isLoading) {
        return <Skeleton variant="rounded" width="100%" height="100%" animation="wave" />;
    }

    return (
        <WidgetCard route="/clients">
            <Stack textAlign="center">
                <Typography variant="h3" component="div">
                    {clients?.length || 0}
                </Typography>
                <Typography variant="h5" component="div">
                    Clients
                </Typography>
            </Stack>
        </WidgetCard>
    );
};

export default ClientsWidget;
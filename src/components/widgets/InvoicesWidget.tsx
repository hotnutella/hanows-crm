import React from 'react';
import WidgetCard from '@/components/WidgetCard';
import { useGetInvoicesQuery } from '../../../store/invoicesApi';
import { Skeleton, Stack, Typography } from '@mui/material';

const InvoicesWidget: React.FC = () => {
    const { data: invoices, isLoading } = useGetInvoicesQuery({});

    if (isLoading) {
        return <Skeleton variant="rounded" width="100%" height="100%" animation="wave" />;
    }

    return (
        <WidgetCard route="/invoices">
            <Stack textAlign="center">
                <Typography variant="h3" component="div">
                    {invoices?.length || 0}
                </Typography>
                <Typography variant="h5" component="div">
                    Invoices
                </Typography>
            </Stack>
        </WidgetCard>
    );
};

export default InvoicesWidget;
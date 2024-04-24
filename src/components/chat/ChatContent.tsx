import { Box, Stack } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import InvoiceMessage from './InvoiceMessage';
import { useGetInvoicesByClientQuery } from '@/store/api/invoicesApi';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setInvoiceCount } from '@/store/slices/clientSlice';

interface ChatContentProps {
    clientId: number;
    formHeight: number;
}

const ChatContent: React.FC<ChatContentProps> = (props) => {
    const { data: invoices } = useGetInvoicesByClientQuery(props.clientId);
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView();
    }, [invoices, props.formHeight]);

    useEffect(() => {
        dispatch(setInvoiceCount({ clientId: props.clientId, invoiceCount: invoices?.length || 0 }));
    }, [invoices, props.clientId, dispatch]);

    return (
        <Box
            height={`calc(100vh - 58px - ${props.formHeight || 0}px)`}
            width="100%"
            overflow="auto"
        >
            <Stack spacing={2} minHeight="100%" justifyContent="end">
                {invoices?.map((invoice) => (
                    <Stack key={invoice.id} direction="row" justifyContent="space-between">
                        <Box></Box>
                        <InvoiceMessage invoice={invoice} />
                    </Stack>
                ))}
            </Stack>
            <div ref={endOfMessagesRef} />
        </Box>
    );
};

export default ChatContent;
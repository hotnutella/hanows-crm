'use client';

import { Box } from '@mui/material';
import React from 'react';
import ChatContent from '@/components/chat/ChatContent';
import InvoiceForm from '@/components/chat/InvoiceForm';
import ChatHeader from '@/components/chat/ChatHeader';
import ConfirmDialog from '@/components/chat/ConfirmDialog';
import { useSelector } from 'react-redux';
import { getConfirmInvoiceDialog } from '@/store/slices/dialogSlice';

interface ChatPageProps {
    params: {
        id: string;
    };
}

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
    const [formHeight, setFormHeight] = React.useState(0);
    const confirmDialog = useSelector(getConfirmInvoiceDialog);

    return (
        <>
            <Box height="100vh">
                <ChatHeader clientId={+params.id} />
                <ChatContent clientId={+params.id} formHeight={formHeight} />
                <InvoiceForm clientId={+params.id} onHeightChange={setFormHeight} />
            </Box>
            <ConfirmDialog open={confirmDialog.open} invoiceId={confirmDialog.invoiceId || 0} />
        </>
    );
};

export default ChatPage;
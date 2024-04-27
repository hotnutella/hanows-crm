'use client';

import { useGetClientQuery } from '@/store/api/clientsApi';
import { Box, Typography } from '@mui/material';
import React from 'react';
import ChatContent from '@/components/chat/ChatContent';
import InvoiceForm from '@/components/chat/InvoiceForm';
import ChatHeader from '@/components/chat/ChatHeader';

interface ChatPageProps {
    params: {
        id: string;
    };
}

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
    const [formHeight, setFormHeight] = React.useState(0);

    return (
        <Box height="100vh">
            <ChatHeader clientId={+params.id} />
            <ChatContent clientId={+params.id} formHeight={formHeight} />
            <InvoiceForm clientId={+params.id} onHeightChange={setFormHeight} />
        </Box>
    );
};

export default ChatPage;
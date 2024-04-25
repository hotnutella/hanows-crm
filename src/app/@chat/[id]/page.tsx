'use client';

import { useGetClientQuery } from '@/store/api/clientsApi';
import { Box, Typography } from '@mui/material';
import React from 'react';
import ChatContent from '@/components/chat/ChatContent';
import InvoiceForm from '@/components/chat/InvoiceForm';

interface ChatPageProps {
    params: {
        id: string;
    };
}

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
    const [formHeight, setFormHeight] = React.useState(0);
    const { data: client, isLoading } = useGetClientQuery(params.id);

    return (
        <Box height="100vh">
            <Box
                sx={{ backgroundColor: 'white' }}
                boxShadow={2}
                pl={2}
                py={1}
                zIndex={100}
                position="relative">
                <Typography variant="h4">
                    {!isLoading && client?.name}
                    {isLoading && <>&nbsp;</>}
                </Typography>
            </Box>

            <ChatContent clientId={+params.id} formHeight={formHeight} />
            <InvoiceForm clientId={+params.id} onHeightChange={setFormHeight} />
        </Box>
    );
};

export default ChatPage;
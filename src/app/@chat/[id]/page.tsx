'use client';

import InvoiceLineForm from '@/components/chat/InvoiceLineForm';
import { useGetClientQuery } from '@/store/clientsApi';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ChatContent from '@/components/chat/ChatContent';

interface ChatPageProps {
    params: {
        id: string;
    };
}

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
    const { data: client } = useGetClientQuery(params.id);

    return (
        <Box height="100vh">
            <Box
                sx={{ backgroundColor: 'white' }}
                boxShadow={2}
                pl={2}
                py={1}
                zIndex={100}
                position="relative">
                <Typography variant="h4">{client?.name}</Typography>
            </Box>

            <ChatContent clientId={+params.id} />
            
            <Box
                position="sticky"
                top="calc(100vh - 40px)"
                left={0}
                right={0}
                boxShadow={2}
                p={2}
            >
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <InvoiceLineForm onChange={(data) => console.log(data)} />
                    <Button
                        size="small"
                        variant="contained"
                        sx={{ borderRadius: '20px' }}
                        endIcon={<ArrowUpwardIcon />}
                    >
                        Preview
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default ChatPage;
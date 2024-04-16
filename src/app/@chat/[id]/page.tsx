'use client';

import InvoiceLineForm from '@/components/chat/InvoiceLineForm';
import { useGetClientQuery } from '@/store/clientsApi';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

interface ChatPageProps {
    params: {
        id: string;
    };
}

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
    const { data: client } = useGetClientQuery(params.id);

    return (
        <Box height="100vh">
            <Box boxShadow={2} height={48} pl={2}>
                <Typography variant="h4">{client?.name}</Typography>
            </Box>
            <Box
                position="sticky"
                top="calc(100vh - 48px)"
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
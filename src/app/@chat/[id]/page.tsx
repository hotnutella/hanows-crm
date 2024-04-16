'use client';

import { useGetClientQuery } from '@/store/clientsApi';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface ChatPageProps {
    params: {
        id: string;
    };
}

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
    const { data: client } = useGetClientQuery(params.id);

    console.log(client)

    return (
        <Box boxShadow={2} height={48} pl={2}>
            <Typography variant="h4">{client?.name}</Typography>
        </Box>
    );
};

export default ChatPage;
import { useGetClientQuery } from '@/store/api/clientsApi';
import { Box, Button, Fab, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ChatHeaderProps {
    clientId: number;
    showBackButton?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ clientId, showBackButton }) => {
    const { data: client, isLoading } = useGetClientQuery(String(clientId));
    const router = useRouter();

    return (
        <Stack
            direction="row"
            spacing={2}
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

            {showBackButton && (
                <Box height={5}>
                    <Fab
                        color="primary"
                        size="small"
                        variant="extended"
                        sx={{ boxShadow: 0, mt: 0.5 }}
                        onClick={() => router.back()}
                    >
                        Back
                    </Fab>
                </Box>
            )}
        </Stack>
    );
}

export default ChatHeader;
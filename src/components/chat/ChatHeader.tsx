import { useGetClientQuery } from '@/store/api/clientsApi';
import { Box, Fab, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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
            justifyContent="space-between"
            sx={{ backgroundColor: 'white' }}
            boxShadow={2}
            pl={2}
            py={1}
            zIndex={100}
            position="relative"
        >
            <Stack direction="row" spacing={2}>
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
                            onClick={() => router.push(`/${clientId}`)}
                        >
                            Back to invoices
                        </Fab>
                    </Box>
                )}
            </Stack>
            <Box height={5}>
                <Tooltip title="Client details">
                    <IconButton
                        color="primary"
                        onClick={() => router.push(`/${clientId}/details`)}
                    >
                        <MoreHorizIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Stack>
    );
}

export default ChatHeader;
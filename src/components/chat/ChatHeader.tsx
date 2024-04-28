import { Client, useGetClientQuery, useLazyGetClientQuery } from '@/store/api/clientsApi';
import { Box, Fab, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { useEffect } from 'react';

interface ChatHeaderProps {
    clientId?: number;
    showBackButton?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ clientId, showBackButton }) => {
    const [client, setClient] = React.useState<Client | undefined>(undefined);
    const router = useRouter();
    const [getClient] = useLazyGetClientQuery();

    useEffect(() => {
        async function fetchClient() {
            if (clientId) {
                const response = await getClient(String(clientId));
                if ('data' in response) {
                    setClient(response.data as Client);
                }
            }
        }
        fetchClient();
        // Only run once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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
            {clientId && (
                <>
                    <Stack direction="row" spacing={2}>
                        <Typography variant="h4">
                            {client && client.name}
                            {!client && <>&nbsp;</>}
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
                </>
            )}
            {!clientId && <Typography variant="h4">New client</Typography>}
        </Stack>
    );
}

export default ChatHeader;
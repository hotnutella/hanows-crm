import { Client, useLazyGetClientQuery } from '@/store/api/clientsApi';
import { Box, Fab, IconButton, Stack, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useSelector } from 'react-redux';
import { getAccessToken } from '@/store/slices/accountSlice';

interface ChatHeaderProps {
    clientId?: number;
    showBackButton?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ clientId, showBackButton }) => {
    const [client, setClient] = React.useState<Client | undefined>(undefined);
    const router = useRouter();
    const [getClient] = useLazyGetClientQuery();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    const accessToken = useSelector(getAccessToken) || '';

    useEffect(() => {
        async function fetchClient() {
            if (clientId && accessToken) {
                const response = await getClient({ data: String(clientId), accessToken });
                if ('data' in response) {
                    setClient(response.data as Client);
                }
                if ('error' in response) {
                    router.push('/');
                }
            }
        }
        fetchClient();

        // Only run once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

    const width = isXs ? '100%' : 'calc(100% - 460px)';
    const titleFontSize = isXs ? '1rem' : '2rem';
    const titleLineHeight = isXs ? 2.5 : 1.5;

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ backgroundColor: 'white' }}
            boxShadow={2}
            px={2}
            py={1}
            zIndex={100}
            width={width}
            position="fixed"
        >
            {clientId && (
                <>
                    <Stack direction="row" spacing={2}>
                        {isXs && <Tooltip title="Back to client list">
                            <IconButton
                                color="primary"
                                onClick={() => router.push('/')}
                            >
                                <ArrowBackIosNewIcon />
                            </IconButton>
                        </Tooltip>}
                        <Typography variant="h4" fontSize={titleFontSize} lineHeight={titleLineHeight}>
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
                                    onClick={() => router.push(`/crm/${clientId}`)}
                                >
                                    <Typography fontSize={ isXs ? '0.7rem' : '0.875rem' }>
                                        Back to invoices
                                    </Typography>
                                </Fab>
                            </Box>
                        )}
                    </Stack>
                    <Box height={5} pr={2}>
                        <Tooltip title="Client details">
                            <IconButton
                                color="primary"
                                onClick={() => router.push(`/crm/${clientId}/details`)}
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
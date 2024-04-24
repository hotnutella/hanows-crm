'use client';

import InvoiceLineForm from '@/components/chat/InvoiceLineForm';
import { useGetClientQuery } from '@/store/api/clientsApi';
import { Box, Fab, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import AddIcon from '@mui/icons-material/Add';
import ChatContent from '@/components/chat/ChatContent';
import { LineData, resetMessage } from '@/store/slices/messageSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';

interface ChatPageProps {
    params: {
        id: string;
    };
}

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
    const [lineIds, setLineIds] = React.useState<number[]>([0]);
    const [formHeight, setFormHeight] = React.useState(0);
    const { data: client } = useGetClientQuery(params.id);
    const dispatch = useDispatch<AppDispatch>();

    const formRef = React.useRef<HTMLDivElement | null>(null);

    const handleNewLine = () => {
        setLineIds(prev => [...prev, prev.length]);
    }

    const handlePreview = () => {
        setLineIds([0]);
        dispatch(resetMessage(+params.id));
    }

    useEffect(() => {
        if (!formRef.current) {
            return;
        }

        const resizeObserver = new ResizeObserver(() => {
            if (!formRef.current) {
                return;
            }

            const height = formRef.current!.getBoundingClientRect().height;
            setFormHeight(height);
        });
        resizeObserver.observe(formRef.current);

        return () => resizeObserver.disconnect();
    }, []);

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

            <ChatContent clientId={+params.id} formHeight={formHeight} />

            <Box
                position="sticky"
                top="calc(100vh - 40px)"
                left={0}
                right={0}
                boxShadow={2}
                p={2}
                ref={formRef}
            >
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <Stack direction="column" spacing={2}>
                            {lineIds.map((lineId) => (
                                <InvoiceLineForm 
                                    key={lineId} 
                                    clientId={+params.id}
                                    lineId={lineId} />
                            ))}
                        </Stack>
                        <Fab
                            size="small"
                            color="primary"
                            sx={{ marginBottom: 0 }}
                            onClick={handleNewLine}
                        >
                            <AddIcon />
                        </Fab>
                    </Stack>
                    <Box>
                        <Fab color="primary" variant="extended" onClick={handlePreview}>
                            <Typography variant="button">Preview</Typography>
                            <KeyboardDoubleArrowUpIcon />
                        </Fab>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default ChatPage;
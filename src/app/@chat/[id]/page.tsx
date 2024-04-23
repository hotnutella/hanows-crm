'use client';

import InvoiceLineForm from '@/components/chat/InvoiceLineForm';
import { useGetClientQuery } from '@/store/api/clientsApi';
import { Box, Fab, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import AddIcon from '@mui/icons-material/Add';
import ChatContent from '@/components/chat/ChatContent';
import { LineData } from '@/store/slices/messageSlice';

interface ChatPageProps {
    params: {
        id: string;
    };
}

interface Message {
    lines: {
        [key: number]: LineData;
    }
}

const initialMessage: Message = {
    lines: {},
};

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
    const [message, setMessage] = React.useState<Message>(initialMessage);
    const [lineIds, setLineIds] = React.useState<number[]>([0]);
    const [formHeight, setFormHeight] = React.useState(0);
    const { data: client } = useGetClientQuery(params.id);

    const formRef = React.useRef<HTMLDivElement | null>(null);

    const handleInvoiceLineChange = (data: LineData, lineId: number) => {
        setMessage({
            ...message,
            lines: {
                ...message.lines,
                [lineId]: data,
            }
        });
    }

    const handleNewLine = () => {
        setLineIds(prev => [...prev, prev.length]);
    }

    const handlePreview = () => {
        console.log(message);
        setMessage(initialMessage);
        setLineIds([0]);
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
                                    onChange={(data: LineData) => handleInvoiceLineChange(data, lineId)} />
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
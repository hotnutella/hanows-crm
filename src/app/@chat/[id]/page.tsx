'use client';

import InvoiceLineForm, { LineData } from '@/components/chat/InvoiceLineForm';
import { useGetClientQuery } from '@/store/api/clientsApi';
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ChatContent from '@/components/chat/ChatContent';

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

    useEffect(() => {
        if (!formRef.current) {
            return;
        }
        
        const resizeObserver = new ResizeObserver(() => {
            const height = formRef.current!.getBoundingClientRect().height;
            setFormHeight(height);
        });
        resizeObserver.observe(formRef.current);

        return () => resizeObserver.disconnect();
      }, []);

    console.log(message)

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
                    <Stack direction="column" spacing={2}>
                        {[0, 1, 2].map((lineId) => (
                            <InvoiceLineForm key={lineId} onChange={(data: LineData) => handleInvoiceLineChange(data, lineId)} />
                        ))}
                    </Stack>
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
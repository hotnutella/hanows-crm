import { Box, Stack } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import InvoiceMessage from './InvoiceMessage';

interface ChatContentProps {
    // Define the props for the ChatContent component here
}

const ChatContent: React.FC<ChatContentProps> = (props) => {
    // Implement the logic for the ChatContent component here

    const invoices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView();
    }, []);

    return (
        <Box
            height="calc(100vh - 58px - 72px)"
            width="100%"
            overflow="auto"
        >
            <Stack spacing={2} minHeight="100%" justifyContent="end">
                {invoices.map((invoice) => (
                    <Stack key={invoice} direction="row" justifyContent="space-between">
                        <Box></Box>
                        <InvoiceMessage />
                    </Stack>
                ))}
            </Stack>
            <div ref={endOfMessagesRef} />
        </Box>
    );
};

export default ChatContent;
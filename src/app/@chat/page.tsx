import { Box, Typography } from '@mui/material';
import React from 'react';

const ChatPage: React.FC = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Typography variant="body2">Click on a client to see interactions</Typography>
        </Box>
    );
};

export default ChatPage;
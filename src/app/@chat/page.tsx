'use client';

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

const ChatPage: React.FC = () => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    if (isXs) {
        return <></>;
    }

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
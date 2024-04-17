import { Paper, Typography } from '@mui/material';
import React from 'react';

interface InvoiceMessageProps {
    // Define your props here
}

const InvoiceMessage: React.FC<InvoiceMessageProps> = (props) => {
    // Add your component logic here

    return (
        <Paper
            style={{
                margin: '8px', 
                padding: '8px', 
                width: '10rem',
                height: '16rem',
            }}
        >
            <Typography variant="body1">Invoice</Typography>
        </Paper>
    );
};

export default InvoiceMessage;
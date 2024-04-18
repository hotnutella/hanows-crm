import { Invoice } from '@/store/api/invoicesApi';
import { Paper, Typography } from '@mui/material';
import React from 'react';

interface InvoiceMessageProps {
    invoice: Invoice;
}

const InvoiceMessage: React.FC<InvoiceMessageProps> = ({ invoice }) => {
    // Add your component logic here

    return (
        <Paper
            style={{
                margin: '8px', 
                padding: '8px', 
                width: '10rem',
                height: '16rem',
                userSelect: 'none'
            }}
        >
            <Typography variant="body1">Invoice {invoice.invoice_number}</Typography>
        </Paper>
    );
};

export default InvoiceMessage;
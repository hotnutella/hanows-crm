import { Invoice } from '@/store/api/invoicesApi';
import { Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import styles from './InvoiceMessage.module.css';
import Search from '@mui/icons-material/Search';

interface InvoiceMessageProps {
    invoice: Invoice;
}

const InvoiceMessage: React.FC<InvoiceMessageProps> = ({ invoice }) => {
    // Add your component logic here

    return (
        <Paper className={styles.invoice}>
            <Stack direction="column" justifyContent="space-between" height="100%">
                <Typography variant="body2">Invoice {invoice.invoice_number}</Typography>
                <Box>
                    <Typography variant="body2" textAlign="right" fontSize={10}>Invoice date: {invoice.issue_date}</Typography>
                    <Typography variant="body2" textAlign="right" fontSize={10}>Due date: {invoice.due_date}</Typography>
                </Box>
                <Typography variant="body1" textAlign="right">Total: {invoice.total_amount}</Typography>
            </Stack>
        </Paper>
    );
};

export default InvoiceMessage;
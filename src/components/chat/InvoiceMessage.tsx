import { Invoice } from '@/store/api/invoicesApi';
import { Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import styles from './InvoiceMessage.module.css';
import { useGetInvoiceLinesByInvoiceQuery } from '@/store/api/invoiceLinesApi';
import { useRouter } from 'next/navigation';

interface InvoiceMessageProps {
    invoice: Invoice;
}

const InvoiceMessage: React.FC<InvoiceMessageProps> = ({ invoice }) => {
    const { data: invoiceLines } = useGetInvoiceLinesByInvoiceQuery(invoice.id);
    const router = useRouter();

    return (
        <Paper className={styles.invoice} onClick={() => router.push(`/${invoice.client_id}/${invoice.id}`)}>
            <Stack direction="column" justifyContent="space-between" height="100%">
                <Typography variant="body2">Invoice {invoice.invoice_number}</Typography>
                <Box>
                    <Typography variant="body2" textAlign="right" fontSize={10}>Invoice date: {invoice.issue_date}</Typography>
                    <Typography variant="body2" textAlign="right" fontSize={10}>Due date: {invoice.due_date}</Typography>
                </Box>
                <Box>
                    {invoiceLines?.map((line) => (
                        <Stack key={line.id} direction="row" justifyContent="space-between">
                            <Typography variant="body1" fontSize={10}>{line.description}</Typography>
                            <Typography variant="body1" fontSize={10}>{line.quantity} x {line.unit_price + line.unit_price * line.vat / 100}</Typography>
                        </Stack>
                    ))}
                </Box>
                <Typography variant="body1" textAlign="right">Total: {invoice.total_amount}</Typography>
            </Stack>
        </Paper>
    );
};

export default InvoiceMessage;
import { Invoice } from '@/store/api/invoicesApi';
import { Box, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';
import styles from './InvoiceMessage.module.css';
import { useGetInvoiceLinesByInvoiceQuery } from '@/store/api/invoiceLinesApi';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getIsGeneratingPdf } from '@/store/slices/messageSlice';
import { RootState } from '@/store';
import Ribbon from './Ribbon';
import { getAccessToken } from '@/store/slices/accountSlice';

interface InvoiceMessageProps {
    invoice: Invoice;
}

const InvoiceMessage: React.FC<InvoiceMessageProps> = ({ invoice }) => {
    const accessToken = useSelector(getAccessToken) || '';
    const { data: invoiceLines } = useGetInvoiceLinesByInvoiceQuery({ data: invoice.id, accessToken });
    const isGeneratingPdf = useSelector((state: RootState) => getIsGeneratingPdf(state, invoice.id));
    const router = useRouter();

    const className = isGeneratingPdf ? `${styles.invoice} ${styles.disabled}` : styles.invoice;
    const handleClick = () => {
        if (isGeneratingPdf) {
            return;
        }

        router.push(`/crm/${invoice.client_id}/${invoice.id}`)
    }

    return (
        <Stack direction="row">
            {invoice.status === 'draft' && (
                <Stack direction="column" justifyContent="center" className={styles.actions}>
                    <Tooltip title="Edit" placement="top">
                        <IconButton size="large">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Confirm">
                        <IconButton size="large">
                            <CheckIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            )}
            <Paper className={className} onClick={handleClick}>
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
                                <Typography variant="body1" fontSize={10}>{line.quantity} x {(line.unit_price + line.unit_price * line.vat / 100).toFixed(2)}</Typography>
                            </Stack>
                        ))}
                    </Box>
                    <Typography variant="body1" textAlign="right">Total: {invoice.total_amount}</Typography>
                </Stack>
                {invoice.status === 'draft' && <Ribbon text={invoice.status} />}
            </Paper>
        </Stack>
    );
};

export default InvoiceMessage;
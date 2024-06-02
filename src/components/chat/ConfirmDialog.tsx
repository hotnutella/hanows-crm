import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { closeConfirmInvoiceDialog } from '@/store/slices/dialogSlice';
import { useGetInvoiceQuery, useLazyGetInvoiceQuery, useUpdateInvoiceMutation } from '@/store/api/invoicesApi';
import { getAccessToken } from '@/store/slices/accountSlice';

interface ConfirmDialogProps {
    open: boolean;
    invoiceId: number;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, invoiceId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const accessToken = useSelector(getAccessToken) || '';

    const { data: existingInvoice } = useGetInvoiceQuery({ data: invoiceId, accessToken });
    const [updateInvoice] = useUpdateInvoiceMutation();

    const handleClose = () => {
        dispatch(closeConfirmInvoiceDialog());
    }

    const handleConfirm = async () => {
        if (!existingInvoice) {
            return;
        }

        const data = {
            ...existingInvoice,
            status: 'sent',
        };

        await updateInvoice({ data, accessToken });
        dispatch(closeConfirmInvoiceDialog());
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Invoice</DialogTitle>
            <DialogContent>
                <Typography variant="body2">
                    Are you sure you want to confirm invoice <b>{existingInvoice?.invoice_number}</b>? This action cannot be undone.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleConfirm}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;
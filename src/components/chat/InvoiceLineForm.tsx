import { Stack, TextField } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLineData, addLine, updateLineText, updateQuantity, updateVat } from '@/store/slices/messageSlice';
import { AppDispatch, RootState } from '@/store';

interface InvoiceLineFormProps {
    clientId: number;
    lineId: number;
}

const InvoiceLineForm: React.FC<InvoiceLineFormProps> = ({ clientId, lineId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const lineData = useSelector((state: RootState) => getLineData(state, clientId, lineId));

    if (!lineData) {
        dispatch(addLine({ clientId, lineId, data: { lineText: '', quantity: 0, vat: 0 } }));
    }

    const handleChangeLineText = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateLineText({ clientId, lineId, lineText: e.target.value }));
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.max(0, +e.target.value);
        dispatch(updateQuantity({ clientId, lineId, quantity: newValue }));
    }

    const handleVatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.max(0, +e.target.value);
        dispatch(updateVat({ clientId, lineId, vat: newValue }));
    }

    return (
        <Stack direction="row" spacing={2}>
            <TextField
                size="small"
                value={lineData?.lineText || ''}
                placeholder="Line item"
                onChange={handleChangeLineText}
                sx={{ width: '20rem' }}
                InputProps={{
                    style: { borderRadius: '20px' }
                }}
            />

            <TextField
                size="small"
                value={lineData?.quantity == 0 ? '' : lineData?.quantity}
                type="number"
                placeholder="Qty"
                onChange={handleQuantityChange}
                sx={{ width: '5rem' }}
                InputProps={{
                    style: { borderRadius: '20px' }
                }}
            />

            <TextField
                size="small"
                value={lineData?.vat == 0 ? '' : lineData?.vat}
                type="number"
                placeholder="VAT"
                onChange={handleVatChange}
                sx={{ width: '5rem' }}
                InputProps={{
                    style: { borderRadius: '20px' }
                }}
            />
        </Stack>
    );
};

export default InvoiceLineForm;
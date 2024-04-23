import { Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LineData } from '@/store/slices/messageSlice';

interface InvoiceLineFormProps {
    onChange: (data: LineData) => void;
}

const InvoiceLineForm: React.FC<InvoiceLineFormProps> = ({ onChange }) => {
    const [lineText, setLineText] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [vat, setVat] = useState(0);

    const handleChangeLineText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLineText(e.target.value);
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.max(0, +e.target.value);
        setQuantity(newValue);
    }

    const handleVatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.max(0, +e.target.value);
        setVat(newValue);
    }

    useEffect(() => {
        onChange({
            lineText,
            quantity: quantity,
            vat,
        });
        // Excluding onChange dependency to avoid infinite loop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lineText, quantity, vat]);

    return (
        <Stack direction="row" spacing={2}>
            <TextField
                size="small"
                value={lineText || ''}
                placeholder="Line item"
                onChange={handleChangeLineText}
                sx={{ width: '20rem' }}
                InputProps={{
                    style: { borderRadius: '20px' }
                }}
            />

            <TextField
                size="small"
                value={quantity == 0 ? '' : quantity}
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
                value={vat == 0 ? '' : vat}
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
import { Box, Grid, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLineData, updateLineText, updateQuantity, updateUnitPrice, updateVat } from '@/store/slices/messageSlice';
import { AppDispatch, RootState } from '@/store';

interface InvoiceLineFormProps {
    clientId: number;
    lineId: number;
}

const InvoiceLineForm: React.FC<InvoiceLineFormProps> = ({ clientId, lineId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const lineData = useSelector((state: RootState) => getLineData(state, clientId, lineId));
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    const handleChangeLineText = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateLineText({ clientId, lineId, lineText: e.target.value }));
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.max(0, +e.target.value);
        dispatch(updateQuantity({ clientId, lineId, quantity: newValue }));
    }

    const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.max(0, +e.target.value);
        dispatch(updateUnitPrice({ clientId, lineId, unitPrice: newValue }));
    }

    const handleVatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.max(0, +e.target.value);
        dispatch(updateVat({ clientId, lineId, vat: newValue }));
    }

    const lineItemStyle = isXs ? { width: '100%' } : { width: '16rem' };
    const smallFieldStyle = isXs ? {} : { width: '5rem' };

    return (
        <Grid container columnSpacing={isXs ? 0 : 4} rowSpacing={1}>
            <Grid item xs={12} lg={6}>
                <TextField
                    size="small"
                    value={lineData?.lineText || ''}
                    placeholder="Line item"
                    onChange={handleChangeLineText}
                    sx={lineItemStyle}
                    InputProps={{
                        style: { borderRadius: '20px' }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Stack direction="row" spacing={1}>
                    <TextField
                        size="small"
                        value={lineData?.quantity == 0 ? '' : lineData?.quantity}
                        type="number"
                        placeholder="Qty"
                        onChange={handleQuantityChange}
                        sx={smallFieldStyle}
                        fullWidth
                        InputProps={{
                            style: { borderRadius: '20px' }
                        }}
                    />

                    <TextField
                        size="small"
                        value={lineData?.unitPrice == 0 ? '' : lineData?.unitPrice}
                        type="number"
                        placeholder="Price"
                        onChange={handleUnitPriceChange}
                        sx={smallFieldStyle}
                        fullWidth
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
                        sx={smallFieldStyle}
                        fullWidth
                        InputProps={{
                            style: { borderRadius: '20px' }
                        }}
                    />
                </Stack>
            </Grid>
        </Grid>
    );
};

export default InvoiceLineForm;
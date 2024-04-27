import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface AccountState {
    invoiceCount: number;
}

const initialState: AccountState = {
    invoiceCount: 0,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setInvoiceCount: (state, action: PayloadAction<number>) => {
            state.invoiceCount = action.payload;
        }
    },
});

export const getInvoiceCount = (state: RootState) => state.account.invoiceCount;

export const getInvoiceNumber = (state: RootState) => {
    const invoiceCount = state.account?.invoiceCount || 0;
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const nextInvoice = String(invoiceCount + 1).padStart(3, '0');
    
    return `${year}${month}${nextInvoice}`;
}

export const {
    setInvoiceCount,
} = accountSlice.actions;

export default accountSlice.reducer;
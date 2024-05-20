import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface AccountState {
    invoiceCount: number;
    accessToken?: string;
}

interface Tokens {
    accessToken: string;
    refreshToken: string;
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
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setTokens: (state, action: PayloadAction<Tokens>) => {
            state.accessToken = action.payload.accessToken;
            localStorage.setItem('refreshToken', action.payload.refreshToken);
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

export const getAccessToken = (state: RootState) => state.account.accessToken;

export const {
    setInvoiceCount,
    setTokens,
} = accountSlice.actions;

export default accountSlice.reducer;
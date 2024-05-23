import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { AccountData } from '../api/accountApi';

interface AccountState {
    invoiceCount: number;
    userId?: string;
    email?: string;
    accessToken?: string;
    data?: AccountData;
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
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setTokens: (state, action: PayloadAction<Tokens>) => {
            state.accessToken = action.payload.accessToken;
            localStorage.setItem('refreshToken', action.payload.refreshToken);
        },
        setAccountData: (state, action: PayloadAction<AccountData>) => {
            state.data = action.payload;
        },
    },
});

export const getInvoiceCount = (state: RootState) => state.account.invoiceCount;
export const getUserId = (state: RootState) => state.account.userId;
export const getEmail = (state: RootState) => state.account.email;

export const getInvoiceNumber = (state: RootState) => {
    const invoiceCount = state.account?.invoiceCount || 0;
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const nextInvoice = String(invoiceCount + 1).padStart(3, '0');
    
    return `${year}${month}${nextInvoice}`;
}

export const getAccessToken = (state: RootState) => state.account.accessToken;
export const getAccountData = (state: RootState) => state.account.data;

export const {
    setInvoiceCount,
    setUserId,
    setEmail,
    setTokens,
    setAccountData,
} = accountSlice.actions;

export default accountSlice.reducer;
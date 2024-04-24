import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface ClientState {
    [clientId: number]: {
        invoiceCount: number;
    }
}

interface SetInvoiceCountPayload {
    clientId: number;
    invoiceCount: number;
}

const initialState: ClientState = {};

// Create the client slice
const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        setInvoiceCount: (state, action: PayloadAction<SetInvoiceCountPayload>) => {
            const { clientId, invoiceCount } = action.payload;
            if (!state[clientId]) {
                state[clientId] = {
                    invoiceCount: 0,
                };
            }

            state[clientId].invoiceCount = invoiceCount;
        }
    },
});

export const getInvoiceNumber = (state: RootState, clientId: number) => {
    const invoiceCount = state.client[clientId]?.invoiceCount || 0;
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const nextInvoice = String(invoiceCount + 1).padStart(3, '0');
    
    return `${year}${month}${nextInvoice}`;
}

export const {
    setInvoiceCount,
} = clientSlice.actions;
export default clientSlice.reducer;
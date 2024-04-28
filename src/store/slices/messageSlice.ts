import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';


interface LineData {
    lineText: string;
    quantity: number;
    unitPrice: number;
    vat: number;
}

interface LinePayloadBase {
    clientId: number;
    lineId: number;
}

interface AddLinePayload {
    clientId: number;
    data: LineData;
}

interface UpdateLinePayload extends LinePayloadBase {
    data: LineData;   
}

interface LineTextPayload extends LinePayloadBase {
    lineText: string;
}

interface UnitPricePayload extends LinePayloadBase {
    unitPrice: number;
}

interface VatPayload extends LinePayloadBase {
    vat: number;
}

interface QuantityPayload extends LinePayloadBase {
    quantity: number;
}

interface IsGeneratingPdfPayload {
    clientId: number;
    value: boolean;
}

interface MessageState {
    [clientId: number]: {
        lines: {
            [key: number]: LineData;
        },
    },
    generatingInvoices: number[];
}

const initialState: MessageState = {
    generatingInvoices: [],
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        addLine: (state, action: PayloadAction<AddLinePayload>) => {
            const { clientId, data } = action.payload;
            if (!state[clientId]) {
                state[clientId] = {
                    lines: {},
                }
            }
            const lineId = Object.keys(state[clientId].lines).length;
            state[clientId].lines[lineId] = data;
        },
        updateLine: (state, action: PayloadAction<UpdateLinePayload>) => {
            const { clientId, lineId, data } = action.payload;
            state[clientId].lines[lineId] = data;
        },
        updateLineText: (state, action: PayloadAction<LineTextPayload>) => {
            const { clientId, lineId, lineText } = action.payload;
            state[clientId].lines[lineId].lineText = lineText;
        },
        updateVat: (state, action: PayloadAction<VatPayload>) => {
            const { clientId, lineId, vat } = action.payload;
            state[clientId].lines[lineId].vat = vat;
        },
        updateUnitPrice: (state, action: PayloadAction<UnitPricePayload>) => {
            const { clientId, lineId, unitPrice } = action.payload;
            state[clientId].lines[lineId].unitPrice = unitPrice;
        },
        updateQuantity: (state, action: PayloadAction<QuantityPayload>) => {
            const { clientId, lineId, quantity } = action.payload;
            state[clientId].lines[lineId].quantity = quantity;
        },
        resetMessage: (state, action: PayloadAction<number>) => {
            delete state[action.payload];
        },
        addToGeneratingInvoicesList: (state, action: PayloadAction<number>) => {
            state.generatingInvoices.push(action.payload)
        },
        removeFromGeneratingInvoicesList: (state, action: PayloadAction<number>) => {
            state.generatingInvoices = state.generatingInvoices.filter((id) => id !== action.payload);
        }
    },
});

export const getLineData = (state: RootState, clientId: number, lineId: number) => {
    return state.message[clientId]?.lines[lineId];
}

export const getLines = createSelector(
    (state: RootState, clientId: number) => state.message[clientId]?.lines,
    (lines) => lines || {}
)

export const getIsGeneratingPdf = (state: RootState, invoiceId: number) => {
    return state.message.generatingInvoices.includes(invoiceId);
}

export const { 
    addLine,
    updateLine,
    updateLineText,
    updateVat,
    updateUnitPrice,
    updateQuantity,
    resetMessage,
    addToGeneratingInvoicesList,
    removeFromGeneratingInvoicesList,
} = messageSlice.actions;
export default messageSlice.reducer;
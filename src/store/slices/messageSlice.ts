import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';


export interface LineData {
    lineText: string;
    quantity: number;
    vat: number;
}

interface LinePayloadBase {
    clientId: number;
    lineId: number;
}

interface AddLinePayload extends LinePayloadBase {
    data: LineData;
}

interface LineTextPayload extends LinePayloadBase {
    lineText: string;
}

interface VatPayload extends LinePayloadBase {
    vat: number;
}

interface QuantityPayload extends LinePayloadBase {
    quantity: number;
}

interface MessageState {
    [clientId: number]: {
        lines: {
            [key: number]: LineData;
        }
    }
}

const initialState: MessageState = {};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        addLine: (state, action: PayloadAction<AddLinePayload>) => {
            const { clientId, lineId, data } = action.payload;
            if (!state[clientId]) {
                state[clientId] = {
                    lines: {}
                }
            }
            state[clientId].lines[lineId] = data;
        },
        updateLine: (state, action: PayloadAction<AddLinePayload>) => {
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
        updateQuantity: (state, action: PayloadAction<QuantityPayload>) => {
            const { clientId, lineId, quantity } = action.payload;
            state[clientId].lines[lineId].quantity = quantity;
        },
        resetMessage: (state, action: PayloadAction<number>) => {
            delete state[action.payload];
        },
    },
});

export const getLineData = (state: RootState, clientId: number, lineId: number) => {
    return state.message[clientId]?.lines[lineId];
}

export const { 
    addLine,
    updateLine,
    updateLineText,
    updateVat,
    updateQuantity,
    resetMessage,
} = messageSlice.actions;
export default messageSlice.reducer;
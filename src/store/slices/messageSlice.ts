import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';


export interface LineData {
    lineText: string;
    quantity: number;
    vat: number;
}

interface AddLinePayload {
    clientId: number;
    lineId: number;
    data: LineData;
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
        }
    },
});

export const getLineData = (state: RootState, clientId: number, lineId: number) => {
    return state.message[clientId]?.lines[lineId];
}

export const { 
    addLine,
} = messageSlice.actions;
export default messageSlice.reducer;
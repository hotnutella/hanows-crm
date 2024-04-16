import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

interface ClientSearchState {
    searchTerm: string;
    selectedClient: number | null;
}

const initialState: ClientSearchState = {
    searchTerm: '',
    selectedClient: null,
};

const clientSearchSlice = createSlice({
    name: 'clientSearch',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setSelectedClient: (state, action: PayloadAction<number>) => {
            state.selectedClient = action.payload;
        }
    },
});

export const selectSearchTerm = (state: RootState) => state.clientSearch.searchTerm;
export const selectSelectedClient = (state: RootState) => state.clientSearch.selectedClient;

export const { 
    setSearchTerm,
    setSelectedClient,
} = clientSearchSlice.actions;

export default clientSearchSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

interface ClientSearchState {
    searchTerm: string;
}

const initialState: ClientSearchState = {
    searchTerm: '',
};

const clientSearchSlice = createSlice({
    name: 'clientSearch',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
    },
});

export const selectSearchTerm = (state: RootState) => state.clientSearch.searchTerm;

export const { setSearchTerm } = clientSearchSlice.actions;

export default clientSearchSlice.reducer;
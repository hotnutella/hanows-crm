import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface ConfirmInvoiceDialog {
    open: boolean;
    invoiceId?: number;
}

interface DialogState {
    confirmInvoiceDialog: ConfirmInvoiceDialog;
}

const initialState: DialogState = {
    confirmInvoiceDialog: {
        open: false
    },
};

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openConfirmInvoiceDialog: (state, action: PayloadAction<number>) => {
            state.confirmInvoiceDialog = {
                open: true,
                invoiceId: action.payload,
            };
        },
        closeConfirmInvoiceDialog: (state) => {
            state.confirmInvoiceDialog = {
                open: false,
            };
        },
    },
});

export const getConfirmInvoiceDialog = createSelector(
    (state: RootState) => state.dialog.confirmInvoiceDialog,
    (confirmInvoiceDialog) => confirmInvoiceDialog,
);

export const {
    openConfirmInvoiceDialog,
    closeConfirmInvoiceDialog
} = dialogSlice.actions;
export default dialogSlice.reducer;
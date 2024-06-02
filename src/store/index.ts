import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { clientsApi } from './api/clientsApi';
import { invoicesApi } from './api/invoicesApi';
import { invoiceLinesApi } from './api/invoiceLinesApi';
import clientSearchReducer from './slices/clientSearchSlice';
import messageReducer from './slices/messageSlice';
import accountReducer from './slices/accountSlice';
import dialogReducer from './slices/dialogSlice';
import { edgeApi } from './api/edgeApi';
import { authApi } from './api/authApi';
import { accountApi } from './api/accountApi';
import { countriesApi } from './api/countriesApi';
import { banksApi } from './api/banksApi';

const rootReducer = combineReducers({
    account: accountReducer,
    clientSearch: clientSearchReducer,
    message: messageReducer,
    dialog: dialogReducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [invoicesApi.reducerPath]: invoicesApi.reducer,
    [invoiceLinesApi.reducerPath]: invoiceLinesApi.reducer,
    [edgeApi.reducerPath]: edgeApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [banksApi.reducerPath]: banksApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(clientsApi.middleware)
            .concat(invoicesApi.middleware)
            .concat(invoiceLinesApi.middleware)
            .concat(edgeApi.middleware)
            .concat(authApi.middleware)
            .concat(accountApi.middleware)
            .concat(countriesApi.middleware)
            .concat(banksApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
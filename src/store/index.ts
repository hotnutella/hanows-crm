import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { clientsApi } from './api/clientsApi';
import { invoicesApi } from './api/invoicesApi';
import { invoiceLinesApi } from './api/invoiceLinesApi';
import clientSearchReducer from './slices/clientSearchSlice';
import messageReducer from './slices/messageSlice';
import accountReducer from './slices/accountSlice';
import { edgeApi } from './api/edgeApi';

const rootReducer = combineReducers({
    account: accountReducer,
    clientSearch: clientSearchReducer,
    message: messageReducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [invoicesApi.reducerPath]: invoicesApi.reducer,
    [invoiceLinesApi.reducerPath]: invoiceLinesApi.reducer,
    [edgeApi.reducerPath]: edgeApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(clientsApi.middleware)
            .concat(invoicesApi.middleware)
            .concat(invoiceLinesApi.middleware)
            .concat(edgeApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
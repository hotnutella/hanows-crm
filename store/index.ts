import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { clientsApi } from './clientsApi';
import { invoicesApi } from './invoicesApi';

export const store = configureStore({
    reducer: {
        [clientsApi.reducerPath]: clientsApi.reducer,
        [invoicesApi.reducerPath]: invoicesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(clientsApi.middleware)
            .concat(invoicesApi.middleware),
});

setupListeners(store.dispatch);

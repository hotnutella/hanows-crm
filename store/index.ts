import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { clientsApi } from './clientsApi'; // Add missing import statement

export const store = configureStore({
    reducer: {
        [clientsApi.reducerPath]: clientsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(clientsApi.middleware),
});

setupListeners(store.dispatch);

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { clientsApi } from './api/clientsApi';
import { invoicesApi } from './api/invoicesApi';
import clientSearchReducer from './slices/clientSearchSlice';

const rootReducer = combineReducers({
    clientSearch: clientSearchReducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [invoicesApi.reducerPath]: invoicesApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(clientsApi.middleware)
            .concat(invoicesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
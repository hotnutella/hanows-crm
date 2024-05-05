import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

interface Credentials {
    email: string;
    password: string;
}

// Define your API endpoints
const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
        // Define your endpoints here
        createAccount: builder.mutation<void, Credentials>({
            query: (credentials) => ({
                url: 'auth/signup',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

// Export hooks for each endpoint
export const { } = authApi;
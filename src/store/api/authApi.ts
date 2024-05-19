import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './baseQuery';

interface Credentials {
    id: string;
    email: string;
    password: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1`,
        prepareHeaders,
    }),
    endpoints: (builder) => ({
        createAccount: builder.mutation<Credentials, Partial<Credentials>>({
            query: (credentials) => ({
                url: 'signup',
                method: 'POST',
                body: credentials,
            })
        })
    }),
});

export const {
    useCreateAccountMutation,
} = authApi;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './baseQuery';

export interface Auth<T> {
    data: T;
    accessToken: string;
}

interface Credentials {
    id: string;
    email: string;
    password: string;
}

interface RefreshToken {
    refresh_token: string;
}

interface LoginResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token: string;
    user: {
        id: string;
        email: string;
        app_metadata: {
            provider: string;
        }
    }
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
        }),
        login: builder.mutation<LoginResponse, Partial<Credentials>>({
            query: (credentials) => ({
                url: 'token?grant_type=password',
                method: 'POST',
                body: credentials,
            })
        }),
        refresh: builder.mutation<LoginResponse, RefreshToken>({
            query: (refreshToken) => ({
                url: 'token?grant_type=refresh_token',
                method: 'POST',
                body: refreshToken,
            })
        }),
    }),
});

export const {
    useCreateAccountMutation,
    useLoginMutation,
    useRefreshMutation,
} = authApi;
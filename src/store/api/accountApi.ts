import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { Auth } from './authApi';

export interface AccountData {
    id?: string;
    first_name: string;
    last_name: string;
    company_name: string;
    company_reg_number: string;
    vat_number: string;
    address: string;
    city: string;
    zip_code: string;
    country: string;
    phone: string;
    email: string;
    user_id: string;
}

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery,
    tagTypes: ['ACCOUNT_DATA'],
    endpoints: (builder) => ({
        getAccountData: builder.query<AccountData, string>({
            query: (accessToken) => ({
                url: 'account_data',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
            transformResponse: (response: AccountData[]) => response[0], 
            providesTags: ['ACCOUNT_DATA'],
        }),
        createAccountData: builder.mutation<void, Auth<AccountData>>({
            query: ({ data, accessToken }) => ({
                url: 'account_data',
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
            invalidatesTags: ['ACCOUNT_DATA'],
        }),
        updateAccountData: builder.mutation<AccountData, Auth<AccountData>>({
            query: ({ data, accessToken }) => ({
                url: `account_data?id=eq.${data.id}`,
                method: 'PATCH',
                body: data,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }),
            invalidatesTags: ['ACCOUNT_DATA'],
        }),
    }),
});

export const {
    useLazyGetAccountDataQuery,
    useCreateAccountDataMutation,
    useUpdateAccountDataMutation,
    useGetAccountDataQuery,
} = accountApi;
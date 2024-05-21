import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export interface AccountData {
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
        createAccountData: builder.mutation<void, AccountData>({
            query: (accountData) => ({
                url: 'account_data',
                method: 'POST',
                body: accountData,
            }),
            invalidatesTags: ['ACCOUNT_DATA'],
        }),
        updateAccount: builder.mutation<AccountData, Partial<AccountData>>({
            query: (update) => ({
                url: 'account',
                method: 'PATCH',
                body: update,
            }),
            invalidatesTags: ['ACCOUNT_DATA'],
        }),
    }),
});

export const {
    useLazyGetAccountDataQuery,
    useCreateAccountDataMutation,
    useUpdateAccountMutation,
} = accountApi;
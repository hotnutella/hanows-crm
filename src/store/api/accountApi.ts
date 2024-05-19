import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

interface AccountData {
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
        getAccountData: builder.query<AccountData, void>({
            query: () => 'account_data',
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
    useGetAccountDataQuery,
    useCreateAccountDataMutation,
    useUpdateAccountMutation,
} = accountApi;
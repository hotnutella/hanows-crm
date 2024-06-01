import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/api/baseQuery';

export interface Bank {
    id: string;
    name: string;
    swift: string;
    country_id: string;
}

export const banksApi = createApi({
    reducerPath: 'banksApi',
    baseQuery: baseQuery,
    tagTypes: ['BANKS'],
    endpoints: (builder) => ({
        getBanks: builder.query<Bank[], string>({
            query: (accessToken) => ({
                url: 'banks',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
            providesTags: ['BANKS']
        }),
    }),
});

export const { 
    useGetBanksQuery,
    useLazyGetBanksQuery 
} = banksApi;
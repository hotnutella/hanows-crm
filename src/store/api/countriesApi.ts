import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/api/baseQuery';

export interface Country {
    id: string;
    name: string;
}

export const countriesApi = createApi({
    reducerPath: 'countriesApi',
    baseQuery: baseQuery,
    tagTypes: ['COUNTRIES'],
    endpoints: (builder) => ({
        getCountries: builder.query<Country[], string>({
            query: (accessToken) => ({
                url: 'countries',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
            providesTags: ['COUNTRIES']
        }),
    }),
});

export const { useLazyGetCountriesQuery } = countriesApi;
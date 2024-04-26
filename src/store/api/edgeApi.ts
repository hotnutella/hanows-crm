import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Invoice } from './invoicesApi';
import { prepareHeaders } from './baseQuery';

// Define your API endpoint
export const edgeApi = createApi({
    reducerPath: 'edgeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1`,
        prepareHeaders: (headers) => {
            const newHeaders = prepareHeaders(headers);
            newHeaders.delete('Prefer');
            newHeaders.set('Content-Type', 'application/json');
            return newHeaders;
        }
    }),
    endpoints: (builder) => ({
        generatePdf: builder.mutation<void, Invoice>({
            query: (params) => ({
                url: '/generatePdf',
                method: 'POST',
                body: params,
            }),
        }),
    }),
});

// Export the generated hooks
export const { useGeneratePdfMutation } = edgeApi;
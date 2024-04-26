import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Invoice } from './invoicesApi';
import { prepareHeaders } from './baseQuery';
import { InvoiceLine } from './invoiceLinesApi';
import { Client } from './clientsApi';

interface GeneratePdfParams {
    invoice: Invoice;
    invoiceLines: InvoiceLine[];
    client: Client;
}

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
        generatePdf: builder.mutation<void, GeneratePdfParams>({
            query: (params) => ({
                url: '/generatePdf',
                method: 'POST',
                body: params,
            }),
        }),
    }),
});

export const { useGeneratePdfMutation } = edgeApi;
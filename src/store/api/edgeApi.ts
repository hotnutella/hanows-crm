import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Invoice } from './invoicesApi';
import { prepareHeaders } from './baseQuery';
import { InvoiceLine } from './invoiceLinesApi';
import { Client } from './clientsApi';
import { Auth } from './authApi';
import { AccountData } from './accountApi';
import { Bank } from './banksApi';

interface GeneratePdfParams {
    accountData: AccountData;
    invoice: Invoice;
    invoiceLines: InvoiceLine[];
    client: Client;
    bank: Bank;
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
        generatePdf: builder.mutation<void, Auth<GeneratePdfParams>>({
            query: ({ data, accessToken }) => ({
                url: '/generatePdf',
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
        }),
    }),
});

export const { useGeneratePdfMutation } = edgeApi;
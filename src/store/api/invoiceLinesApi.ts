import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { Auth } from './authApi';

export interface InvoiceLine {
    id: number;
    invoice_id: number;
    quantity: number;
    unit_price: number;
    vat: number;
    description: string;
}

// Create the API slice
export const invoiceLinesApi = createApi({
    reducerPath: 'invoiceLinesApi',
    baseQuery: baseQuery,
    tagTypes: ['INVOICE_LINES'],
    endpoints: (builder) => ({
        getInvoiceLines: builder.query<InvoiceLine[], Auth<string>>({
            query: (accessToken) => ({
                url: 'invoice_lines',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
        }),
        getInvoiceLinesByInvoice: builder.query<InvoiceLine[], Auth<number>>({
            query: ({ data, accessToken }) => ({
                url: `invoice_lines?invoice_id=eq.${data}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
            providesTags: ['INVOICE_LINES'],
        }),
        createInvoiceLine: builder.mutation<InvoiceLine, Auth<Partial<InvoiceLine>>>({
            query: ({ data, accessToken }) => ({
                url: 'invoice_lines',
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
            transformResponse: (response: InvoiceLine[]) => {
                if (!response) return {} as InvoiceLine;
                return response[0];
            },
            invalidatesTags: ['INVOICE_LINES'],
        }),
        updateInvoiceLine: builder.mutation<InvoiceLine, Auth<InvoiceLine>>({
            query: ({ data, accessToken }) => ({
                url: `invoice_lines/${data.id}`,
                method: 'PUT',
                body: accessToken,
            }),
            invalidatesTags: ['INVOICE_LINES']
        }),
        deleteInvoiceLine: builder.mutation<void, Auth<number>>({
            query: ({data, accessToken}) => ({
                url: `invoice_lines/${data}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
            invalidatesTags: ['INVOICE_LINES'],
        }),
    }),
});

// Export the generated hooks for each endpoint
export const {
    useGetInvoiceLinesQuery,
    useGetInvoiceLinesByInvoiceQuery,
    useCreateInvoiceLineMutation,
    useUpdateInvoiceLineMutation,
    useDeleteInvoiceLineMutation,
} = invoiceLinesApi;
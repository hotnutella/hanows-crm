import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

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
        getInvoiceLines: builder.query<InvoiceLine[], void>({
            query: () => 'invoice_lines',
        }),
        getInvoiceLinesByInvoice: builder.query<InvoiceLine[], number>({
            query: (invoiceId) => `invoice_lines?invoice_id=eq.${invoiceId}`,
            providesTags: ['INVOICE_LINES'],
        }),
        createInvoiceLine: builder.mutation<InvoiceLine, Partial<InvoiceLine>>({
            query: (invoiceLine) => ({
                url: 'invoice_lines',
                method: 'POST',
                body: invoiceLine,
            }),
            transformResponse: (response: InvoiceLine[]) => {
                if (!response) return {} as InvoiceLine;
                return response[0];
            },
            invalidatesTags: ['INVOICE_LINES'],
        }),
        updateInvoiceLine: builder.mutation<InvoiceLine, Partial<InvoiceLine>>({
            query: (invoiceLine) => ({
                url: `invoice_lines/${invoiceLine.id}`,
                method: 'PUT',
                body: invoiceLine,
            }),
            invalidatesTags: ['INVOICE_LINES']
        }),
        deleteInvoiceLine: builder.mutation<void, number>({
            query: (id) => ({
                url: `invoice_lines/${id}`,
                method: 'DELETE',
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
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../utils/baseQuery';

export const invoicesApi = createApi({
  reducerPath: 'invoicesApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: () => ({ url: 'invoices', method: 'GET' }),
    }),
    getInvoice: builder.query({
      query: (id) => ({ url: `invoices/${id}`, method: 'GET' }),
    }),
    createInvoice: builder.mutation({
      query: (newInvoice) => ({
        url: 'invoices',
        method: 'POST',
        body: newInvoice,
      }),
    }),
    updateInvoice: builder.mutation({
      query: ({ id, ...update }) => ({
        url: `invoices/${id}`,
        method: 'PATCH',
        body: update,
      }),
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `invoices/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { 
  useGetInvoicesQuery,
  useGetInvoiceQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
 } = invoicesApi;
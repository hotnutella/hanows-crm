import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/api/baseQuery';

export interface Invoice {
  id: number;
  client_id: number;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  status: string;
  total_amount: number;
  paid_amount: number;
  created_at: Date;
  updated_at: Date;
  additional_info: JSON;
}

export const invoicesApi = createApi({
  reducerPath: 'invoicesApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getInvoices: builder.query<Invoice[], void>({
      query: () => ({ url: 'invoices', method: 'GET' }),
    }),
    getInvoicesByClient: builder.query<Invoice[], number>({
      query: (clientId) => ({ url: `invoices?client_id=eq.${clientId}`, method: 'GET' }),
    }),
    getInvoice: builder.query({
      query: (id) => ({ url: `invoices/${id}`, method: 'GET' }),
    }),
    createInvoice: builder.mutation<Invoice, Partial<Invoice>>({
      query: (newInvoice) => ({
        url: 'invoices',
        method: 'POST',
        body: newInvoice,
      }),
    }),
    updateInvoice: builder.mutation<Invoice, Partial<Invoice>>({
      query: ({ id, ...update }) => ({
        url: `invoices/${id}`,
        method: 'PATCH',
        body: update,
      }),
    }),
    deleteInvoice: builder.mutation<void, number>({
      query: (id) => ({
        url: `invoices/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { 
  useGetInvoicesQuery,
  useGetInvoicesByClientQuery,
  useGetInvoiceQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
 } = invoicesApi;
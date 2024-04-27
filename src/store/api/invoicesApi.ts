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
  additional_info: {
    pdf_url: string;
  };
}

export const invoicesApi = createApi({
  reducerPath: 'invoicesApi',
  baseQuery: baseQuery,
  tagTypes: ['INVOICES'],
  endpoints: (builder) => ({
    getInvoices: builder.query<Invoice[], void>({
      query: () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const startDate = `${currentYear}-${currentMonth}-01`;
        const endDate = `${currentYear}-${currentMonth + 1}-01`;
        return `invoices?issue_date=gte.${startDate}&issue_date=lt.${endDate}`;
      },
    }),
    getInvoicesByClient: builder.query<Invoice[], number>({
      query: (clientId) => `invoices?client_id=eq.${clientId}`,
      transformResponse: (response: Invoice[]) => {
        return response.sort((a, b) => a.invoice_number.localeCompare(b.invoice_number));
      },
      providesTags: ['INVOICES']
    }),
    getInvoice: builder.query<Invoice, number>({
      query: (id) => `invoices?id=eq.${id}`,
      transformResponse: (response: Invoice[]) => {
        if (!response) return {} as Invoice;
        return response[0];
      }
    }),
    createInvoice: builder.mutation<Invoice, Partial<Invoice>>({
      query: (newInvoice) => ({
        url: 'invoices',
        method: 'POST',
        body: newInvoice,
      }),
      transformResponse: (response: Invoice[]) => {
        if (!response) return {} as Invoice;
        return response[0];
      },
      invalidatesTags: ['INVOICES']
    }),
    updateInvoice: builder.mutation<Invoice, Partial<Invoice>>({
      query: ({ id, ...update }) => ({
        url: `invoices?id=eq.${id}`,
        method: 'PATCH',
        body: update,
      }),
      invalidatesTags: ['INVOICES']
    }),
    deleteInvoice: builder.mutation<void, number>({
      query: (id) => ({
        url: `invoices?id=eq.${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['INVOICES']
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
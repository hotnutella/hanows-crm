import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/api/baseQuery';
import { Auth } from './authApi';

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
    getInvoices: builder.query<Invoice[], string>({
      query: (accessToken) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const startDate = `${currentYear}-${currentMonth}-01`;
        const endDate = `${currentYear}-${currentMonth + 1}-01`;
        return {
          url: `invoices?issue_date=gte.${startDate}&issue_date=lte.${endDate}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      },
      providesTags: ['INVOICES']
    }),
    getInvoicesByClient: builder.query<Invoice[], Auth<number>>({
      query: ({data, accessToken }) => ({
        url: `invoices?client_id=eq.${data}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      transformResponse: (response: Invoice[]) => {
        return response.sort((a, b) => a.invoice_number.localeCompare(b.invoice_number));
      },
      providesTags: ['INVOICES']
    }),
    getInvoice: builder.query<Invoice, Auth<number>>({
      query: ({ data, accessToken }) => ({
        url: `invoices?id=eq.${data}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      transformResponse: (response: Invoice[]) => {
        if (!response) return {} as Invoice;
        return response[0];
      }
    }),
    createInvoice: builder.mutation<Invoice, Auth<Partial<Invoice>>>({
      query: ({ data, accessToken }) => ({
        url: 'invoices',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      transformResponse: (response: Invoice[]) => {
        if (!response) return {} as Invoice;
        return response[0];
      },
      invalidatesTags: ['INVOICES']
    }),
    updateInvoice: builder.mutation<Invoice, Auth<Invoice>>({
      query: ({ data: { id, ...update }, accessToken }) => ({
        url: `invoices?id=eq.${id}`,
        method: 'PATCH',
        body: update,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ['INVOICES']
    }),
    deleteInvoice: builder.mutation<void, Auth<number>>({
      query: ({ data, accessToken }) => ({
        url: `invoices?id=eq.${data}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
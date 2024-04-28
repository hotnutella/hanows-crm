import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/api/baseQuery';

interface Address {
  line1: string;
  line2: string;
  country: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  address: Address;
  phone: string;
  created_at: Date;
  reg_number: string;
  vat_number: string;
  last_interaction: Date;
  additional_info: JSON;
}

export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  baseQuery: baseQuery,
  tagTypes: ['CLIENTS'],
  endpoints: (builder) => ({
    getClients: builder.query<Client[], void>({
      query: () => 'clients',
      transformResponse: (response: Client[]) => {
        return response.sort((a, b) => new Date(b.last_interaction).getTime() - new Date(a.last_interaction).getTime());
      },
      providesTags: ['CLIENTS'],
    }),
    getClient: builder.query<Client, string>({
      query: (id) => `clients?id=eq.${id}`,
      transformResponse: (response: Client[]) => {
        if (!response) return {} as Client;
        return response[0];
      },
      providesTags: ['CLIENTS'],
    }),
    createClient: builder.mutation<Client, Client>({
      query: (newClient) => ({
        url: 'clients',
        method: 'POST',
        body: newClient,
      }),
      transformResponse: (response: Client[]) => {
        if (!response) return {} as Client;
        return response[0];
      },
      invalidatesTags: ['CLIENTS'],
    }),
    updateClient: builder.mutation({
      query: ({ id, ...update }) => ({
        url: `clients?id=eq.${id}`,
        method: 'PATCH',
        body: update,
      }),
      invalidatesTags: ['CLIENTS'],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `clients?id=eq.${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CLIENTS'],
    }),
    bump: builder.mutation<void, Client>({
      query: ({ id, ...update }) => ({
        url: `clients?id=eq.${id}`,
        method: 'PATCH',
        body: {
          ...update,
          last_interaction: 'now()',
        },
      }),
      invalidatesTags: ['CLIENTS'],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientQuery,
  useLazyGetClientQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useBumpMutation,
} = clientsApi;

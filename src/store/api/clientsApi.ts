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
  additional_info: JSON;
}

export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  baseQuery: baseQuery,
  tagTypes: ['CLIENTS'],
  endpoints: (builder) => ({
    getClients: builder.query<Client[], void>({
      query: () => 'clients',
    }),
    getClient: builder.query<Client, string>({
      query: (id) => `clients?id=eq.${id}`,
      transformResponse: (response: Client[]) => {
        if (!response) return {} as Client;
        return response[0];
      },
      providesTags: ['CLIENTS'],
    }),
    createClient: builder.mutation({
      query: (newClient) => ({
        url: 'clients',
        method: 'POST',
        body: newClient,
      }),
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
  }),
});

export const { 
  useGetClientsQuery,
  useGetClientQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
 } = clientsApi;

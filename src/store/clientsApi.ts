import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/utils/baseQuery';

export interface Client {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  additional_info: JSON;
}

export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getClients: builder.query<Client[], void>({
      query: () => ({ url: 'clients', method: 'GET' }),
    }),
    getClient: builder.query<Client, string>({
      query: (id) => ({ url: `clients?id=eq.${id}`, method: 'GET' }),
      transformResponse: (response: Client[]) => {
        if (!response) return {} as Client;
        return response[0];
      },
    }),
    createClient: builder.mutation({
      query: (newClient) => ({
        url: 'clients',
        method: 'POST',
        body: newClient,
      }),
    }),
    updateClient: builder.mutation({
      query: ({ id, ...update }) => ({
        url: `clients/${id}`,
        method: 'PATCH',
        body: update,
      }),
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `clients/${id}`,
        method: 'DELETE',
      }),
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

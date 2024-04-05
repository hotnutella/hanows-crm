// features/clients/clientsApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../utils/baseQuery';

// Define the api slice
export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => ({ url: 'clients', method: 'GET' }),
    }),
    getClient: builder.query({
      query: (id) => ({ url: `clients/${id}`, method: 'GET' }),
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

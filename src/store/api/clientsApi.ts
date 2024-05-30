import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/api/baseQuery';
import { Auth } from '@/store/api/authApi';

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
    getClients: builder.query<Client[], string>({
      query: (accessToken) => ({
        url: 'clients',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      transformResponse: (response: Client[]) => {
        return response.sort((a, b) => new Date(b.last_interaction).getTime() - new Date(a.last_interaction).getTime());
      },
      providesTags: ['CLIENTS'],
    }),
    getClient: builder.query<Client, Auth<string>>({
      query: ({ data, accessToken }) => ({
        url: `clients?id=eq.${data}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      transformResponse: (response: Client[]) => {
        if (!response) return {} as Client;
        return response[0];
      },
      providesTags: ['CLIENTS'],
    }),
    createClient: builder.mutation<Client, Auth<Client>>({
      query: ({ data, accessToken }) => ({
        url: 'clients',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      transformResponse: (response: Client[]) => {
        if (!response) return {} as Client;
        return response[0];
      },
      invalidatesTags: ['CLIENTS'],
    }),
    updateClient: builder.mutation<Client, Auth<Client>>({
      query: ({data: { id, ...update }, accessToken}) => ({
        url: `clients?id=eq.${id}`,
        method: 'PATCH',
        body: update,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      transformResponse: (response: Client[]) => {
        if (!response) return {} as Client;
        return response[0];
      },
      invalidatesTags: ['CLIENTS'],
    }),
    deleteClient: builder.mutation<void, Auth<string>>({
      query: ({ data, accessToken }) => ({
        url: `clients?id=eq.${data}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ['CLIENTS'],
    }),
    bump: builder.mutation<void, Auth<Client>>({
      query: ({ data: { id, ...update }, accessToken }) => ({
        url: `clients?id=eq.${id}`,
        method: 'PATCH',
        body: {
          ...update,
          last_interaction: 'now()',
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

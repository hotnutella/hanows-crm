// features/clients/clientsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Initialize an empty header and populate it with the Supabase key as needed
const supabaseHeaders = {
  'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`,
};

// Define a base query to handle the Supabase headers
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1`,
  prepareHeaders: (headers) => {
    headers.set('apikey', supabaseHeaders.apikey);
    headers.set('Authorization', supabaseHeaders.Authorization);
    return headers;
  },
});

// Define the api slice
export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => ({ url: 'clients', method: 'GET' }),
    }),
  }),
});

export const { useGetClientsQuery } = clientsApi;

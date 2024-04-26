import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Initialize an empty header and populate it with the Supabase key as needed
const supabaseHeaders = {
    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`,
};

export const prepareHeaders = (headers: Headers) => {
    headers.set('apikey', supabaseHeaders.apikey);
    headers.set('Authorization', supabaseHeaders.Authorization);
    headers.set('Prefer', 'return=representation');
    return headers;
}

// Define a base query to handle the Supabase headers
export const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1`,
    prepareHeaders,
});
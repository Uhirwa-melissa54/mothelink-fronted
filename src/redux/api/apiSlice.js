import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl:"http://localhost:8080",
  // Do not include credentials by default to avoid CORS preflight issues
  // If your backend requires cookies/auth credentials, change this and
  // configure the server to return a specific origin instead of '*'.

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access_token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    
  }),
});

export const {

} = apiSlice;
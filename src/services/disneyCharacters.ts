// This file creates an API service using @reduxjs/toolkit/query/react to fetch Disney characters.
// It defines the query parameters and transforms the API response to ensure the data is always an array.

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { DisneyCharacterApiResponse } from './types'

export interface QueryParameters {
  page: number
  pageSize: number,
  name?: string,
  films?: string,
}

export const disneyCharactersApi = createApi({
  reducerPath: 'disneyCharactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.disneyapi.dev' }),
  endpoints: (builder) => ({
    getDisneyCharacters: builder.query<DisneyCharacterApiResponse, QueryParameters>({
      query: (queryParameters) => {
        return ({
          url: `character`,
          method: 'GET',
          params: queryParameters
        })
      },
      transformResponse: (response: DisneyCharacterApiResponse):DisneyCharacterApiResponse => {
        const { data } = response;

        if (Array.isArray(data) || !data) {
          return response;
        }

        return {
          ...response,
          data: [data],
        };

      },
    }),

  }),
})

export const { useGetDisneyCharactersQuery } = disneyCharactersApi

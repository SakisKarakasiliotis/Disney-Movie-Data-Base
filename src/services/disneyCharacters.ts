import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { DisneyCharacterApiResponse } from './types'

export interface QueryParameters {
  page: number
  pageSize: number,
  name?: string
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
    }),
  }),
})

export const { useGetDisneyCharactersQuery } = disneyCharactersApi

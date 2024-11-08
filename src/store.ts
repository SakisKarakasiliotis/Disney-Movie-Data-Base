import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { disneyCharactersApi } from './services/disneyCharacters'

const {reducerPath, reducer, middleware} = disneyCharactersApi

export const store = configureStore({
  reducer: {
    [reducerPath]: reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
})

setupListeners(store.dispatch)

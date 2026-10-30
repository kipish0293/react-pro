import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type LoginRequest, type LoginResponse, type RegisterRequest, type UserResponse } from '../types'

const JWT_LS_KEY = 'JWT'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.v2.react-learning.ru',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(JWT_LS_KEY)

            if (token) {
                headers.set('authorization', token.startsWith('Bearer') ? token : `Bearer ${token}`)
            }

            return headers
        },
    }),
    endpoints: (build) => ({
        login: build.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({ body, method: 'POST', url: '/auth/login' }),
        }),
        register: build.mutation<LoginResponse, RegisterRequest>({
            query: (body) => ({ body, method: 'POST', url: '/auth/register' }),
        }),
        logout: build.mutation<void, void>({
            query: () => ({ method: 'GET', url: '/auth/logout' }),
        }),
        getMe: build.query<UserResponse, void>({
            query: () => ({ method: 'GET', url: '/users/me' }),
        }),
    }),
})

export const { useGetMeQuery, useLoginMutation, useLogoutMutation, useRegisterMutation } = authApi

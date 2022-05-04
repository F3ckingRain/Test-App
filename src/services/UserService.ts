import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist//query/react'
import { build } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle'
import { IUser } from '../models/IUser'


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
    tagTypes: ['User'],
    endpoints: (build) => ({
        fetchAllUsers: build.query<IUser[], number>({
            query: (limit: number = 10) => ({
                url: '/posts',
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ['User']
        }),
        createUser: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: `/posts`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        updateUser: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: `/posts/${user.id}`,
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: `/posts/${user.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        }),
    })
})
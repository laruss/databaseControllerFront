import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {AllObjectsResponseType, ModelsResponseType, OneObjectResponseType, SchemeResponseType} from "../../types/api";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: '/api'}),
    tagTypes: ['Models', 'Scheme', 'Objects', 'OneObject'],
    endpoints: (builder) => ({
        getModels: builder.query<ModelsResponseType, void>({
            query: () => '/models',
            providesTags: ['Models'],
        }),
        getSchemes: builder.query<SchemeResponseType, { modelName: string }>({
            query: ({ modelName }) => `/${modelName}/scheme`,
            providesTags: ['Scheme'],
        }),
        getAllObjects: builder.query<AllObjectsResponseType, { modelName: string }>({
            query: ({ modelName }) => `/${modelName}`,
            providesTags: ['Objects']
        }),
        getOneObject: builder.query<OneObjectResponseType, { modelName: string, id: string }>({
            query: ({ modelName, id }) => `/${modelName}/${id}`,
            providesTags: ['OneObject'],
        }),
        updateObject: builder.mutation<OneObjectResponseType, { modelName: string, id: string, data: OneObjectResponseType }>({
            query: ({ modelName, id, data }) => ({
                url: `/${modelName}/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['OneObject', 'Objects'],
        }),
        createObject: builder.mutation<OneObjectResponseType, { modelName: string, data: OneObjectResponseType }>({
            query: ({ modelName, data }) => ({
                url: `/${modelName}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['OneObject', 'Objects'],
        }),
        deleteObject: builder.mutation<OneObjectResponseType, { modelName: string, id: string }>({
            query: ({ modelName, id }) => ({
                url: `/${modelName}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Objects'],
        }),
    }),
});
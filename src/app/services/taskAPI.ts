import { Task } from "../types";
import { api } from "./api";

export const taskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAll: builder.query<Task[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Tasks"]
    }),
    update: builder.mutation<void, Task>({
      query: (taskData) => ({
        url: "/",
        method: "PATCH",
        body: taskData,
      }),
      invalidatesTags: ["Tasks"],
    }),
    create: builder.mutation<void, Task>({
      query: (taskData) => ({
        url: "/",
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["Tasks"],
    }),
    delete: builder.mutation<void, Task>({
      query: (taskData) => ({
        url: "/",
        method: "DELETE",
        body: taskData,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});


export const {
  useGetAllQuery,
  useUpdateMutation,
  useCreateMutation,
  useDeleteMutation
} = taskApi;

export const {
  endpoints: { getAll, update, create, delete: deleteTask }
} = taskApi;
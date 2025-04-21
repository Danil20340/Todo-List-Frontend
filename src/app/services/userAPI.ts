import { User } from "../types";
import { api } from "./api";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<User, void>({
            query: () => ({
                url: "/me",
                method: "GET",
            }),
        }),
        getSubordinates: builder.query<User[], void>({
            query: () => ({
                url: "/subordinates",
                method: "GET",
            }),
        }),
    })
});

export const {
    useLazyGetCurrentUserQuery,
    useGetSubordinatesQuery
} = userApi;

export const {
    endpoints: { getCurrentUser }
} = userApi;
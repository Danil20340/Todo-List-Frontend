import { api } from "./api";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<{ token: string }, { login: string; password: string }>({
            query: (authData) => ({
                url: "/login",
                method: "POST",
                body: authData,
            }),
        })
    })
});

export const {
    useLoginMutation
} = authApi;

export const {
    endpoints: { login }
} = authApi;
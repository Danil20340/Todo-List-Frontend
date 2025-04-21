import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";
import { RootState } from "../store";

// Базовый запрос с добавлением токена
const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).auth.token || localStorage.getItem("token")

    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  },
})

// Добавляем повторные попытки
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

// Создание API
export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry, 
  refetchOnMountOrArgChange: true,
  tagTypes: ["Tasks"],
  endpoints: () => ({}),
});
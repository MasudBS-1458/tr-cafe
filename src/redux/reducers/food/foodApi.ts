// src/redux/api/foodApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Food, FoodFilter } from '../../../types/foodTypes';

export const foodApi = createApi({
  reducerPath: 'foodApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://tr-cafe.onrender.com/api' }),
  endpoints: (builder) => ({
    getFoods: builder.query<Food[], FoodFilter>({
      query: (filters) => {
        const query = new URLSearchParams();
        if (filters.category) query.append('category', filters.category);
        if (filters.minPrice) query.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) query.append('maxPrice', filters.maxPrice.toString());
        if (filters.sortBy) query.append('sortBy', filters.sortBy);

        return `foods?${query.toString()}`;
      },
    }),
  }),
});

export const { useGetFoodsQuery } = foodApi;
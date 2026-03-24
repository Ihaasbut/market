import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductCardProps } from "@/entities/products/ui/ProductCard";
import type {
    ProductCategoriesProps,
    ProductCategoryProps,
} from "@/entities/products/ui/ProductCategories";

import type { ProductListProps } from "@/entities/products/ui/ProductList";

export type ProductsResponse = {
    products: ProductCardProps[];
};

type CategoriesResponse = ProductCategoryProps[];

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com",
    }),
    keepUnusedDataFor: 300, 
    refetchOnFocus: false,
    refetchOnReconnect: false,
    endpoints: (builder) => ({
        getPopularProducts: builder.query<ProductListProps, void>({
            query: () => "/products?limit=12&order=desc&sortBy=rating",
            transformResponse: (
                response: ProductsResponse,
            ): ProductListProps => ({
                products: response.products.map((product) => ({
                    availabilityStatus: product.availabilityStatus,
                    title: product.title,
                    price: product.price,
                    discountPercentage: product.discountPercentage,
                    rating: product.rating,
                    images: product.images,
                    id: product.id,
                    category: product.category,
                    description: product.description,
                })),
            }),
        }),

        getCategories: builder.query<ProductCategoriesProps, void>({
            query: () => "/products/categories",
            transformResponse: (
                response: CategoriesResponse,
            ): ProductCategoriesProps => ({
                categories: response.slice(0, 4),
                isHome: true,
            }),
        }),
    }),
});

export const { useGetPopularProductsQuery, useGetCategoriesQuery } = api;

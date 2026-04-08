import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductCardProps } from "@/entities/products/ProductCard";
import type {
    ProductCategoriesProps,
    ProductCategoryProps,
} from "@/entities/products/ProductCategories";

import type { ProductListProps } from "@/entities/products/ProductList";

export type ProductsResponse = {
    products: ProductCardProps[];
};

type CategoriesResponse = ProductCategoryProps[];
type FilterResponse = {
    brands: [{ id: number; brand: string }];
};

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
                    brand: product.brand,
                    sku: product.sku
                })),
            }),
        }),

        getProductsAll: builder.query<ProductListProps, void>({
            query: () => "https://dummyjson.com/products?limit=0",
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
                    brand: product.brand,
                    reviews: product.reviews,
                    sku: product.sku
                })),
            }),
        }),

        getBrands: builder.query<FilterResponse, void>({
            query: () => "https://dummyjson.com/c/b66a-5f5c-4e1e-ae07",
        }),

        // getCategoriesHome: builder.query<ProductCategoriesProps, void>({
        //     query: () => "/products/categories",
        //     transformResponse: (
        //         response: CategoriesResponse,
        //     ): ProductCategoriesProps => ({
        //         categories: response.slice(0, 4),
        //         isFull: true,
        //     }),
        // }),
        // getCategoriesHeader: builder.query<ProductCategoriesProps, void>({
        //     query: () => "/products/categories",
        //     transformResponse: (
        //         response: CategoriesResponse,
        //     ): ProductCategoriesProps => ({
        //         categories: response.slice(0, 7),
        //         isFull: false,
        //     }),
        // }),
        getCategories: builder.query<
            ProductCategoriesProps,
            { isFull: boolean }
        >({
            query: () => "/products/categories",
            transformResponse: (
                response: CategoriesResponse,
                _meta: unknown,
                arg: { isFull: boolean },
            ): ProductCategoriesProps => ({
                categories: response,
                isFull: arg.isFull,
            }),
        }),
    }),
});

export const {
    useGetPopularProductsQuery,
    useGetCategoriesQuery,
    useGetProductsAllQuery,
    useGetBrandsQuery,
} = api;

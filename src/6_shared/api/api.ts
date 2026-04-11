import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
    ProductResponseFull,
    ProductsResponseFull,
} from "./api-response.types";
import type {
    CategoriesResponse,
    ProductListCategoryResponse,
    ProductList,
    ProductListHomeHero,
    ProductDetail,
} from "./api.types";

/** Seconds RTK Query keeps endpoint data after the last subscriber unmounts. Full page reload clears Redux (and this cache) unless you add persistence. */
const KEEP_UNUSED_DATA_FOR_SEC = 60 * 60;

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com",
    }),
    keepUnusedDataFor: KEEP_UNUSED_DATA_FOR_SEC,
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
    endpoints: (builder) => ({
        getProductsHomeHero: builder.query<ProductListHomeHero, void>({
            query: () => "/products?limit=3&order=desc&sortBy=price",
            transformResponse: (
                response: ProductsResponseFull,
            ): ProductListHomeHero => ({
                products: response.products.map((product) => ({
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    discountPercentage: product.discountPercentage,
                    images: product.images,
                })),
            }),
        }),

        getPopularProducts: builder.query<ProductList, void>({
            query: () => "/products?limit=12&order=desc&sortBy=rating",
            transformResponse: (
                response: ProductsResponseFull,
            ): ProductList => ({
                products: response.products.map((product) => ({
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    discountPercentage: product.discountPercentage,
                    images: product.images,
                    availabilityStatus: product.availabilityStatus,
                    rating: product.rating,
                    category: product.category,
                })),
            }),
        }),

        getProductsCategory: builder.query<
            ProductListCategoryResponse,
            string | undefined
        >({
            query: (slug) => `/products/category/${slug}`,
            transformResponse: (
                response: ProductsResponseFull,
            ): ProductListCategoryResponse => ({
                products: response.products.map((product) => ({
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    discountPercentage: product.discountPercentage,
                    images: product.images,
                    availabilityStatus: product.availabilityStatus,
                    rating: product.rating,
                    category: product.category,
                    brand: product.brand,
                })),
            }),
        }),

        getProductDetail: builder.query<ProductDetail, number>({
            query: (id) => `/products/${id}`,
            transformResponse: (
                product: ProductResponseFull,
            ): ProductDetail => ({
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                discountPercentage: product.discountPercentage,
                images: product.images,
                availabilityStatus: product.availabilityStatus,
                rating: product.rating,
                category: product.category,
                brand: product.brand,
                sku: product.sku,
                reviews: product.reviews,
            }),
        }),

        getCategories: builder.query<CategoriesResponse, void>({
            query: () => "/products/categories",
        }),
    }),
});

export const {
    useGetPopularProductsQuery,
    useGetCategoriesQuery,
    useGetProductsCategoryQuery,
    useGetProductsHomeHeroQuery,
    useGetProductDetailQuery,
} = api;

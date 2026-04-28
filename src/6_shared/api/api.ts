import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
    ProductResponseFull,
    ProductsResponseFull,
} from "./api-response.types";
import type {
    CategoriesResponseType,
    ProductListCategoryResponseType,
    ProductListType,
    ProductListHomeHeroType,
    ProductDetailType,
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
        getProductsHomeHero: builder.query<ProductListHomeHeroType, void>({
            query: () => "/products?limit=3&order=desc&sortBy=price",
            transformResponse: (
                response: ProductsResponseFull,
            ): ProductListHomeHeroType => ({
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

        getPopularProducts: builder.query<ProductListType, void>({
            query: () => "/products?limit=12&order=desc&sortBy=rating",
            transformResponse: (
                response: ProductsResponseFull,
            ): ProductListType => ({
                products: response.products.map((product) => ({
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    discountPercentage: product.discountPercentage,
                    images: product.images,
                    availabilityStatus: product.availabilityStatus,
                    rating: product.rating,
                })),
            }),
        }),

        getProductsByIds: builder.query<ProductListType, number[]>({
            async queryFn(ids, _api, _extraOptions, fetchWithBQ) {
                const results = await Promise.all(
                    [...new Set(ids)].map((id) =>
                        fetchWithBQ(`/products/${id}`),
                    ),
                );

                return {
                    data: {
                        products: results
                            .map((result) => result.data as ProductResponseFull)
                            .filter(Boolean)
                            .map((product) => ({
                                id: product.id,
                                title: product.title,
                                description: product.description,
                                price: product.price,
                                discountPercentage: product.discountPercentage,
                                images: product.images,
                                availabilityStatus: product.availabilityStatus,
                                rating: product.rating,
                            })),
                    },
                };
            },
        }),

        getProductsCategory: builder.query<
            ProductListCategoryResponseType,
            string | undefined
        >({
            query: (slug) => `/products/category/${slug}`,
            transformResponse: (
                response: ProductsResponseFull,
            ): ProductListCategoryResponseType => ({
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
                    tags: product.tags ?? [],
                })),
            }),
        }),

        getProductDetail: builder.query<ProductDetailType, number>({
            query: (id) => `/products/${id}`,
            transformResponse: (
                product: ProductResponseFull,
            ): ProductDetailType => ({
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
                tags: product.tags ?? [],
                sku: product.sku,
                reviews: product.reviews,
                dimensions: product.dimensions,
                weight: product.weight,
                warrantyInformation: product.warrantyInformation,
                shippingInformation: product.shippingInformation,
                returnPolicy: product.returnPolicy,
                minimumOrderQuantity: product.minimumOrderQuantity,
            }),
        }),

        getCategories: builder.query<CategoriesResponseType, void>({
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
    useGetProductsByIdsQuery,
} = api;

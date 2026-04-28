import type { ProductDimensions, ProductReview } from "./api-response.types";

export type ProductHomeHeroType = {
    title: string;
    price: number;
    discountPercentage: number;
    images: string[];
    id: number;
    description: string;
};

export type ProductListHomeHeroType = {
    products: ProductHomeHeroType[];
};

export type ProductCardType = {
    id: number;
    title: string;
    description: string;
    availabilityStatus: string;
    price: number;
    discountPercentage: number;
    rating?: number;
    images: string[];
};

export type ProductListType = {
    products: ProductCardType[];
};

export type ProductCardCategoryType = ProductCardType & {
    category: string;
    brand: string;
    tags: string[];
};

export type ProductListCategoryResponseType = {
    products: ProductCardCategoryType[];
};

export type ProductDetailType = {
    availabilityStatus: string;
    title: string;
    price: number;
    discountPercentage: number;
    rating?: number;
    images: string[];
    id: number;
    category: string;
    description?: string;
    brand?: string;
    tags: string[];
    reviews?: ProductReview[];
    sku?: string;
    dimensions?: ProductDimensions;
    weight?: number;
    warrantyInformation?: string;
    shippingInformation?: string;
    returnPolicy?: string;
    minimumOrderQuantity?: number;
};

export type ProductsDetailType = {
    products: ProductDetailType[];
};

export type ProductCategoryType = {
    images: string[];
    slug: string;
    name: string;
    url: string;
};

export type CategoriesResponseType = ProductCategoryType[];

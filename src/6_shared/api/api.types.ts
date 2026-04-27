import type { ProductCategoryProps } from "@/entities/products/ProductCategories";
import type { ProductDimensions, ProductReview } from "./api-response.types";

export type ProductHomeHero = {
    title: string;
    price: number;
    discountPercentage: number;
    images: string[];
    id: number;
    description: string;
};

export type ProductListHomeHero = {
    products: ProductHomeHero[];
};

export type ProductCard = {
    id: number;
    title: string;
    description: string;
    availabilityStatus: string;
    price: number;
    discountPercentage: number;
    rating?: number;
    images: string[];
};

export type ProductList = {
    products: ProductCard[];
};

export type ProductCardCategory = ProductCard & {
    category: string;
    brand: string;
    tags: string[];
};

export type ProductListCategoryResponse = {
    products: ProductCardCategory[];
};

export type ProductDetail = {
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

export type ProductsDetail = {
    products: ProductDetail[];
};

export type CategoriesResponse = ProductCategoryProps[];

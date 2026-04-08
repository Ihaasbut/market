import { useMemo } from "react";
import type { ProductCardProps } from "@/entities/products/ProductCard";

export type FilterItem = {
    id: number;
    brand: string;
};

export type FilterList = {
    brands: FilterItem[];
};

export type FilterProductsProps = {
    products: ProductCardProps[];
    selectedBrands: string[];
    onToggleBrand: (brand: string) => void;
    inStock: boolean;
    onToggleInStock: () => void;
    onResetFilters: () => void;
};

// только логика вычисления брендов
export function useFilterBrands(products: ProductCardProps[]): string[] {
    return useMemo(() => {
        const result: string[] = [];

        products.forEach((product) => {
            if (product.brand && !result.includes(product.brand)) {
                result.push(product.brand);
            }
        });

        return result;
    }, [products]);
}

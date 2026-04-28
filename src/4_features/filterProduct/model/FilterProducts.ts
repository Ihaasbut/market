import { useMemo } from "react";
import type { ProductCardCategoryType } from "@/shared/api/api.types";

export type FilterCheckboxOption = {
    key: string;
    label: string;
    checked: boolean;
    onChange: () => void;
};

export type FilterPriceRangeConfig = {
    min: number;
    max: number;
    valueMin: number;
    valueMax: number;
    onValueMinChange: (value: number) => void;
    onValueMaxChange: (value: number) => void;
};

export type FilterSection = {
    id: string;
    title: string;
    titleCount?: number;
    variant?: "checkbox" | "tags" | "priceRange";
    options: FilterCheckboxOption[];
    priceRange?: FilterPriceRangeConfig;
};

export type FilterProductsProps = {
    sections: FilterSection[];
    onResetFilters: () => void;
};

export function useFilterBrands(products: ProductCardCategoryType[]): string[] {
    return useMemo(() => {
        const uniqueBrands: string[] = [];
        products.forEach((product) => {
            const brand = product.brand;
            if (brand && !uniqueBrands.includes(brand)) {
                uniqueBrands.push(brand);
            }
        });
        return uniqueBrands;
    }, [products]);
}

export function usePriceBounds(products: ProductCardCategoryType[]): {
    min: number;
    max: number;
} {
    return useMemo(() => {
        if (products.length === 0) {
            return { min: 0, max: 0 };
        }
        let min = products[0]!.price;
        let max = products[0]!.price;
        for (let i = 1; i < products.length; i++) {
            const p = products[i]!.price;
            if (p < min) min = p;
            if (p > max) max = p;
        }
        return { min: Math.floor(min), max: Math.ceil(max) };
    }, [products]);
}

export function useFilterTags(products: ProductCardCategoryType[]): string[] {
    return useMemo(() => {
        const uniqueTags: string[] = [];
        products.forEach((product) => {
            (product.tags ?? []).forEach((tag) => {
                if (tag && !uniqueTags.includes(tag)) {
                    uniqueTags.push(tag);
                }
            });
        });
        return uniqueTags.sort((tagA, tagB) =>
            tagA.localeCompare(tagB),
        );
    }, [products]);
}

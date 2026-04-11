import { useMemo } from "react";
import type { ProductCardCategory } from "@/shared/api/api.types";


export type FilterCheckboxOption = {
    key: string;
    label: string;
    checked: boolean;
    onChange: () => void;
};

export type FilterSection = {
    id: string;
    title: string;
    titleCount?: number;
    options: FilterCheckboxOption[];
};

export type FilterProductsProps = {
    sections: FilterSection[];
    onResetFilters: () => void;
};

export function useFilterBrands(
    products: ProductCardCategory[],
): string[] {
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

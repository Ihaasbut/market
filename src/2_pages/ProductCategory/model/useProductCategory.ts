import { useCallback, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useFilterBrands, type FilterSection } from "@/features/filterProduct";
import { useGetProductsCategoryQuery } from "@/shared/api/api";
import type { ProductCardCategory } from "@/shared/api/api.types";
import type { SelectOption } from "@/shared/ui/Select";

type ProductRouteParams = {
    slug: string;
};

const sortOptions: SelectOption[] = [
    { id: 1, name: "Rating" },
    { id: 2, name: "Price" },
];

const defaultSortOption = sortOptions[0]!.name;

const EMPTY_CATEGORY_PRODUCTS: ProductCardCategory[] = [];

export function useProductCategory() {
    const { slug } = useParams<ProductRouteParams>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeOption, setActiveOption] = useState(defaultSortOption);

    const {
        data: products,
        isLoading: productsLoading,
        isSuccess: productsReady,
    } = useGetProductsCategoryQuery(slug, { skip: !slug });

    const urlBrands = useMemo(
        () => searchParams.getAll("brand"),
        [searchParams],
    );
    const inStock = searchParams.get("inStock") === "1";

    const categoryProducts = products?.products ?? EMPTY_CATEGORY_PRODUCTS;

    const sortedProducts = useMemo(() => {
        const filtered = categoryProducts.filter((product) => {
            if (urlBrands.length > 0) {
                if (!product.brand || !urlBrands.includes(product.brand)) {
                    return false;
                }
            }

            if (inStock && product.availabilityStatus !== "In Stock") {
                return false;
            }

            return true;
        });

        return [...filtered].sort((a, b) => {
            switch (activeOption) {
                case "Rating":
                    return (b.rating ?? 0) - (a.rating ?? 0);
                case "Price":
                    return a.price - b.price;
                default:
                    return 0;
            }
        });
    }, [categoryProducts, urlBrands, inStock, activeOption]);

    const handleToggleBrand = useCallback(
        (brand: string) => {
            setSearchParams(
                (params) => {
                    const current = params.getAll("brand");

                    const exists = current.includes(brand);

                    const next = exists
                        ? current.filter((b) => b !== brand)
                        : [...current, brand];

                    params.delete("brand");
                    next.forEach((b) => params.append("brand", b));

                    return params;
                },
                { replace: true },
            );
        },
        [setSearchParams],
    );

    const handleToggleInStock = useCallback(() => {
        setSearchParams(
            (params) => {
                const current = params.get("inStock") === "1";

                if (current) {
                    params.delete("inStock");
                } else {
                    params.set("inStock", "1");
                }

                return params;
            },
            { replace: true },
        );
    }, [setSearchParams]);

    const handleResetFilters = useCallback(() => {
        setSearchParams(
            (params) => {
                params.delete("brand");
                params.delete("inStock");
                return params;
            },
            { replace: true },
        );
    }, [setSearchParams]);

    const brands = useFilterBrands(categoryProducts);

    const filterSections = useMemo((): FilterSection[] => {
        const sections: FilterSection[] = [];

        if (brands.length > 0) {
            sections.push({
                id: "brand",
                title: "Brand",
                titleCount: brands.length,
                options: brands.map((brand) => ({
                    key: brand,
                    label: brand,
                    checked: urlBrands.includes(brand),
                    onChange: () => handleToggleBrand(brand),
                })),
            });
        }

        sections.push({
            id: "stock",
            title: "Stock",
            options: [
                {
                    key: "in-stock",
                    label: "in Stock",
                    checked: inStock,
                    onChange: handleToggleInStock,
                },
            ],
        });

        return sections;
    }, [
        brands,
        urlBrands,
        inStock,
        handleToggleBrand,
        handleToggleInStock,
    ]);

    const categoryTitle = categoryProducts[0]?.category ?? slug ?? "";

    return {
        slug,
        activeOption,
        setActiveOption,
        sortOptions,
        productsLoading,
        productsReady,
        categoryTitle,
        categoryProducts,
        sortedProducts,
        filterSections,
        handleResetFilters,
    };
}

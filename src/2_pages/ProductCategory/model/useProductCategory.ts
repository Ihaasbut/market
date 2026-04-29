import { useCallback, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
    useFilterBrands,
    useFilterTags,
    usePriceBounds,
    type FilterSection,
} from "@/features/filterProduct";
import { useGetProductsCategoryQuery } from "@/shared/api/api";
import type { ProductCardCategoryType } from "@/shared/api/api.types";
import type { SelectOption } from "@/shared/ui/Select";

type ProductRouteParams = {
    slug: string;
};

const sortOptions: SelectOption[] = [
    { id: 1, name: "Rating" },
    { id: 2, name: "Price" },
];

const defaultSortOption = sortOptions[0]!.name;

const EMPTY_CATEGORY_PRODUCTS: ProductCardCategoryType[] = [];

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function commitPriceParams(
    params: URLSearchParams,
    boundsMin: number,
    boundsMax: number,
    valueMin: number,
    valueMax: number,
) {
    params.delete("priceMin");
    params.delete("priceMax");
    const fullRange = valueMin <= boundsMin && valueMax >= boundsMax;
    if (!fullRange) {
        params.set("priceMin", String(valueMin));
        params.set("priceMax", String(valueMax));
    }
}

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
    const urlTags = useMemo(() => searchParams.getAll("tag"), [searchParams]);
    const inStock = searchParams.get("inStock") === "1";
    const priceMinParam = searchParams.get("priceMin");
    const priceMaxParam = searchParams.get("priceMax");

    const categoryProducts = products?.products ?? EMPTY_CATEGORY_PRODUCTS;
    const priceBounds = usePriceBounds(categoryProducts);

    const { priceFilterMin, priceFilterMax } = useMemo(() => {
        const bMin = priceBounds.min;
        const bMax = priceBounds.max;
        if (categoryProducts.length === 0 || bMin > bMax) {
            return { priceFilterMin: 0, priceFilterMax: 0 };
        }
        let vmin = bMin;
        let vmax = bMax;
        if (priceMinParam != null) {
            const p = parseInt(priceMinParam, 10);
            if (!Number.isNaN(p)) vmin = clamp(p, bMin, bMax);
        }
        if (priceMaxParam != null) {
            const p = parseInt(priceMaxParam, 10);
            if (!Number.isNaN(p)) vmax = clamp(p, bMin, bMax);
        }
        if (vmin > vmax) {
            return { priceFilterMin: vmax, priceFilterMax: vmin };
        }
        return { priceFilterMin: vmin, priceFilterMax: vmax };
    }, [
        categoryProducts.length,
        priceBounds,
        priceMinParam,
        priceMaxParam,
    ]);

    const sortedProducts = useMemo(() => {
        const filtered = categoryProducts.filter((product) => {
            if (urlBrands.length > 0) {
                if (!product.brand || !urlBrands.includes(product.brand)) {
                    return false;
                }
            }

            if (categoryProducts.length > 0) {
                const { min: bMin, max: bMax } = priceBounds;
                if (bMin <= bMax) {
                    if (
                        product.price < priceFilterMin ||
                        product.price > priceFilterMax
                    ) {
                        return false;
                    }
                }
            }

            if (inStock && product.availabilityStatus !== "In Stock") {
                return false;
            }

            if (urlTags.length > 0) {
                const productTags = product.tags ?? [];
                if (!urlTags.some((tag) => productTags.includes(tag))) {
                    return false;
                }
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
    }, [
        categoryProducts,
        urlBrands,
        urlTags,
        inStock,
        activeOption,
        priceBounds,
        priceFilterMin,
        priceFilterMax,
    ]);

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

    const handleToggleTag = useCallback(
        (tag: string) => {
            setSearchParams(
                (params) => {
                    const current = params.getAll("tag");

                    const exists = current.includes(tag);

                    const next = exists
                        ? current.filter((t) => t !== tag)
                        : [...current, tag];

                    params.delete("tag");
                    next.forEach((t) => params.append("tag", t));

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
                params.delete("tag");
                params.delete("inStock");
                params.delete("priceMin");
                params.delete("priceMax");
                return params;
            },
            { replace: true },
        );
    }, [setSearchParams]);

    const handlePriceMinChange = useCallback(
        (next: number) => {
            setSearchParams(
                (params) => {
                    const bMin = priceBounds.min;
                    const bMax = priceBounds.max;
                    const vmin = clamp(next, bMin, bMax);
                    const rawMax = params.get("priceMax");
                    let vmax = bMax;
                    if (rawMax != null) {
                        const p = parseInt(rawMax, 10);
                        if (!Number.isNaN(p)) vmax = clamp(p, bMin, bMax);
                    }
                    const nextMin = vmin;
                    const nextMax = Math.max(vmin, vmax);
                    commitPriceParams(params, bMin, bMax, nextMin, nextMax);
                    return params;
                },
                { replace: true },
            );
        },
        [setSearchParams, priceBounds],
    );

    const handlePriceMaxChange = useCallback(
        (next: number) => {
            setSearchParams(
                (params) => {
                    const bMin = priceBounds.min;
                    const bMax = priceBounds.max;
                    const vmax = clamp(next, bMin, bMax);
                    const rawMin = params.get("priceMin");
                    let vmin = bMin;
                    if (rawMin != null) {
                        const p = parseInt(rawMin, 10);
                        if (!Number.isNaN(p)) vmin = clamp(p, bMin, bMax);
                    }
                    const nextMax = vmax;
                    const nextMin = Math.min(vmin, nextMax);
                    commitPriceParams(params, bMin, bMax, nextMin, nextMax);
                    return params;
                },
                { replace: true },
            );
        },
        [setSearchParams, priceBounds],
    );

    const brands = useFilterBrands(categoryProducts);
    const filterTagList = useFilterTags(categoryProducts);

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

        if (categoryProducts.length > 0 && priceBounds.min <= priceBounds.max) {
            sections.push({
                id: "price",
                title: "Price",
                variant: "priceRange",
                options: [],
                priceRange: {
                    min: priceBounds.min,
                    max: priceBounds.max,
                    valueMin: priceFilterMin,
                    valueMax: priceFilterMax,
                    onValueMinChange: handlePriceMinChange,
                    onValueMaxChange: handlePriceMaxChange,
                },
            });
        }

        if (filterTagList.length > 0) {
            sections.push({
                id: "tags",
                title: "Tags",
                titleCount: filterTagList.length,
                variant: "tags",
                options: filterTagList.map((tag) => ({
                    key: tag,
                    label: tag,
                    checked: urlTags.includes(tag),
                    onChange: () => handleToggleTag(tag),
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
        filterTagList,
        categoryProducts.length,
        priceBounds,
        priceFilterMin,
        priceFilterMax,
        urlBrands,
        urlTags,
        inStock,
        handleToggleBrand,
        handleToggleTag,
        handleToggleInStock,
        handlePriceMinChange,
        handlePriceMaxChange,
    ]);

    const categoryTitle = categoryProducts[0]?.category ?? slug ?? "";

    const productListResetKey = useMemo(
        () => `${slug ?? ""}|${activeOption}|${searchParams.toString()}`,
        [slug, activeOption, searchParams],
    );

    return {
        slug,
        productListResetKey,
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

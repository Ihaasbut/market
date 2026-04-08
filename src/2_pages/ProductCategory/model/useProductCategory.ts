import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetProductsAllQuery } from "@/shared/api/api";
import type { SelectOption } from "@/shared/ui/Select";

type ProductRouteParams = {
    slug: string;
};

export const testsOptions: SelectOption[] = [
    {
        id: 1,
        name: "Rating",
    },
    {
        id: 2,
        name: "Popularity",
    },
    {
        id: 3,
        name: "Price",
    },
];

export function useProductCategory() {
    const { slug } = useParams<ProductRouteParams>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeOption, setActiveOption] = useState(testsOptions[1].name);

    const {
        data: products,
        isLoading: productsLoading,
        isError: productsError,
    } = useGetProductsAllQuery();

    const urlBrands = searchParams.getAll("brand");
    const inStock = searchParams.get("inStock") === "1";

    const categoryProducts = useMemo(() => {
        if (!products) {
            return [];
        }

        return products.products.filter((product) => product.category === slug);
    }, [products, slug]);

    const filteredProducts = categoryProducts.filter((product) => {
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

    const sortedProducts = useMemo(() => {
        return [...filteredProducts].sort((a, b) => {
            switch (activeOption) {
                case "Rating":
                    return (b.rating ?? 0) - (a.rating ?? 0);
                case "Popularity":
                    return (b.reviews?.length ?? 0) - (a.reviews?.length ?? 0);
                case "Price":
                    return a.price - b.price;
                default:
                    return 0;
            }
        });
    }, [filteredProducts, activeOption]);
console.log(sortedProducts)
    const handleChange = (value: string) => {
        setActiveOption(value);
    };

    const handleToggleBrand = (brand: string) => {
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
    };

    const handleToggleInStock = () => {
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
    };

    const handleResetFilters = () => {
        setSearchParams(
            (params) => {
                params.delete("brand");
                params.delete("inStock");
                return params;
            },
            { replace: true },
        );
    };

    return {
        activeOption,
        testsOptions,
        productsLoading,
        productsError,
        hasProducts: Boolean(products),
        categoryProducts,
        filteredProducts,
        sortedProducts,
        selectedBrands: urlBrands,
        inStock,
        handleChange,
        handleToggleBrand,
        handleToggleInStock,
        handleResetFilters,
    };
}

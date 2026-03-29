import { useEffect, useState } from "react";

import {
    ProductCategories,
    type ProductCategoriesProps,
} from "@/entities/products/ProductCategories";

export function Categories() {
    const [categories, setCategories] = useState<ProductCategoriesProps | null>(
        null,
    );

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                "https://dummyjson.com/products/categories",
            );
            const data = await res.json();

            const result = {
                categories: data,
                isHome: false,
            };
            console.log(result);
            setCategories(result);
        };

        fetchData();
    }, []);

    if (!categories) {
        return;
    }
    return (
        <div className="container">
            <ProductCategories
                categories={categories.categories}
                isHome={categories.isHome}
            />
        </div>
    );
}

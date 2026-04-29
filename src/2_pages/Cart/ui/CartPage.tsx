import { useMemo } from "react";
import { ProductSliderSmall } from "@/widgets/products/ProductSliderSmall";
import {
    loadCartExcludedFromSummary,
    selectCartItems,
} from "@/entities/cart/model";
import { CartContent } from "@/entities/cart/ui/CartContent";
import { useGetPopularProductsQuery } from "@/shared/api/api";
import { useAppSelector } from "@/shared/store";

import styles from "./CartPage.module.scss";

export function CartPage() {
    const cartProducts = useAppSelector((state) =>
        selectCartItems(state.cart),
    );
    const initialExcludedFromSummary = useMemo(
        () => loadCartExcludedFromSummary(),
        [],
    );

    const {
        data: popular,
        isSuccess: popularReady,
        isError: popularError,
    } = useGetPopularProductsQuery();

    return (
        <div className="container">
            <div className={styles.page}>
                <CartContent
                    items={cartProducts}
                    initialExcludedFromSummary={initialExcludedFromSummary}
                />
            </div>
            {popularReady && !popularError && popular && (
                <ProductSliderSmall
                    variant="popular"
                    products={popular.products}
                />
            )}
        </div>
    );
}

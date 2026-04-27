import { useMemo } from "react";
import {
    loadCartExcludedFromSummary,
    selectCartItems,
} from "@/entities/cart/model";
import { CartContent } from "@/entities/cart/ui/CartContent";
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

    return (
        <div className="container">
            <div className={styles["page"]}>
                <CartContent
                    items={cartProducts}
                    initialExcludedFromSummary={initialExcludedFromSummary}
                />
            </div>
        </div>
    );
}

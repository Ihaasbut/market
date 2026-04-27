import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "@/shared/store";
import { payableUnitPrice } from "@/shared/ui/ProductPrice";

import { clearCart } from "../cartSlice";
import { syncCartSummarySelectionToStorage } from "../cartStorage";
import type { CartItem } from "../types";

const CART_DELIVERY_USD = 3;

export function useCartContent(
    items: CartItem[],
    initialExcludedFromSummary: number[],
) {
    const dispatch = useAppDispatch();
    const [excludedFromSummary, setExcludedFromSummary] = useState<number[]>(
        initialExcludedFromSummary,
    );

    const activeItems = useMemo(
        () => items.filter((item) => item.count > 0),
        [items],
    );
    const effectiveExcluded = useMemo(
        () => {
            const activeItemIds = new Set(activeItems.map((item) => item.id));

            return excludedFromSummary.filter((id) => activeItemIds.has(id));
        },
        [activeItems, excludedFromSummary],
    );
    const summaryItems = useMemo(
        () => activeItems.filter((item) => !effectiveExcluded.includes(item.id)),
        [activeItems, effectiveExcluded],
    );

    const onIncludedInSummaryChange = useCallback(
        (id: number, included: boolean) => {
            setExcludedFromSummary((prev) => {
                if (included) {
                    return prev.filter((excludedId) => excludedId !== id);
                }

                if (prev.includes(id)) {
                    return prev;
                }

                return [...prev, id];
            });
        },
        [],
    );

    const allItemsSelectedForSummary = useMemo(
        () =>
            activeItems.length > 0 && effectiveExcluded.length === 0,
        [activeItems, effectiveExcluded],
    );

    const someItemsSelectedForSummary = useMemo(
        () =>
            activeItems.length > 0 &&
            effectiveExcluded.length > 0 &&
            effectiveExcluded.length < activeItems.length,
        [activeItems, effectiveExcluded],
    );

    const onSelectAllInSummaryChange = useCallback(
        (selectAll: boolean) => {
            if (selectAll) {
                setExcludedFromSummary([]);

                return;
            }

            setExcludedFromSummary(activeItems.map((item) => item.id));
        },
        [activeItems],
    );

    const onRequestRemoveAllCartLines = useCallback(() => {
        dispatch(clearCart());
        setExcludedFromSummary([]);
    }, [dispatch]);

    useEffect(() => {
        syncCartSummarySelectionToStorage(items, effectiveExcluded);
    }, [items, effectiveExcluded]);

    const subtotal = useMemo(() => {
        if (activeItems.length === 0) {
            return null;
        }
        if (summaryItems.length === 0) {
            return 0;
        }

        return summaryItems.reduce(
            (sum, item) =>
                sum +
                payableUnitPrice(item.price, item.discountPercentage) *
                    item.count,
            0,
        );
    }, [activeItems.length, summaryItems]);

    return {
        activeItems,
        effectiveExcluded,
        onIncludedInSummaryChange,
        allItemsSelectedForSummary,
        someItemsSelectedForSummary,
        onSelectAllInSummaryChange,
        onRequestRemoveAllCartLines,
        subtotal,
        shippingUsd: CART_DELIVERY_USD,
    };
}

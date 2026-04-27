import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "@/shared/store";

import { clearFavorites, removeFavoritesByIds } from "../favoriteSlice";
import { syncFavoriteBulkSelectionToStorage } from "../favoriteStorage";
import type { FavoriteItem } from "../types";

export function useFavoriteContent(
    favoriteItems: FavoriteItem[],
    initialExcludedFromBulk: number[],
) {
    const dispatch = useAppDispatch();
    const [excludedFromBulk, setExcludedFromBulk] = useState<number[]>(
        initialExcludedFromBulk,
    );

    const activeItems = useMemo(() => favoriteItems, [favoriteItems]);
    const activeIds = useMemo(
        () => activeItems.map((item) => item.id),
        [activeItems],
    );

    const effectiveExcluded = useMemo(() => {
        const idSet = new Set(activeIds);

        return excludedFromBulk.filter((id) => idSet.has(id));
    }, [activeIds, excludedFromBulk]);

    const onIncludedInBulkChange = useCallback(
        (id: number, included: boolean) => {
            setExcludedFromBulk((prev) => {
                if (included) {
                    return prev.filter((x) => x !== id);
                }

                if (prev.includes(id)) {
                    return prev;
                }

                return [...prev, id];
            });
        },
        [],
    );

    const allItemsSelectedForBulk = useMemo(
        () => activeItems.length > 0 && effectiveExcluded.length === 0,
        [activeItems.length, effectiveExcluded.length],
    );

    const onSelectAllInBulkChange = useCallback(
        (selectAll: boolean) => {
            if (selectAll) {
                setExcludedFromBulk([]);

                return;
            }

            setExcludedFromBulk([...activeIds]);
        },
        [activeIds],
    );

    const onRequestRemoveSelectedFavorites = useCallback(() => {
        const selected = activeIds.filter(
            (id) => !effectiveExcluded.includes(id),
        );
        if (selected.length === 0) {
            return;
        }

        dispatch(removeFavoritesByIds(selected));
        setExcludedFromBulk([]);
    }, [activeIds, dispatch, effectiveExcluded]);

    const onRequestRemoveAllFavorites = useCallback(() => {
        dispatch(clearFavorites());
        setExcludedFromBulk([]);
    }, [dispatch]);

    useEffect(() => {
        syncFavoriteBulkSelectionToStorage(activeItems, effectiveExcluded);
    }, [activeItems, effectiveExcluded]);

    const selectedCount = useMemo(
        () => activeIds.filter((id) => !effectiveExcluded.includes(id)).length,
        [activeIds, effectiveExcluded],
    );

    return {
        activeItems,
        activeIds,
        effectiveExcluded,
        onIncludedInBulkChange,
        allItemsSelectedForBulk,
        onSelectAllInBulkChange,
        onRequestRemoveSelectedFavorites,
        onRequestRemoveAllFavorites,
        selectedCount,
    };
}

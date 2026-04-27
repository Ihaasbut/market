import type { FavoriteItem } from "@/entities/favorite/model";
import { SelectAllProducts } from "@/shared/ui/SelectAllProducts";
import { Typography } from "@/shared/ui/Typography";

import { useFavoriteContent } from "../../model/FavoriteContent";

import { FavoriteProductTile } from "../FavoriteProductTile";
import styles from "./FavoriteContent.module.scss";

export type FavoriteContentProps = {
    favoriteItems: FavoriteItem[];
    initialExcludedFromBulk: number[];
};

export function FavoriteContent({
    favoriteItems,
    initialExcludedFromBulk,
}: FavoriteContentProps) {
    const {
        activeItems,
        activeIds,
        effectiveExcluded,
        onIncludedInBulkChange,
        allItemsSelectedForBulk,
        onSelectAllInBulkChange,
        onRequestRemoveSelectedFavorites,
        selectedCount,
    } = useFavoriteContent(favoriteItems, initialExcludedFromBulk);

    const isEmpty = activeIds.length === 0;
    const selectAllDisabled = isEmpty;
    const canBulkRemove = selectedCount > 0;

    return (
        <div className={styles["layout"]}>
            <div className={styles["main"]}>
                <Typography variant="h4" as="h1" className={styles["title"]}>
                    Favorites
                </Typography>
                <SelectAllProducts
                    checked={allItemsSelectedForBulk}
                    disabled={selectAllDisabled}
                    onSelectAllChange={onSelectAllInBulkChange}
                    checkboxAriaLabel="Select all favorites for removal"
                    hasItems={!isEmpty}
                    action={{
                        onClick: onRequestRemoveSelectedFavorites,
                        ariaLabel: "Remove selected items from favorites",
                        visible: canBulkRemove,
                    }}
                />
                {isEmpty ? (
                    <Typography variant="body-m" className={styles["empty"]}>
                        No favorite items yet. Add them from product pages.
                    </Typography>
                ) : (
                    <ul className={styles["productGrid"]}>
                        {activeItems.map((item: FavoriteItem) => (
                            <li key={item.id} className={styles["gridItem"]}>
                                <FavoriteProductTile
                                    item={item}
                                    includedInBulk={
                                        !effectiveExcluded.includes(item.id)
                                    }
                                    onIncludedInBulkChange={
                                        onIncludedInBulkChange
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

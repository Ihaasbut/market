import { useMemo } from "react";
import {
    loadFavoriteExcludedFromBulk,
    selectFavoriteItems,
} from "@/entities/favorite/model";
import { FavoriteContent } from "@/entities/favorite/ui/FavoriteContent";
import { useAppSelector } from "@/shared/store";

import styles from "./FavoritePage.module.scss";

export function FavoritePage() {
    const favoriteItems = useAppSelector((state) =>
        selectFavoriteItems(state.favorite),
    );
    const initialExcludedFromBulk = useMemo(
        () => loadFavoriteExcludedFromBulk(),
        [],
    );

    return (
        <div className="container">
            <div className={styles["page"]}>
                <FavoriteContent
                    favoriteItems={favoriteItems}
                    initialExcludedFromBulk={initialExcludedFromBulk}
                />
            </div>
        </div>
    );
}

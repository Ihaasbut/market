import { useMemo } from "react";
import { ProductSliderSmall } from "@/widgets/products/ProductSliderSmall";
import {
    loadFavoriteExcludedFromBulk,
    selectFavoriteItems,
} from "@/entities/favorite/model";
import { FavoriteContent } from "@/entities/favorite/ui/FavoriteContent";
import { useGetPopularProductsQuery } from "@/shared/api/api";
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

    const {
        data: popular,
        isSuccess: popularReady,
        isError: popularError,
    } = useGetPopularProductsQuery();

    return (
        <div className="container">
            <div className={styles["page"]}>
                <FavoriteContent
                    favoriteItems={favoriteItems}
                    initialExcludedFromBulk={initialExcludedFromBulk}
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

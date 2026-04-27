import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    removeFromFavorites,
    updateFavoriteItemSnapshot,
} from "@/entities/favorite/model";
import type { FavoriteItem } from "@/entities/favorite/model";
import { useGetProductDetailQuery } from "@/shared/api/api";
import RemoveFromCartLine from "@/shared/assets/icon/RemoveFromCartLine";
import { normalizeImageUrl } from "@/shared/lib/image";
import { useAppDispatch } from "@/shared/store";
import { Typography } from "@/shared/ui/Typography";

import styles from "./FavoriteProductTile.module.scss";

export type FavoriteProductTileProps = {
    item: FavoriteItem;
    includedInBulk: boolean;
    onIncludedInBulkChange: (id: number, included: boolean) => void;
};

export function FavoriteProductTile({
    item,
    includedInBulk,
    onIncludedInBulkChange,
}: FavoriteProductTileProps) {
    const dispatch = useAppDispatch();
    const { id, title, image } = item;
    const hasLegacySnapshot = title === `Product #${id}` && image === "";
    const { data: fallbackProduct } = useGetProductDetailQuery(id, {
        skip: !hasLegacySnapshot,
    });

    const displayTitle = fallbackProduct?.title ?? title;
    const displayImage = fallbackProduct?.images?.[0] ?? image;
    const imageUrl = displayImage ? normalizeImageUrl(displayImage) : null;

    useEffect(() => {
        if (!hasLegacySnapshot || !fallbackProduct) {
            return;
        }

        dispatch(
            updateFavoriteItemSnapshot({
                id,
                title: fallbackProduct.title,
                image: fallbackProduct.images[0] ?? "",
            }),
        );
    }, [dispatch, fallbackProduct, hasLegacySnapshot, id]);

    return (
        <div className={styles["host"]}>
            <div className={styles["floatBar"]} aria-hidden={false}>
                <label className={styles["checkLabel"]}>
                    <input
                        type="checkbox"
                        className={styles["includeCheckbox"]}
                        checked={includedInBulk}
                        onChange={(e) =>
                            onIncludedInBulkChange(id, e.target.checked)
                        }
                        aria-label="Select for removal from favorites"
                    />
                </label>
                <button
                    type="button"
                    className={styles["removeButton"]}
                    onClick={() => dispatch(removeFromFavorites(id))}
                    aria-label="Remove from favorites"
                >
                    <RemoveFromCartLine />
                </button>
            </div>
            <Link
                to={`/product/${id}`}
                className={styles["cardLink"]}
                aria-label={`Open: ${displayTitle}`}
            >
                <div
                    className={styles["imageBg"]}
                    style={
                        imageUrl
                            ? {
                                  backgroundImage: `url("${imageUrl}")`,
                              }
                            : undefined
                    }
                />
                <div className={styles["titleBar"]}>
                    <Typography
                        variant="body-s"
                        as="span"
                        className={styles["titleText"]}
                    >
                        {displayTitle}
                    </Typography>
                </div>
            </Link>
        </div>
    );
}

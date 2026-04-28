import cn from "classnames";
import { Link } from "react-router-dom";
import {
    addToCart,
    decrementCartItem,
    incrementCartItem,
    selectCartItemActiveCount,
} from "@/entities/cart/model";
import { selectIsFavorite, toggleFavorite } from "@/entities/favorite/model";
import type { ProductDetailType } from "@/shared/api/api.types";
import Favorite from "@/shared/assets/icon/Favorite";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { Accordion } from "@/shared/ui/Accordion";
import { Button } from "@/shared/ui/Button";
import { CartQuantityStepper } from "@/shared/ui/CartQuantityStepper";

import { ProductPrice } from "@/shared/ui/ProductPrice";
import { Stars } from "@/shared/ui/Stars";
import { Typography } from "@/shared/ui/Typography";

import styles from "./ProductDetailHeroInfo.module.scss";

export function ProductDetailHeroInfo(props: ProductDetailType) {
    const {
        id,
        sku,
        rating,
        title,
        images,
        price,
        discountPercentage,
        category,
        tags,
    } = props;
    const dispatch = useAppDispatch();
    const countInCart = useAppSelector((state) =>
        selectCartItemActiveCount(state.cart, id),
    );
    const isFavorite = useAppSelector((state) =>
        selectIsFavorite(state.favorite, id),
    );
    const listItems = {
        list: [
            {
                title: "Payment",
                description:
                    "Pay for your order the way you like: by card online, with Apple Pay or Google Pay, or in cash/card upon delivery. All payments are processed securely.",
            },
            {
                title: "Delivery",
                description:
                    "We deliver orders by courier or to pickup points. You will receive tracking information and notifications at every stage of delivery.",
            },
            {
                title: "Warranty & Benefits",
                description:
                    "All products come with an official warranty and a simple return policy, plus regular promotions and bonuses for our loyal customers.",
            },
        ],
    };
    return (
        <div className={styles["hero-wrapper"]}>
            <div className={styles["head-info"]}>
                <Typography variant="default"> {sku} </Typography>
                {rating != null ? (
                    <Stars rating={rating} />
                ) : (
                    <Typography variant="body-xs">No rating</Typography>
                )}
            </div>

            <Typography variant="h4">{title}</Typography>

            <ProductPrice
                price={price}
                discountPercentage={discountPercentage}
            />

            {tags.length > 0 && (
                <div className={styles["tags"]}>
                    {tags.map((tag) => (
                        <Link
                            key={tag}
                            className={styles["tag-link"]}
                            to={{
                                pathname: `/categories/${category}`,
                                search: new URLSearchParams({ tag }).toString(),
                            }}
                        >
                            #{tag}
                        </Link>
                    ))}
                </div>
            )}

            <div className={styles["actionsRow"]}>
                <div className={styles["primaryAction"]}>
                    {countInCart < 1 ? (
                        <Button
                            variant="fill"
                            onclick={() =>
                                dispatch(
                                    addToCart({
                                        id,
                                        count: 1,
                                        title,
                                        image: images[0] ?? "",
                                        price,
                                        discountPercentage,
                                    }),
                                )
                            }
                        >
                            Buy now
                        </Button>
                    ) : (
                        <CartQuantityStepper
                            className={styles["primaryStepper"]}
                            layout="stretch"
                            count={countInCart}
                            onIncrement={() => dispatch(incrementCartItem(id))}
                            onDecrement={() => dispatch(decrementCartItem(id))}
                        />
                    )}
                </div>
                <div className={styles["favoriteAction"]}>
                    <button
                        type="button"
                        className={cn(
                            styles["favoriteToggle"],
                            isFavorite && styles["favoriteToggle_active"],
                        )}
                        onClick={() =>
                            dispatch(
                                toggleFavorite({
                                    id,
                                    title,
                                    image: images[0] ?? "",
                                }),
                            )
                        }
                        aria-label={
                            isFavorite
                                ? "Remove from favorites"
                                : "Add to favorites"
                        }
                        aria-pressed={isFavorite}
                    >
                        <Favorite />
                    </button>
                </div>
            </div>

            <Accordion list={listItems.list} />
        </div>
    );
}

export default ProductDetailHeroInfo;

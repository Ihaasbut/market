import { Link } from "react-router-dom";
import type {
    ProductCardCategory,
    ProductCard,
} from "@/shared/api/api.types";
import Availability from "@/shared/assets/icon/Availability";

import AvailabilityNot from "@/shared/assets/icon/AvailabilityNot";
import Gift from "@/shared/assets/icon/Gift";
import { normalizeImageUrl } from "@/shared/lib/image";
import { ProductPrice } from "@/shared/ui/ProductPrice";
import { Stars } from "@/shared/ui/Stars";
import { Typography } from "@/shared/ui/Typography";
import styles from "./ProductCard.module.scss";

// export type ProductCardProps = {
//     availabilityStatus: string;
//     title: string;
//     price: number;
//     discountPercentage: number;
//     rating?: number;
//     images: string[];
//     id: number;
//     description?: string;
//     brand?: string;
//     reviews?: [];
//     sku?: string;
//     category?: string;
// };

export function ProductCard(
    props: ProductCard | ProductCardCategory,
) {
    const {
        availabilityStatus,
        title,
        price,
        discountPercentage,
        rating,
        images,
        id,
    } = props;
    const imgUrl = normalizeImageUrl(images[0]);

    return (
        <Link to={`/product/${id}`} className={styles["wrapper"]}>
            <div
                className={styles["image-bg"]}
                style={{
                    backgroundImage: `url("${imgUrl}")`,
                    backgroundColor: "var(--color-surface-neutral)",
                }}
            >
                <div className={styles["header"]}>
                    {availabilityStatus === "In Stock" ? (
                        <div className={styles["availability-group"]}>
                            <Availability />
                            <Typography
                                variant="default"
                                className={styles["availability"]}
                            >
                                In Stock
                            </Typography>
                        </div>
                    ) : (
                        <div className={styles["availability-group"]}>
                            <AvailabilityNot />
                            <Typography
                                variant="default"
                                className={styles["availability"]}
                            >
                                Low Stock
                            </Typography>
                        </div>
                    )}
                    <Typography variant="body-xs" className={styles["sale"]}>
                        SALE
                    </Typography>
                    <div className={styles["gift-group"]}>
                        <Gift />
                        <Typography variant="body-xs"> gift</Typography>
                    </div>
                </div>
            </div>
            <div className={styles["footer"]}>
                {rating && <Stars rating={rating} />}
                <Typography variant="body-s">{title}</Typography>
                <ProductPrice
                    price={price}
                    discountPercentage={discountPercentage}
                />
            </div>
        </Link>
    );
}

export default ProductCard;

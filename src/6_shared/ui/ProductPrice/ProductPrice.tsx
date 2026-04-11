import { Typography } from "../Typography";
import styles from "./ProductPrice.module.scss";

type ProductPriceProps = {
    price: number;
    discountPercentage: number;
};

export function ProductPrice({ price, discountPercentage }: ProductPriceProps) {
    const priceWithDiscount = Math.round(
        (discountPercentage * price) / 100 + price,
    );

    return (
        <div className={styles["price"]}>
            <Typography variant="body-l" className={styles["sale-price"]}>
                {price}$
            </Typography>
            <Typography variant="body-l" className={styles["current-price"]}>
                {priceWithDiscount}$
            </Typography>
        </div>
    );
}

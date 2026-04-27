import { Typography } from "../Typography";
import { payableUnitPrice } from "./payableUnitPrice";
import styles from "./ProductPrice.module.scss";

type ProductPriceProps = {
    price: number;
    discountPercentage: number;
};

export function ProductPrice({ price, discountPercentage }: ProductPriceProps) {
    const priceWithDiscount = payableUnitPrice(price, discountPercentage);

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

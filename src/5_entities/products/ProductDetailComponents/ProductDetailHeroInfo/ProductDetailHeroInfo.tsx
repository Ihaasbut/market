import type {  ProductDetail } from "@/shared/api/api.types";
import { Accordion } from "@/shared/ui/Accordion";
import { Button } from "@/shared/ui/Button";

import { ProductPrice } from "@/shared/ui/ProductPrice";
import { Stars } from "@/shared/ui/Stars";
import { Typography } from "@/shared/ui/Typography";

import styles from "./ProductDetailHeroInfo.module.scss";

export function ProductDetailHeroInfo(props: ProductDetail) {
    const {
        sku,
        rating,
        reviews,
        title,
        price,
        discountPercentage,
    } = props;
    if (rating == null) {
        return <div>No rating</div>;
    }
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
                <Stars rating={rating} />
                <Typography variant="body-xs" className={styles["reviews"]}>
                    Reviews ({reviews?.length ?? 0})
                </Typography>
            </div>

            <Typography variant="h4">{title}</Typography>


            <ProductPrice
                price={price}
                discountPercentage={discountPercentage}
            />
            <div className={styles["buttons"]}>
                <Button variant="fill"> Buy now</Button>
            </div>

            <Accordion list={listItems.list} />
        </div>
    );
}

export default ProductDetailHeroInfo;

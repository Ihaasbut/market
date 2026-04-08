import type { ProductCardProps } from "../../ProductCard";
import styles from "./ProductDetailHeroInfo.module.css";

export function ProductDetailHeroInfo(props: ProductCardProps) {
    const { description } = props;
    return (
        <div className={styles["hero-wrapper"]}>
       

                <div className={styles["right"]}> {description}</div>
        </div>
    );
}

export default ProductDetailHeroInfo;

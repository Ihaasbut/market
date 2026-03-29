import { ProductCard, type ProductCardProps } from "../../ProductCard";
import styles from "./ProductList.module.css";

export type ProductListProps = {
    products: ProductCardProps[];
};

export function ProductList({ products }: ProductListProps) {
    return (
        <div className={styles["product-list"]}>
            {products.map((product) => (
                <ProductCard key={product.title} {...product} />
            ))}
        </div>
    );
}

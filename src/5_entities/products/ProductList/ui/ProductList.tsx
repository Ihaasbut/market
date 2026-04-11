import type {} from "@/shared/api/api";
import type {
    ProductListCategoryResponse,
    ProductList,
} from "@/shared/api/api.types";

import { ProductCard } from "../../ProductCard";
import styles from "./ProductList.module.scss";

export function ProductList({
    products,
}: ProductList | ProductListCategoryResponse) {
    return (
        <div className={styles["product-list"]}>
            {products.map((product) => (
                <ProductCard key={product.title} {...product} />
            ))}
        </div>
    );
}

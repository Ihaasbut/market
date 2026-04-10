import styles from "./ProductDetailCharacteristics.module.css";


export type ProductCharacteristics = {
          title: string,
          description: string
}

export type ProductsCharacteristics = ProductCharacteristics[]

export function ProductDetailCharacteristics() {
    return (
        <div className={styles["characteristics"]}>
            ProductDetailCharacteristics
        </div>
    );
}

export default ProductDetailCharacteristics;

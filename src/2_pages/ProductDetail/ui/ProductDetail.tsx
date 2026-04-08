import { useParams } from "react-router-dom";
import type { ProductCardProps } from "@/entities/products/ProductCard";
import { ProductDetailHeroInfo } from "@/entities/products/ProductDetailComponents/ProductDetailHeroInfo";
import { ProductDetailImages } from "@/entities/products/ProductDetailComponents/ProductDetailImages";
import { useGetProductsAllQuery } from "@/shared/api/api";
import styles from "./ProductDetail.module.css";

type ProductRouteParams = {
    id: string;
};

export function ProductDetail() {
    const { id } = useParams<ProductRouteParams>();
    const {
        data: products,
        isLoading: productsLoading,
        isError: productsError,
    } = useGetProductsAllQuery();
    if (productsLoading) {
        return <div className="container">грузится</div>;
    }
    if (!products) {
        return [];
    }
    if (productsError) {
        return null;
    }
    if (productsLoading) {
        return <div className="container">грузится</div>;
    }

    const productDetail = products.products.find(
        (product: ProductCardProps) => product.id === Number(id),
    );

    if (!productDetail) {
        return <div className="container">Товар не найден</div>;
    }

    return (
   
            <div className="container">
                <div className={styles["left-right"]}>
                    <div className={styles["left"]}>
                        <ProductDetailImages images={productDetail.images} />
                    </div>
                    <div className={styles["right"]}>
                        <ProductDetailHeroInfo {...productDetail} />
                    </div>
                </div>
            </div>
    );
}

export default ProductDetail;

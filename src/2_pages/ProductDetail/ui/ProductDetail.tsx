import { useParams } from "react-router-dom";

import { ProductDetailHeroInfo } from "@/entities/products/ProductDetailComponents/ProductDetailHeroInfo";
import { ProductDetailImages } from "@/entities/products/ProductDetailComponents/ProductDetailImages";

import { useGetProductDetailQuery } from "@/shared/api/api";
import type { ProductDetail } from "@/shared/api/api.types";
import { ScreenBlue } from "@/shared/ui/ScreenBlue/ScreenBlue";
import styles from "./ProductDetail.module.css";


type ProductRouteParams = {
    id: string;
};

export function ProductDetail() {
    const { id } = useParams<ProductRouteParams>();

    const {
        data: product,
        isLoading: productLoading,
        isError: productError,
    } = useGetProductDetailQuery(Number(id));

    if (productLoading) {
        return <ScreenBlue/>;
    }

    if (productError || !product) {
        return null;
    }

    return (
        <div className="container">
            <section className={styles["left-right"]}>
                <div className={styles["left"]}>
                    <ProductDetailImages
                        key={product.id}
                        images={product.images}
                    />
                </div>
                <div className={styles["right"]}>
                    <ProductDetailHeroInfo {...product} />
                </div>
            </section>

            <section className={styles["about"]}></section>
        </div>
    );
}

export default ProductDetail;

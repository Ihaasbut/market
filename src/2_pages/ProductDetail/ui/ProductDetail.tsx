import { useParams } from "react-router-dom";
import { ProductDetailHeroInfo } from "@/entities/products/ProductDetailComponents/ProductDetailHeroInfo";
import { ProductDetailImages } from "@/entities/products/ProductDetailComponents/ProductDetailImages";
import { ProductDetailTabs } from "@/entities/products/ProductDetailComponents/ProductDetailTabs";

import { useGetProductDetailQuery } from "@/shared/api/api";
import { ScreenBlue } from "@/shared/ui/ScreenBlue/ScreenBlue";
import styles from "./ProductDetail.module.scss";


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
            <ProductDetailTabs product={product} />
        </div>
    );
}

export default ProductDetail;

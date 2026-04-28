import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { ProductSliderSmall } from "@/widgets/products/ProductSliderSmall";
import { RecentlyViewedProductsSlider } from "@/widgets/products/RecentlyViewedProductsSlider";
import { useTrackRecentlyViewedProductId } from "@/features/recentlyViewedProducts";
import { ProductDetailHeroInfo } from "@/entities/products/ProductDetailComponents/ProductDetailHeroInfo";
import { ProductDetailImages } from "@/entities/products/ProductDetailComponents/ProductDetailImages";
import { ProductDetailTabs } from "@/entities/products/ProductDetailComponents/ProductDetailTabs";

import {
    useGetProductDetailQuery,
    useGetProductsCategoryQuery,
} from "@/shared/api/api";
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

    const { data: categoryProducts } = useGetProductsCategoryQuery(
        product?.category,
        { skip: !product?.category },
    );

    const sameCategoryProducts = useMemo(
        () =>
            categoryProducts?.products.filter(
                (categoryProduct) => categoryProduct.id !== product?.id,
            ) ?? [],
        [categoryProducts?.products, product?.id],
    );

    useTrackRecentlyViewedProductId(product?.id);

    if (productLoading) {
        return <ScreenBlue />;
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

            {sameCategoryProducts.length > 0 && (
                <ProductSliderSmall
                    products={sameCategoryProducts}
                    variant="sameCategory"
                />
            )}
            <RecentlyViewedProductsSlider excludeProductId={product.id} />
        </div>
    );
}

export default ProductDetail;

import { ProductSliderSmall } from "@/widgets/products/ProductSliderSmall";
import { useRecentlyViewedProductIds } from "@/features/recentlyViewedProducts";
import { useGetProductsByIdsQuery } from "@/shared/api/api";

export type RecentlyViewedProductsSliderProps = {
    excludeProductId?: number;
    limit?: number;
};

export function RecentlyViewedProductsSlider({
    excludeProductId,
    limit,
}: RecentlyViewedProductsSliderProps) {
    const ids = useRecentlyViewedProductIds({ excludeProductId, limit });
    const { data } = useGetProductsByIdsQuery(ids, { skip: ids.length === 0 });
    const products = data?.products ?? [];

    if (products.length === 0) {
        return null;
    }

    return <ProductSliderSmall products={products} variant="alsoViewed" />;
}

export default RecentlyViewedProductsSlider;

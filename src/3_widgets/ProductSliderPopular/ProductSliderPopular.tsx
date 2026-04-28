import { ProductSlider } from "@/entities/products/ProductSlider";
import type { ProductList } from "@/shared/api/api.types";
import { TitleSection } from "@/shared/ui/TitleSection";

export function ProductSliderPopular({ products }: ProductList) {
    return (
        <ProductSlider
            name="popular"
            products={products}
            headerLeft={
                <TitleSection>Our popular product</TitleSection>
            }
        />
    );
}

export default ProductSliderPopular;

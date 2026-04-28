import { ProductSliderBig } from "@/entities/products/ProductSliderBig";
import type { ProductListHomeHero } from "@/shared/api/api.types";

export function ProductSliderHero({ products }: ProductListHomeHero) {
    return <ProductSliderBig name="hero" products={products} />;
}

export default ProductSliderHero;

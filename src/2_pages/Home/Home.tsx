import { useMemo } from "react";
import { CompanyFigures } from "@/widgets/CompanyFigures";
import { SiteLeadForm } from "@/widgets/forms/SiteLeadForm";
import { FeaturedCategories } from "@/widgets/products/FeaturedCategories";
import { ProductSliderHero } from "@/widgets/products/ProductSliderHero";
import { ProductSliderSmall } from "@/widgets/products/ProductSliderSmall";

import {
    useGetCategoriesQuery,
    useGetPopularProductsQuery,
    useGetProductsHomeHeroQuery,
} from "@/shared/api/api";
import { ScreenBlue } from "@/shared/ui/ScreenBlue/ScreenBlue";
import styles from "./Home.module.scss";

export function Home() {
    const {
        data: popular,
        isLoading: popularLoading,
        isError: popularError,
    } = useGetPopularProductsQuery();

    const {
        data: productHero,
        isLoading: productHeroLoading,
        isError: productHeroError,
    } = useGetProductsHomeHeroQuery();

    const {
        data: categories,
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useGetCategoriesQuery();

    const heroProducts = useMemo(
        () => productHero?.products ?? [],
        [productHero?.products],
    );

    if (popularLoading || categoriesLoading || productHeroLoading) {
        return <ScreenBlue />;
    }

    if (
        popularError ||
        categoriesError ||
        !popular ||
        !categories ||
        productHeroError ||
        !productHero
    ) {
        return (
            <div className="container">
                <p className={styles["error-banner"]} role="alert">
                    Could not load catalog. Check your connection and try again
                    later.
                </p>
            </div>
        );
    }

    return (
        <>
            <ProductSliderHero products={heroProducts} />
            <CompanyFigures />
            <div className="container">
                <FeaturedCategories categories={categories.slice(0, 4)} />
                <ProductSliderSmall
                    variant="popular"
                    products={popular.products}
                />
            </div>
            <SiteLeadForm />
        </>
    );
}

export default Home;

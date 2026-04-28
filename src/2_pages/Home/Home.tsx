import { useMemo } from "react";
import { CallbackSection } from "@/widgets/CallbackSection";
import { CategoriesSection } from "@/widgets/CategoriesSection";
import { CompanyStats, type CompanyStatsProps } from "@/widgets/CompanyStats";
import { ProductSliderPopular } from "@/widgets/ProductSliderPopular";
import { ProductSliderHero } from "@/entities/products/ProductSliderHero";

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

    const mockDataStats: CompanyStatsProps = {
        stats: [
            {
                description: "Happy customers",
                number: "5,567",
            },
            {
                description: "Products to choose from",
                number: "1245",
            },
            {
                description: "Sales per day",
                number: "372",
            },
            {
                description: "Years on the market",
                number: "20",
            },
        ],
    };

    return (
        <>
            <ProductSliderHero products={heroProducts} />
            <CompanyStats stats={mockDataStats.stats} />
            <div className="container">
                <CategoriesSection categories={categories.slice(0, 4)} />
                <ProductSliderPopular products={popular.products} />
            </div>
            <CallbackSection />
        </>
    );
}

export default Home;

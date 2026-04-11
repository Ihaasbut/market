import { useMemo } from "react";
import { Link } from "react-router-dom";
import { CallbackSection } from "@/widgets/CallbackSection";
import { CompanyStats, type CompanyStatsProps } from "@/widgets/CompanyStats ";
import { ProductCategories } from "@/entities/products/ProductCategories";
import { ProductSliderHero } from "@/entities/products/ProductSliderHero";
import { ProductSliderPopular } from "@/entities/products/ProductSliderPopular";

import {
    useGetCategoriesQuery,
    useGetPopularProductsQuery,
    useGetProductsHomeHeroQuery,
} from "@/shared/api/api";
import { Button } from "@/shared/ui/Button";
import { ScreenBlue } from "@/shared/ui/ScreenBlue/ScreenBlue";
import styles from "./Home.module.css";

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
        return null;
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
                <ProductCategories categories={categories.slice(0, 4)} />
                <div className={styles["button-container"]}>
                    <Link to="categories">
                        <Button variant="fill">View all categories</Button>
                    </Link>
                </div>
                <ProductSliderPopular products={popular.products} />
            </div>
            <CallbackSection />
        </>
    );
}

export default Home;

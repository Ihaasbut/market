import { useMemo } from "react";
import { CallbackSection } from "@/widgets/CallbackSection";
import { CompanyStats, type CompanyStatsProps } from "@/widgets/CompanyStats ";
import {
    ProductCategories,
    type ProductCategoriesProps,
} from "@/entities/products/ProductCategories";
import { ProductSliderHero } from "@/entities/products/ProductSliderHero";
import { ProductSliderPopular } from "@/entities/products/ProductSliderPopular";

import {
    useGetCategoriesQuery,

    useGetPopularProductsQuery,
    useGetProductsHomeHeroQuery,
} from "@/shared/api/api";
import { ScreenBlue } from "@/shared/ui/ScreenBlue/ScreenBlue";

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
    } = useGetProductsHomeHeroQuery()
    
    const {
        data: categories,
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useGetCategoriesQuery({isFull: true});

    const heroProducts = useMemo(
        () => productHero?.products ?? [],
        [productHero?.products],
    );


    if (popularLoading || categoriesLoading || productHeroLoading) {
        return <ScreenBlue />;
    }

    if (popularError || categoriesError || !popular || !categories || productHeroError || !productHero) {
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

    const categoriesData: ProductCategoriesProps = {
        categories: categories.categories,
        isFull: categories.isFull,
    };

    return (
        <>
            <ProductSliderHero products={heroProducts} />
            <CompanyStats stats={mockDataStats.stats} />
            <div className="container">
                <ProductCategories
                    isFull={categories.isFull}
                    categories={categoriesData.categories.slice(0,4)}
                />
                <ProductSliderPopular products={popular.products} />
            </div>
            <CallbackSection />
        </>
    );
}

export default Home;

import { useMemo } from "react";
import { CallbackSection } from "@/widgets/CallbackSection";
import { CompanyStats, type CompanyStatsProps } from "@/widgets/CompanyStats ";
import { ProductSliderHero } from "@/entities/products/ProductSliderHero";
import { ProductSliderPopular } from "@/entities/products/ProductSliderPopular";
import {
    ProductCategories,
    type ProductCategoriesProps,
} from "@/entities/products/ui/ProductCategories";



import {
    useGetCategoriesQuery,
    useGetPopularProductsQuery,
} from "@/shared/api/api";

export function Home() {
    const {
        data: popular,
        isLoading: popularLoading,
        isError: popularError,
    } = useGetPopularProductsQuery();
    const {
        data: categories,
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useGetCategoriesQuery();

    const heroProducts = useMemo(
        () => popular?.products.slice(9, 12) ?? [],
        [popular?.products],
    );

    if (popularLoading || categoriesLoading) {
        return <div className="container">грузится</div>;
    }

    if (popularError || categoriesError || !popular || !categories) {
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
        isHome: categories.isHome,
    };

    return (
        <>
            <ProductSliderHero products={heroProducts} />
            <CompanyStats stats={mockDataStats.stats} />
            <div className="container">
                <ProductCategories
                    isHome={categories.isHome}
                    categories={categoriesData.categories}
                />
                <ProductSliderPopular products={popular.products} />{" "}
            </div>
            <CallbackSection />
        </>
    );
}

export default Home;

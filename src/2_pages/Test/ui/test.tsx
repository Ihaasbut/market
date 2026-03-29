// import { ReviewPanel } from "@/widgets/ReviewPanel";
import { useEffect, useState } from "react";

import { CallbackSection } from "@/widgets/CallbackSection";
import { CompanyStats, type CompanyStatsProps } from "@/widgets/CompanyStats ";
import type { ProductCardProps } from "@/entities/products/ProductCard";
import {
    ProductCategories,
    type ProductCategoriesProps,
} from "@/entities/products/ProductCategories";
import {
    ProductList,
    type ProductListProps,
} from "@/entities/products/ProductList";
import { ProductSliderHero } from "@/entities/products/ProductSliderHero";
import { ProductSliderPopular } from "@/entities/products/ProductSliderPopular";


import { Button } from "@/shared/ui/Button";
import { Select } from "@/shared/ui/Select";

const testsOptions = [
    {
        id: 1,
        name: "Рейтингу",
    },
    {
        id: 2,
        name: "Популярности",
    },
    {
        id: 3,
        name: "Цене",
    },
];

const testsOptions2 = [
    {
        id: 1,
        name: "Рейтингу",
    },
    {
        id: 2,
        name: "Популярности",
    },
    {
        id: 3,
        name: "Цене",
    },
];

const testsOptions3 = [
    {
        id: 1,
        name: "Рейтингу",
    },
    {
        id: 2,
        name: "Популярности",
    },
    {
        id: 3,
        name: "Цене",
    },
];

export function Test() {
    const [activeOption, setActiveOption] = useState(testsOptions[0].name);
    const [activeOption2, setActiveOption2] = useState(testsOptions2[0].name);
    const [activeOption3, setActiveOption3] = useState(testsOptions3[0].name);

    const [popular, setPopular] = useState<ProductListProps | null>(null);
    const [heroData, setHeroData] = useState<ProductListProps | null>(null);

    const [categories, setCategories] = useState<ProductCategoriesProps | null>(
        null,
    );

    useEffect(() => {
        const fetchData = async () => {
            const resPopular = await fetch(
                "https://dummyjson.com/products?limit=12&order=desc&sortBy=rating",
            );
            const dataPopular = await resPopular.json();

            const popularList: ProductCardProps[] = dataPopular.products.map(
                (product: ProductCardProps) => ({
                    availabilityStatus: product.availabilityStatus,
                    title: product.title,
                    price: product.price,
                    discountPercentage: product.discountPercentage,
                    rating: product.rating,
                    images: product.images,
                    id: product.id,
                    category: product.category,
                    description: product.description,
                }),
            );

            const populars: ProductListProps = {
                products: popularList,
            };

            const heroSlider: ProductListProps = {
                products: populars.products.slice(9, 12),
            };
            console.log(heroSlider);

            setPopular(populars);
            setHeroData(heroSlider);

            const resCategory = await fetch(
                "https://dummyjson.com/products/categories",
            );
            const dataCategory = await resCategory.json();
            const result = {
                categories: dataCategory,
                isHome: true,
            };

            setCategories(result);
        };

        fetchData();
    }, []);

    if (!popular) {
        return;
    }

    if (!categories) {
        return;
    }

    if (!heroData) {
        return;
    }

    const handleChange = (value: string) => {
        setActiveOption(value);
    };
    const handleChange2 = (value: string) => {
        setActiveOption2(value);
    };
    const handleChange3 = (value: string) => {
        setActiveOption3(value);
    };
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
            <ProductSliderHero products={heroData.products} />
            <CompanyStats stats={mockDataStats.stats} />
            <div className="container">
                <Button variant="fill"> Отправить </Button>
                <Button variant="outside"> Перейти </Button>
                <Button variant="filter"> Сбросить фильтры </Button>

                <Select
                    options={testsOptions}
                    activeOption={activeOption}
                    onChange={handleChange}
                    variant="cartOrder"
                    label="Выберите отделение"
                />

                <Select
                    options={testsOptions2}
                    activeOption={activeOption2}
                    onChange={handleChange2}
                    variant="cardProduct"
                />

                <Select
                    options={testsOptions3}
                    activeOption={activeOption3}
                    onChange={handleChange3}
                    variant="cardFilter"
                />

                <CallbackSection />
                <div className="container" style={{ display: "none" }}>
                    <ProductList products={popular.products} />
                </div>
                <ProductSliderPopular products={popular.products} />

                <ProductCategories
                    isHome={categories.isHome}
                    categories={categories.categories}
                />
            </div>
        </>
    );
}

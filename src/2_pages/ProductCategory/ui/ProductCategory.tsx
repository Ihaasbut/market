import { useState } from "react";

import { SiteLeadForm } from "@/widgets/forms/SiteLeadForm";
import { RecentlyViewedProductsSlider } from "@/widgets/products/RecentlyViewedProductsSlider";
import { FilterProducts } from "@/features/filterProduct";
import { ProductCard } from "@/entities/products/ProductCard";
import { Button } from "@/shared/ui/Button";
import { ScreenBlue } from "@/shared/ui/ScreenBlue/ScreenBlue";
import { Select } from "@/shared/ui/Select";
import { Typography } from "@/shared/ui/Typography";
import { useProductCategory } from "../model/useProductCategory";
import styles from "./ProductCategory.module.scss";

const PAGE_SIZE = 6;

export function ProductCategory() {
    const {
        slug,
        productListResetKey,
        activeOption,
        setActiveOption,
        sortOptions,
        productsLoading,
        productsReady,
        categoryTitle,
        sortedProducts,
        filterSections,
        handleResetFilters,
    } = useProductCategory();

    const [visible, setVisible] = useState(PAGE_SIZE);
    const [prevListResetKey, setPrevListResetKey] = useState(productListResetKey);

    if (productListResetKey !== prevListResetKey) {
        setPrevListResetKey(productListResetKey);
        setVisible(PAGE_SIZE);
    }

    if (productsLoading) {
        return <ScreenBlue />;
    }

    if (!slug || !productsReady) {
        return null;
    }

    const canShowMore = visible < sortedProducts.length;

    return (
        <>
            <div className="container">
                <div className={styles["section-filter-product"]}>
                    <div className={styles["head-filter"]}>
                        <Typography
                            variant="body-xl"
                            className={styles["title-category"]}
                        >
                            {categoryTitle} ({sortedProducts.length})
                        </Typography>
                        <Select
                            activeOption={activeOption}
                            onChange={setActiveOption}
                            options={sortOptions}
                            variant="cardFilter"
                        />
                    </div>

                    <div className={styles["filter-product"]}>
                        <FilterProducts
                            sections={filterSections}
                            onResetFilters={handleResetFilters}
                        />
                        <div className={styles["filter-product__main"]}>
                            <div className={styles["product-list"]}>
                                {sortedProducts
                                    .slice(0, visible)
                                    .map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            {...product}
                                        />
                                    ))}
                            </div>
                            {canShowMore && (
                                <div className={styles["button-container"]}>
                                    <Button
                                        variant="fill"
                                        onclick={() =>
                                            setVisible((n) => n + PAGE_SIZE)
                                        }
                                    >
                                        Show more
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <SiteLeadForm />
            <div className="container">
                <RecentlyViewedProductsSlider />
            </div>
        </>
    );
}

export default ProductCategory;

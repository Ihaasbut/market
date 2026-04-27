import { FilterProducts } from "@/features/filterProduct";
import { ProductList } from "@/entities/products/ProductList";
import { ScreenBlue } from "@/shared/ui/ScreenBlue/ScreenBlue";
import { Select } from "@/shared/ui/Select";
import { Typography } from "@/shared/ui/Typography";
import { useProductCategory } from "../model/useProductCategory";
import styles from "./ProductCategory.module.scss";

export function ProductCategory() {
    const {
        slug,
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

    if (productsLoading) {
        return <ScreenBlue />;
    }

    if (!slug || !productsReady) {
        return null;
    }

    return (
        <div className="container">
            <div className="section-filter-product">
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
                        <ProductList products={sortedProducts} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCategory;

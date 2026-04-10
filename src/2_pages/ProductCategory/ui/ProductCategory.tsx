import { FilterProducts } from "@/features/filterProduct";
import { ProductList } from "@/entities/products/ProductList";
import { ScreenBlue } from "@/shared/ui/ScreenBlue/ScreenBlue";
import { Select } from "@/shared/ui/Select";
import { Typography } from "@/shared/ui/Typography";
import {
    testsOptions,
    useProductCategory,
} from "../model/useProductCategory";
import styles from "./ProductCategory.module.css";


export function ProductCategory() {
    const {
        activeOption,
        productsLoading,
        productsError,
        hasProducts,
        categoryProducts,
        filteredProducts,
        sortedProducts,
        selectedBrands,
        inStock,
        handleChange,
        handleToggleBrand,
        handleToggleInStock,
        handleResetFilters,
    } = useProductCategory();

    if (productsLoading) {
        return <ScreenBlue />;
    }

    if (productsError || !hasProducts) {
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
                        {categoryProducts[0]?.category} (
                        {filteredProducts.length})
                    </Typography>
                    <Select
                        activeOption={activeOption}
                        onChange={handleChange}
                        options={testsOptions}
                        variant="cardFilter"
                    />
                </div>

                <div className={styles["filter-product"]}>
                    <FilterProducts
                        products={categoryProducts}
                        selectedBrands={selectedBrands}
                        onToggleBrand={handleToggleBrand}
                        inStock={inStock}
                        onToggleInStock={handleToggleInStock}
                        onResetFilters={handleResetFilters}
                    />
                    <ProductList products={sortedProducts} />
                </div>
            </div>
        </div>
    );
}

export default ProductCategory;

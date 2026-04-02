import { useParams } from "react-router-dom";
import { FilterProducts } from "@/features/filterProduct";
import { ProductList } from "@/entities/products/ProductList";
import { useGetProductsAllQuery } from "@/shared/api/api";
import { Typography } from "@/shared/ui/Typography";
import styles from "./ProductCategory.module.css";


type ProductRouteParams = {
    slug: string;
};

export function ProductCategory() {
    const { slug } = useParams<ProductRouteParams>();
    const {
        data: popular,
        isLoading: popularLoading,
        isError: popularError,
    } = useGetProductsAllQuery();

    if (popularLoading) {
        return <div className="container">грузится</div>;
    }

    if (popularError || !popular) {
        return null;
    }
    const categorySlug = popular.products.filter(
        (product) => product.category === slug,
    );
    console.log(categorySlug);

    return (
        <div className="container">
            <div className="section-filter-product">
                <Typography
                    variant="body-xl"
                    className={styles["title-category"]}
                >
                    {categorySlug[0].category} ({categorySlug.length})
                </Typography>
                <div className={styles["filter-product"]}>
                    <FilterProducts />
                    <ProductList products={categorySlug} />
                </div>
            </div>
        </div>
    );
}

export default ProductCategory;

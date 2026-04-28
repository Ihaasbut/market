import { Link } from "react-router-dom";

import { ProductCategory } from "@/entities/products/ProductCategory";
import type * as Api from "@/shared/api/api.types";
import { Button } from "@/shared/ui/Button";
import { TitleSection } from "@/shared/ui/TitleSection";

import styles from "./FeaturedCategories.module.scss";

export type FeaturedCategoriesProps = {
    categories: Api.ProductCategoryType[];
};

export function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
    return (
        <section className={styles.layout}>
            <TitleSection>Categories</TitleSection>
            <div className={styles.grid}>
                {categories.map((category) => (
                    <ProductCategory
                        key={category.slug}
                        category={category}
                    />
                ))}
            </div>
            <div className={styles["button-container"]}>
                <Link to="categories">
                    <Button variant="fill">View all categories</Button>
                </Link>
            </div>
        </section>
    );
}

export default FeaturedCategories;

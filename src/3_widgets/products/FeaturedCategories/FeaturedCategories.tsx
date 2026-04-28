import { Link } from "react-router-dom";

import { ProductCategories } from "@/entities/products/ProductCategories";
import type { ProductCategoryProps } from "@/entities/products/ProductCategories";
import { Button } from "@/shared/ui/Button";
import { TitleSection } from "@/shared/ui/TitleSection";

import styles from "./FeaturedCategories.module.scss";

export type FeaturedCategoriesProps = {
    categories: ProductCategoryProps[];
};

export function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
    return (
        <section className={styles.layout}>
            <TitleSection>Categories</TitleSection>
            <ProductCategories categories={categories} />
            <div className={styles["button-container"]}>
                <Link to="categories">
                    <Button variant="fill">View all categories</Button>
                </Link>
            </div>
        </section>
    );
}

export default FeaturedCategories;

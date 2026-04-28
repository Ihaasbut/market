import { Link } from "react-router-dom";

import { ProductCategories } from "@/entities/products/ProductCategories";
import type { ProductCategoryProps } from "@/entities/products/ProductCategories";
import { Button } from "@/shared/ui/Button";
import { TitleSection } from "@/shared/ui/TitleSection";

import styles from "./CategoriesSection.module.scss";

export type CategoriesSectionProps = {
    categories: ProductCategoryProps[];
};

export function CategoriesSection({ categories }: CategoriesSectionProps) {
    return (
        <section className={styles.section}>
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

export default CategoriesSection;

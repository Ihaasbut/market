import { Link } from "react-router-dom";

import { Typography } from "@/shared/ui/Typography";
import styles from "./ProductCategories.module.scss";

export type ProductCategoryProps = {
    images: string[];
    slug: string;
    name: string;
    url: string;
};

export type ProductCategoriesProps = {
    categories: ProductCategoryProps[];
};

export function ProductCategories({ categories }: ProductCategoriesProps) {
    const getCategoryImageUrl = (slug: string): string => {
        try {
            return new URL(
                `../../../../6_shared/assets/images/category/${slug}.webp`,
                import.meta.url,
            ).href;
        } catch {
            return "";
        }
    };

    return (
        <div className={styles.categories}>
            {categories.map((category) => {
                const imgUrl = getCategoryImageUrl(category.slug);
                return (
                    <Link
                        to={`/categories/${category.slug}`}
                        className={styles.category}
                        style={{
                            backgroundImage: imgUrl
                                ? `url("${imgUrl}")`
                                : "none",
                        }}
                        key={category.slug}
                    >
                        <Typography
                            variant="body-l"
                            className={styles["title-category"]}
                        >
                            {category.name}
                        </Typography>
                    </Link>
                );
            })}
        </div>
    );
}

export default ProductCategories;

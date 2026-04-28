import { Link } from "react-router-dom";

import { Typography } from "@/shared/ui/Typography";
import styles from "./ProductCategory.module.scss";

export function ProductCategory({
    category,
}: {
    category: import("@/shared/api/api.types").ProductCategoryType;
}) {
    const imgUrl = getCategoryImageUrl(category.slug);

    return (
        <Link
            to={`/categories/${category.slug}`}
            className={styles.category}
            style={{
                backgroundImage: imgUrl ? `url("${imgUrl}")` : "none",
            }}
        >
            <Typography
                variant="body-l"
                className={styles["title-category"]}
            >
                {category.name}
            </Typography>
        </Link>
    );
}

function getCategoryImageUrl(slug: string): string {
    try {
        return new URL(
            `../../../6_shared/assets/images/category/${slug}.webp`,
            import.meta.url,
        ).href;
    } catch {
        return "";
    }
}

export default ProductCategory;

import { Link} from "react-router-dom";

import { Button } from "@/shared/ui/Button";
import { TitleSection } from "@/shared/ui/TitleSection";
import { Typography } from "@/shared/ui/Typography";
import styles from "./ProductCategories.module.css";

export type ProductCategoryProps = {
    images: string[];
    slug: string;
    name: string;
    url: string;
};

export type ProductCategoriesProps = {
    categories: ProductCategoryProps[];
    isFull: boolean;
};

export function ProductCategories({ categories, isFull }: ProductCategoriesProps) {
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
        <section className={styles["section-categories"]}>
            <TitleSection className={styles["title"]}> Categories </TitleSection>
            <div className={styles["categories"]}>
                {categories.map((category, index) => {
                    const imgUrl = getCategoryImageUrl(category.slug);
                    return (
                        <Link
                            to={`/categories/${category.slug}`}
                            className={styles["category"]}
                            style={{
                              backgroundImage: imgUrl ? `url("${imgUrl}")` : "none",
                            
                            }}
                            key={index + category.name}
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
            {isFull && ( <Link to={"categories"}><Button variant="fill">View all categories</Button></Link> )} 
            {/* тут будет Link */}
        </section>
    );
}

export default ProductCategories;

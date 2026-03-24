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
    isHome: boolean;
};

export function ProductCategories({ categories, isHome }: ProductCategoriesProps) {
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
    console.log()

    
    return (
        <section className={styles["section-categories"]}>
            <TitleSection className={styles["title"]}> Categories </TitleSection>
            <div className={styles["categories"]}>
                {categories.map((category) => {
                    const imgUrl = getCategoryImageUrl(category.slug);
                    return (
                        <Link
                            to={`category/${category.slug}`}
                            className={styles["category"]}
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

                            {/* <button className={styles["button-category"]}>Узнать подробнее</button> */}
                        </Link>
                    );
                })}
            </div>
            {isHome && ( <Link to={"categories"}><Button variant="fill">View all categories</Button></Link> )} 
            {/* тут будет Link */}
        </section>
    );
}

export default ProductCategories;

import { useState } from "react";

import { ProductCategories } from "@/entities/products/ProductCategories";
import { useGetCategoriesQuery } from "@/shared/api/api";
import { Button } from "@/shared/ui/Button";
import { ScreenBlue } from "@/shared/ui/ScreenBlue/ScreenBlue";
import { TitleSection } from "@/shared/ui/TitleSection";
import styles from "./Categories.module.scss";

const PAGE_SIZE = 8;

export function Categories() {
    const [visible, setVisible] = useState(PAGE_SIZE);
    const {
        data: categories,
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useGetCategoriesQuery();

    if (categoriesLoading) {
        return <ScreenBlue />;
    }

    if (categoriesError || !categories) {
        return null;
    }

    const canShowMore = visible < categories.length;

    return (
        <div className="container">
            <TitleSection className={styles.headline}>Categories</TitleSection>
            <ProductCategories categories={categories.slice(0, visible)} />
            {canShowMore && (
                <div className={styles["button-container"]}>
                    <Button
                        variant="fill"
                        onclick={() => setVisible((n) => n + PAGE_SIZE)}
                    >
                        Show more
                    </Button>
                </div>
            )}
        </div>
    );
}

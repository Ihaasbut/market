import cn from "classnames";
import { useState } from "react";

import { SiteLeadForm } from "@/widgets/forms/SiteLeadForm";
import { ProductCategory } from "@/entities/products/ProductCategory";
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
        <>
            <div className={cn("container", styles.page)}>
                <TitleSection className={styles.headline}>Categories</TitleSection>
                <div className={styles.grid}>
                    {categories.slice(0, visible).map((category) => (
                        <ProductCategory
                            key={category.slug}
                            category={category}
                        />
                    ))}
                </div>
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
            <SiteLeadForm />
        </>
    );
}

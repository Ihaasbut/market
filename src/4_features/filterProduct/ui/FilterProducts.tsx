import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Typography } from "@/shared/ui/Typography";
import type { FilterProductsProps } from "../model/FilterProducts";
import styles from "./FilterProducts.module.scss";
import { FilterProductsSection } from "./FilterProductsSection";

export function FilterProducts({
    sections,
    onResetFilters,
}: FilterProductsProps) {
    /** Empty set = every section expanded by default */
    const [collapsedSectionIds, setCollapsedSectionIds] = useState<string[]>(
        [],
    );

    const toggleSection = (id: string) => {
        setCollapsedSectionIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
    };

    return (
        <div className={styles["filter-wrapper"]}>
            <div className={styles["filter"]}>
                <Typography variant="body-l">Filters</Typography>
                {sections.map((section) => (
                    <FilterProductsSection
                        key={section.id}
                        section={section}
                        isOpen={!collapsedSectionIds.includes(section.id)}
                        onToggle={() => toggleSection(section.id)}
                    />
                ))}
            </div>

            <Button variant="fill" onclick={onResetFilters}>
                Reset filters
            </Button>
        </div>
    );
}

export default FilterProducts;

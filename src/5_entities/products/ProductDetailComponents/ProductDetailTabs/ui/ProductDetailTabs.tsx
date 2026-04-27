import cn from "classnames";
import { useState } from "react";

import type { ProductDetail } from "@/shared/api/api.types";
import { ProductDetailCharacteristics } from "../../ProductDetailCharacteristics";
import { ProductDetailDescription } from "../../ProductDetailDescription";
import { ProductDetailReviews } from "../../ProductDetailReviews";

import styles from "./ProductDetailTabs.module.scss";

export type ProductDetailTabId =
    | "characteristics"
    | "description"
    | "reviews";

const TABS: { id: ProductDetailTabId; label: string }[] = [
    { id: "characteristics", label: "Specifications" },
    { id: "description", label: "Description" },
    { id: "reviews", label: "Reviews" },
];

export type ProductDetailTabsProps = {
    product: ProductDetail;
};

export function ProductDetailTabs({ product }: ProductDetailTabsProps) {
    const [activeTab, setActiveTab] =
        useState<ProductDetailTabId>("characteristics");

    return (
        <div className={styles["root"]}>
            <div
                className={styles["tabList"]}
                role="tablist"
                aria-label="Product page sections"
            >
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            id={`product-tab-${tab.id}`}
                            aria-selected={isActive}
                            aria-controls={`product-panel-${tab.id}`}
                            className={cn(
                                styles["tab"],
                                isActive && styles["tabActive"],
                            )}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <div
                className={styles["panel"]}
                role="tabpanel"
                id={`product-panel-${activeTab}`}
                aria-labelledby={`product-tab-${activeTab}`}
            >
                {activeTab === "characteristics" && (
                    <ProductDetailCharacteristics product={product} />
                )}
                {activeTab === "description" && (
                    <ProductDetailDescription product={product} />
                )}
                {activeTab === "reviews" && (
                    <ProductDetailReviews product={product} />
                )}
            </div>
        </div>
    );
}

export default ProductDetailTabs;

import cn from "classnames";
import { useState } from "react";

import type { ProductDetailType } from "@/shared/api/api.types";
import { ProductDetailCharacteristics } from "../../ProductDetailCharacteristics";
import { ProductDetailDescription } from "../../ProductDetailDescription";

import styles from "./ProductDetailTabs.module.scss";

export type ProductDetailTabId = "characteristics" | "description";

const TABS: { id: ProductDetailTabId; label: string }[] = [
    { id: "characteristics", label: "Specifications" },
    { id: "description", label: "Description" },
];

export type ProductDetailTabsProps = {
    product: ProductDetailType;
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

            <div className={styles["panelStack"]}>
                <div
                    className={cn(
                        styles["panelLayer"],
                        activeTab !== "characteristics" &&
                            styles["panelLayerHidden"],
                    )}
                    role="tabpanel"
                    id="product-panel-characteristics"
                    aria-labelledby="product-tab-characteristics"
                    aria-hidden={activeTab !== "characteristics"}
                    inert={activeTab !== "characteristics" ? true : undefined}
                >
                    <ProductDetailCharacteristics product={product} />
                </div>
                <div
                    className={cn(
                        styles["panelLayer"],
                        activeTab !== "description" &&
                            styles["panelLayerHidden"],
                    )}
                    role="tabpanel"
                    id="product-panel-description"
                    aria-labelledby="product-tab-description"
                    aria-hidden={activeTab !== "description"}
                    inert={activeTab !== "description" ? true : undefined}
                >
                    <ProductDetailDescription product={product} />
                </div>
            </div>
        </div>
    );
}

export default ProductDetailTabs;

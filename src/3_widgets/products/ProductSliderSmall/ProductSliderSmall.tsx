import cn from "classnames";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "@/entities/products/ProductCard";
import type { ProductListType } from "@/shared/api/api.types";
import ArrowSliderLeft from "@/shared/assets/icon/ArrowSliderLeft";
import ArrowSliderRight from "@/shared/assets/icon/ArrowSliderRight";
import { TitleSection } from "@/shared/ui/TitleSection";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./ProductSliderSmall.module.scss";

const SECTION_TITLES = {
    popular: "Our popular products",
    recent: "Recent products",
} as const;

export type ProductSliderVariant = keyof typeof SECTION_TITLES;

export type ProductSliderSmallProps = ProductListType & {
    variant: ProductSliderVariant;
};

export function ProductSliderSmall({
    products,
    variant,
}: ProductSliderSmallProps) {
    const prevClass = `${variant}-product-slider-small-prev`;
    const nextClass = `${variant}-product-slider-small-next`;

    const headerLeft = (
        <TitleSection>{SECTION_TITLES[variant]}</TitleSection>
    );

    return (
        <section className={styles["product-slider-small"]}>
            <div className={styles["header-swiper"]}>
                {headerLeft}
                <div className={styles["btn-navigation"]}>
                    <button
                        type="button"
                        className={cn(styles["arrow-slider"], prevClass)}
                    >
                        <ArrowSliderLeft />
                    </button>
                    <button
                        type="button"
                        className={cn(styles["arrow-slider"], nextClass)}
                    >
                        <ArrowSliderRight />
                    </button>
                </div>
            </div>

            <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={4}
                slidesPerGroup={4}
                navigation={{
                    prevEl: `.${prevClass}`,
                    nextEl: `.${nextClass}`,
                }}
                loop={true}
                breakpoints={{
                    320: {
                        slidesPerView: 1.2,
                        spaceBetween: 16,
                        slidesPerGroup: 1,
                    },
                    576: {
                        slidesPerView: 1.5,
                        spaceBetween: 20,
                        slidesPerGroup: 1,
                    },
                    768: {
                        slidesPerView: 2.5,
                        spaceBetween: 24,
                        slidesPerGroup: 1,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                        slidesPerGroup: 3,
                    },
                    1301: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                        slidesPerGroup: 4,
                    },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide
                        key={product.id}
                        className={styles["swiper-slide"]}
                    >
                        <ProductCard {...product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default ProductSliderSmall;

import cn from "classnames";
import type { ReactNode } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import type { ProductList } from "@/shared/api/api.types";
import ArrowSliderLeft from "@/shared/assets/icon/ArrowSliderLeft";
import ArrowSliderRight from "@/shared/assets/icon/ArrowSliderRight";

import { ProductCard } from "../ProductCard";
import styles from "./ProductSlider.module.scss";

export type ProductSliderProps = ProductList & {
    headerLeft?: ReactNode;
    name: string;
};

export function ProductSlider({ products, headerLeft, name }: ProductSliderProps) {
    const prevClass = `${name}-product-slider-prev`;
    const nextClass = `${name}-product-slider-next`;

    return (
        <section className={styles["product-slider"]}>
            <div
                className={cn(
                    styles["header-swiper"],
                    !headerLeft && styles["header-swiper-controls-only"],
                )}
            >
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

export default ProductSlider;

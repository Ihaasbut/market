import cn from "classnames";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import type { ProductsResponse } from "@/shared/api/api";
import ArrowSliderLeft from "@/shared/assets/icon/ArrowSliderLeft";
import ArrowSliderRight from "@/shared/assets/icon/ArrowSliderRight";
import { TitleSection } from "@/shared/ui/TitleSection";
import ProductCard from "../../ProductCard/ui/ProductCard";

import styles from "./ProductSliderPopular.module.css";

export function ProductSliderPopular({ products }: ProductsResponse) {
    return (
        <section className={styles["product-slider"]}>
            <div className={styles["header-swiper"]}>
                <TitleSection className={styles["title"]}>
                    Our popular products
                </TitleSection>
                <div className={styles["btn-navigation"]}>
                    <button
                        className={cn(styles["arrow-slider"], "arrow-left")}
                    >
                        <ArrowSliderLeft />
                    </button>
                    <button
                        className={cn(styles["arrow-slider"], "arrow-right")}
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
                    prevEl: ".arrow-left",
                    nextEl: ".arrow-right",
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
                    <SwiperSlide className={styles["swiper-slide"]}>
                        <ProductCard key={product.title} {...product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default ProductSliderPopular;

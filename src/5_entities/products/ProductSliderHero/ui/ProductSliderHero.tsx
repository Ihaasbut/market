import cn from "classnames";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import type { ProductsResponse } from "@/shared/api/api";
import ArrowSliderLeft from "@/shared/assets/icon/ArrowSliderLeft";
import ArrowSliderRight from "@/shared/assets/icon/ArrowSliderRight";

import { normalizeImageUrl } from "@/shared/lib/image";
import { Button } from "@/shared/ui/Button";
import { Typography } from "@/shared/ui/Typography";


import styles from "./ProductSliderHero.module.css";


export function ProductSliderHero({ products }: ProductsResponse) {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperType>(null);

    return (
        <section className={styles["hero-slider"]}>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                slidesPerGroup={1}
                navigation={{
                    prevEl: ".arrow-left-slider-hero",
                    nextEl: ".arrow-right-slider-hero",
                }}
                loop={true}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex);
                }}
            >
                {products.map((product) => {
                    const imgUrl = normalizeImageUrl(product.images[0]);
                    return (
                        <SwiperSlide
                            className={styles["swiper-slide"]}
                        >
                
                            <div className={styles["image"]}>
                                <img src={`${imgUrl}`} alt="product" />
                            </div>
                            <div className={styles["inner"]}>
                                <Typography
                                    variant="h2"
                                    className={styles["title"]}
                                >
                                    {product.title}
                                </Typography>
                                <Typography
                                    variant="body-s"
                                    className={styles["description"]}
                                >
                                    {product.description}
                                </Typography>

                                <div className={styles["price"]}>
                                    <Typography
                                        variant="body-l"
                                        className={styles["sale-price"]}
                                    >
                                        {product.price}$
                                    </Typography>
                                    <Typography
                                        variant="body-l"
                                        className={styles["current-price"]}
                                    >
                                        {Math.round(
                                            (product.discountPercentage *
                                                product.price) /
                                                100 +
                                                product.price,
                                        )}
                                        $
                                    </Typography>
                                </div>
                                <Button variant="fill">Add to cart</Button>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <div className={styles["btn-navigation"]}>
                <button className={cn(styles["arrow-slider"], "arrow-left-slider-hero")}>
                    <ArrowSliderLeft />
                </button>
                <div className={styles["pagination"]}>
                    {products.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={cn(
                                styles["bullet"],
                                index === activeIndex &&
                                    styles["bullet-active"],
                            )}
                            onClick={() =>
                                swiperRef.current?.slideToLoop(index)
                            }
                        />
                    ))}
                </div>
                <button className={cn(styles["arrow-slider"], "arrow-right-slider-hero")}>
                    <ArrowSliderRight />
                </button>
            </div>
        </section>
    );
}

export default ProductSliderHero;

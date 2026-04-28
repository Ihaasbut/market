import cn from "classnames";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import type { ProductListHomeHeroType } from "@/shared/api/api.types";
import ArrowSliderLeft from "@/shared/assets/icon/ArrowSliderLeft";
import ArrowSliderRight from "@/shared/assets/icon/ArrowSliderRight";

import { normalizeImageUrl } from "@/shared/lib/image";
import { Button } from "@/shared/ui/Button";
import { ProductPrice } from "@/shared/ui/ProductPrice";
import { Typography } from "@/shared/ui/Typography";

import styles from "./ProductSliderHero.module.scss";

const NAME = "hero";
const PREV_CLASS = `${NAME}-product-slider-big-prev`;
const NEXT_CLASS = `${NAME}-product-slider-big-next`;

export function ProductSliderHero({ products }: ProductListHomeHeroType) {
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
                    prevEl: `.${PREV_CLASS}`,
                    nextEl: `.${NEXT_CLASS}`,
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
                            key={product.id}
                            className={styles["swiper-slide"]}
                        >
                            <div className={styles.image}>
                                <img src={`${imgUrl}`} alt="product" />
                            </div>
                            <div className={styles.inner}>
                                <Typography
                                    variant="h2"
                                    className={styles.title}
                                >
                                    {product.title}
                                </Typography>
                                <Typography
                                    variant="body-s"
                                    className={styles.description}
                                >
                                    {product.description}
                                </Typography>

                                <ProductPrice
                                    price={product.price}
                                    discountPercentage={
                                        product.discountPercentage
                                    }
                                />
                                <Button variant="fill">Add to cart</Button>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <div className={styles["btn-navigation"]}>
                <button
                    type="button"
                    className={cn(styles["arrow-slider"], PREV_CLASS)}
                >
                    <ArrowSliderLeft />
                </button>
                <div className={styles.pagination}>
                    {products.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={cn(
                                styles.bullet,
                                index === activeIndex &&
                                    styles["bullet-active"],
                            )}
                            onClick={() =>
                                swiperRef.current?.slideToLoop(index)
                            }
                        />
                    ))}
                </div>
                <button
                    type="button"
                    className={cn(styles["arrow-slider"], NEXT_CLASS)}
                >
                    <ArrowSliderRight />
                </button>
            </div>
        </section>
    );
}

export default ProductSliderHero;

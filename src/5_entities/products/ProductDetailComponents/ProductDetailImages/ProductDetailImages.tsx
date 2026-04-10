import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { cssBackgroundImageUrl } from "@/shared/lib/image";
import styles from "./ProductDetailImages.module.css";

export type ProductDetailImagesProps = {
    images: string[];
};

export function ProductDetailImages({ images }: ProductDetailImagesProps) {
    const [activeImage, setActiveImage] = useState(images[0]);

    const onChangeImage = (image: string) => {
        setActiveImage(image);
    };

    
    return (
        <div className={styles["images"]}>
            <div
                className={styles["main-image"]}
                style={{
                    backgroundImage: cssBackgroundImageUrl(activeImage),
                }}
            ></div>
            <div className={styles["images-list"]}>
                {images.map((image) => (
                    <div
                        key={image}
                        className={styles["other-image"]}
                        style={{
                            backgroundImage: cssBackgroundImageUrl(image),
                        }}
                        onClick={() => onChangeImage(image)}
                    ></div>
                ))}
            </div>

            {images.length > 1 && (
                <Swiper
                    className={styles["images-list-mobile-slider"]}
                    loop={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 1.8,
                            spaceBetween: 16,
                            slidesPerGroup: 1,
                        },
                        475: {
                            slidesPerView: 2.5,
                            spaceBetween: 16,
                            slidesPerGroup: 1,
                        },
                        768: {
                            slidesPerView: 3.2,
                            spaceBetween: 16,
                            slidesPerGroup: 1,
                        },

                    }}
                >
                    {images.map((image) => (
                        <SwiperSlide key={image}>
                            <div
                                className={styles["other-image"]}
                                style={{
                                    backgroundImage: cssBackgroundImageUrl(image),
                                }}
                                onClick={() => onChangeImage(image)}
                            ></div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}

export default ProductDetailImages;

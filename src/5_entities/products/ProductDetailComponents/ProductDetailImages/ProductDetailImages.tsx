import { useState } from "react";
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
                style={{ backgroundImage: `url(${activeImage})` }}
            ></div>
            <div className={styles["images-list"]}>
                {images.map((image) => (
                    <div
                        className={styles["other-image"]}
                        style={{ backgroundImage: `url(${image})` }}
                        onClick={() => onChangeImage(image)}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default ProductDetailImages;

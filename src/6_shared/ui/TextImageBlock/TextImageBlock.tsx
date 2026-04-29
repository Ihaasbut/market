import cn from "classnames";

import { Typography } from "@/shared/ui/Typography";

import styles from "./TextImageBlock.module.scss";

export type TextImageBlockProps = {
    paragraphs: readonly string[];
    imageSrc: string;
    imageAlt?: string;
    title?: string;
    titleId?: string;
    reverse?: boolean;
    className?: string;
};

export function TextImageBlock({
    paragraphs,
    imageSrc,
    imageAlt = "",
    title,
    titleId,
    reverse = false,
    className,
}: TextImageBlockProps) {
    const labelledBy = title && titleId ? titleId : undefined;

    return (
        <div
            className={cn(styles.root, reverse && styles.reverse, className)}
            aria-labelledby={labelledBy}
        >
            <figure className={styles.figure}>
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className={styles.photo}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 900px) 100vw, 340px"
                />
            </figure>
            <div className={styles.copy}>
                {title ? (
                    <div id={titleId}>
                        <Typography variant="h4" as="h2" className={styles.title}>
                            {title}
                        </Typography>
                    </div>
                ) : null}
                {paragraphs.map((text, index) => (
                    <Typography
                        key={index}
                        variant="body-m"
                        as="p"
                        className={styles.paragraph}
                    >
                        {text}
                    </Typography>
                ))}
            </div>
        </div>
    );
}

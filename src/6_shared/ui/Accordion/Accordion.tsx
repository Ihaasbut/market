import cn from "classnames";

import { useState } from "react";
import ArrowBottom from "@/shared/assets/icon/ArrowBottom";
import { Typography } from "../Typography";
import styles from "./Accordion.module.scss";

export type AccordionItem = {
    title: string;
    description: string;
};

export type AccordionProps = {
    list: AccordionItem[];
};

export function Accordion({ list }: AccordionProps) {
    const [openIndex, setOpenIndex] = useState<number[]>([0]);

    const handleClick = (index: number) => {
        setOpenIndex((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index],
        );
    };

    return (
        <div className={styles["list"]}>
            {list.map((item, index) => (
                <div
                    className={cn(styles["item"], {
                        [styles["active-item"]]: openIndex.includes(index),
                    })}
                    key={item.title}
                >
                    <button
                        type="button"
                        className={styles["title"]}
                        onClick={() => handleClick(index)}
                    >
                        <Typography variant="body-l"> {item.title} </Typography>
                        <div className={styles["arrow-bottom"]}>
                            <ArrowBottom />
                        </div>
                    </button>
<div className={cn(styles["description-wrapper"], {
                            [styles.open]: openIndex.includes(index),
                        })}>
                    <div
                        className={cn(styles["description"])}
                    >
                        {item.description}
                    </div></div>
                </div>
            ))}
        </div>
    );
}

export default Accordion;

import cn from "classnames";

import { SiteLeadForm } from "@/widgets/forms/SiteLeadForm";
import { TextImageBlock } from "@/shared/ui/TextImageBlock";
import { TitleSection } from "@/shared/ui/TitleSection";
import { Typography } from "@/shared/ui/Typography";

import styles from "./AboutUs.module.scss";
import { ABOUT_BLOCKS, ABOUT_IMAGES, ABOUT_LEAD } from "./constants";

export function AboutUs() {
    return (
        <>
            <div className={cn("container", styles.page)}>
                <TitleSection className={styles.headline}>About us</TitleSection>

                <div className={styles.lead}>
                    <Typography variant="body-s" as="p" className={styles.leadText}>
                        {ABOUT_LEAD}
                    </Typography>
                </div>

                {ABOUT_BLOCKS.map((block, index) => (
                    <TextImageBlock
                        key={
                            block.titleId ??
                            `${block.imageKey}-${index}`
                        }
                        titleId={block.titleId}
                        title={block.title}
                        paragraphs={block.paragraphs}
                        imageSrc={ABOUT_IMAGES[block.imageKey]}
                        reverse={block.reverse}
                    />
                ))}
            </div>
            <SiteLeadForm />
        </>
    );
}

import successForm from "@/shared/assets/images/successForm.png";
import { Button } from "@/shared/ui/Button";
import { Typography } from "@/shared/ui/Typography";
import styles from "./Success.module.css";

export type SuccessProps = {
    title: string;
    text: string;
    onclick: ()=> void;
};

export function Success({ title, text, onclick }: SuccessProps) {
    return (
        <div className={styles["wrapper"]}>
            <div className={styles["inner"]}>
                <img src={successForm} alt="галочка" className={styles["image-success"]}/>
                <Typography variant="body-l" className={styles["title"]}>{title}</Typography>
                <Typography variant="default" className={styles["text"]}>{text}</Typography>
                <Button variant="fill" onclick={onclick}>Okay</Button>
            </div>
        </div>
    );
}

import successForm from "@/shared/assets/images/successForm.png";
import { Button } from "@/shared/ui/Button";
import { Typography } from "@/shared/ui/Typography";
import styles from "./Success.module.css";

export type SuccessProps = {
    title: string;
    text: string;
};

export function Success({ title, text }: SuccessProps) {
    return (
        <div className={styles["success-wrapper"]}>
            <div className={styles["success-inner"]}>
                <img src={successForm} alt="галочка" />
                <Typography variant="body-l">{title}</Typography>
                <Typography variant="default">{text}</Typography>
                <Button variant="fill">Хорошо</Button>
            </div>
        </div>
    );
}

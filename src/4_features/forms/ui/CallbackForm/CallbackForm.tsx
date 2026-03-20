import type { ChangeEvent } from "react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";

import { useCallbackForm } from "../../model/CallbackForm";
import { Success } from "../Success";
import styles from "./CallbackForm.module.css";

export function CallbackForm() {
    const {
        valueName,
        valueEmail,
        send,
        onChangeValueName,
        onChangeValueEmail,
        onSubmit,
    } = useCallbackForm();

    return (
        <>
            <form action="/" className={styles.form} onSubmit={onSubmit}>
                <Input
                    name="name"
                    placeholder="Ваше имя"
                    value={valueName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChangeValueName(e.currentTarget.value)
                    }
                />
                <Input
                    name="email"
                    placeholder="Ваш email"
                    value={valueEmail}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChangeValueEmail(e.currentTarget.value)
                    }
                />

                <Button variant="fill">Отправить</Button>
            </form>

            {send && <Success text="Porttitor vitae ornare aliquet euismod nunc, tincidunt. In non elementum, ornare elementum nisi egestas vel ut. " title="Ваша заявка успешно принята" />}
        </>
    );
}

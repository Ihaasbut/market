import type { ChangeEvent } from "react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";

import { useCallbackForm } from "../../model/CallbackForm";
import { Success } from "../Success";
import styles from "./CallbackForm.module.scss";

export function CallbackForm() {
    const {
        valueName,
        valueEmail,
        send,
        onChangeValueName,
        onChangeValueEmail,
        onSubmit,
        setSend,
    } = useCallbackForm();

    

    return (
        <>
            <form action="/" className={styles["form"]} onSubmit={onSubmit}>
                <Input
                    name="name"
                    placeholder="Your name"
                    value={valueName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChangeValueName(e.currentTarget.value)
                    }
                />
                <Input
                    name="email"
                    placeholder="Your email"
                    value={valueEmail}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChangeValueEmail(e.currentTarget.value)
                    }
                />

                <Button variant="fill">Send</Button>
            </form>

            {send && (
                <Success
                    title="Your request has been submitted"
                    text="Your request has been successfully received. We will review it and get back to you as soon as possible."
                    onclick={() => setSend(!send)}
                />
            )}
        </>
    );
}

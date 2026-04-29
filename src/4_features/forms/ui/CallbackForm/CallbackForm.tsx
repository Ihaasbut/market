import type { ChangeEvent } from "react";
import { Controller } from "react-hook-form";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";

import { useCallbackForm } from "../../model/CallbackForm";
import { Success } from "../Success";
import styles from "./CallbackForm.module.scss";

const NAME_ERROR_ID = "callback-form-name-error";
const EMAIL_ERROR_ID = "callback-form-email-error";

export function CallbackForm() {
    const { control, onSubmit, send, setSend } = useCallbackForm();

    return (
        <>
            <form className={styles["form"]} onSubmit={onSubmit}>
                <div className={styles["field"]}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field, fieldState }) => (
                            <>
                                <Input
                                    id="callback-name"
                                    name={field.name}
                                    placeholder="Your name"
                                    value={field.value}
                                    invalid={Boolean(fieldState.error)}
                                    onBlur={field.onBlur}
                                    ariaDescribedBy={
                                        fieldState.error
                                            ? NAME_ERROR_ID
                                            : undefined
                                    }
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        field.onChange(e.currentTarget.value)
                                    }
                                />
                                <div className={styles["errorTrack"]}>
                                    {fieldState.error?.message ? (
                                        <span
                                            id={NAME_ERROR_ID}
                                            className={styles["error"]}
                                            role="alert"
                                        >
                                            {fieldState.error.message}
                                        </span>
                                    ) : null}
                                </div>
                            </>
                        )}
                    />
                </div>
                <div className={styles["field"]}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                            <>
                                <Input
                                    id="callback-email"
                                    name={field.name}
                                    type="email"
                                    placeholder="Your email"
                                    value={field.value}
                                    invalid={Boolean(fieldState.error)}
                                    onBlur={field.onBlur}
                                    ariaDescribedBy={
                                        fieldState.error
                                            ? EMAIL_ERROR_ID
                                            : undefined
                                    }
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        field.onChange(e.currentTarget.value)
                                    }
                                />
                                <div className={styles["errorTrack"]}>
                                    {fieldState.error?.message ? (
                                        <span
                                            id={EMAIL_ERROR_ID}
                                            className={styles["error"]}
                                            role="alert"
                                        >
                                            {fieldState.error.message}
                                        </span>
                                    ) : null}
                                </div>
                            </>
                        )}
                    />
                </div>

                <Button variant="fill" type="submit">
                    Send
                </Button>
            </form>

            {send && (
                <Success
                    title="Your request has been submitted"
                    text="Your request has been successfully received. We will review it and get back to you as soon as possible."
                    onclick={() => setSend(false)}
                />
            )}
        </>
    );
}

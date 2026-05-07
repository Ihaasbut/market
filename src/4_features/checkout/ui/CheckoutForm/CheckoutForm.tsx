import type { ChangeEvent } from "react";
import { Controller } from "react-hook-form";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";

import type { CheckoutFormValues } from "../../model/checkoutFormSchema";
import {
    useCheckoutForm,
    type CheckoutContactDefaults,
} from "../../model/useCheckoutForm";
import styles from "./CheckoutForm.module.scss";

export type CheckoutFormProps = {
    contactDefaults: CheckoutContactDefaults;
    onSubmitSuccess: (data: CheckoutFormValues) => void | Promise<void>;
};

const DELIVERY_OPTIONS = [
    { value: "post" as const, label: "Post" },
    { value: "sdek" as const, label: "CDEK" },
];

const PAYMENT_OPTIONS = [
    {
        value: "card_on_delivery" as const,
        label: "Bank card on delivery",
    },
    {
        value: "cash_on_delivery" as const,
        label: "Cash on delivery",
    },
];

export function CheckoutForm({
    contactDefaults,
    onSubmitSuccess,
}: CheckoutFormProps) {
    const { control, handleSubmit } = useCheckoutForm(contactDefaults);

    return (
        <form
            className={styles["form"]}
            onSubmit={handleSubmit(onSubmitSuccess)}
            noValidate
        >
            <fieldset className={styles["section"]}>
                <legend className={styles["sectionTitle"]}>
                   1. Contact information
                </legend>
                <div className={styles["contactGrid"]}>
                    <div className={styles["contactRow"]}>
                        <div className={styles["field"]}>
                            <label
                                className={styles["label"]}
                                htmlFor="checkout-firstName"
                            >
                                First name
                            </label>
                            <Controller
                                name="firstName"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Input
                                            id="checkout-firstName"
                                            name={field.name}
                                            placeholder="First name"
                                            value={field.value}
                                            invalid={Boolean(fieldState.error)}
                                            onBlur={field.onBlur}
                                            ariaDescribedBy={
                                                fieldState.error
                                                    ? "checkout-firstName-err"
                                                    : undefined
                                            }
                                            onChange={(
                                                e: ChangeEvent<HTMLInputElement>,
                                            ) =>
                                                field.onChange(
                                                    e.currentTarget.value,
                                                )
                                            }
                                        />
                                        <div className={styles["errorTrack"]}>
                                            {fieldState.error?.message ? (
                                                <span
                                                    id="checkout-firstName-err"
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
                            <label
                                className={styles["label"]}
                                htmlFor="checkout-lastName"
                            >
                                Last name
                            </label>
                            <Controller
                                name="lastName"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Input
                                            id="checkout-lastName"
                                            name={field.name}
                                            placeholder="Last name"
                                            value={field.value}
                                            invalid={Boolean(fieldState.error)}
                                            onBlur={field.onBlur}
                                            ariaDescribedBy={
                                                fieldState.error
                                                    ? "checkout-lastName-err"
                                                    : undefined
                                            }
                                            onChange={(
                                                e: ChangeEvent<HTMLInputElement>,
                                            ) =>
                                                field.onChange(
                                                    e.currentTarget.value,
                                                )
                                            }
                                        />
                                        <div className={styles["errorTrack"]}>
                                            {fieldState.error?.message ? (
                                                <span
                                                    id="checkout-lastName-err"
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
                    </div>
                    <div className={styles["contactRow"]}>
                        <div className={styles["field"]}>
                            <label className={styles["label"]} htmlFor="checkout-phone">
                                Phone
                            </label>
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Input
                                            id="checkout-phone"
                                            name={field.name}
                                            type="tel"
                                            placeholder="Phone number"
                                            value={field.value}
                                            invalid={Boolean(fieldState.error)}
                                            onBlur={field.onBlur}
                                            ariaDescribedBy={
                                                fieldState.error
                                                    ? "checkout-phone-err"
                                                    : undefined
                                            }
                                            onChange={(
                                                e: ChangeEvent<HTMLInputElement>,
                                            ) =>
                                                field.onChange(
                                                    e.currentTarget.value,
                                                )
                                            }
                                        />
                                        <div className={styles["errorTrack"]}>
                                            {fieldState.error?.message ? (
                                                <span
                                                    id="checkout-phone-err"
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
                            <label className={styles["label"]} htmlFor="checkout-email">
                                Email
                            </label>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Input
                                            id="checkout-email"
                                            name={field.name}
                                            type="email"
                                            placeholder="Email"
                                            value={field.value}
                                            invalid={Boolean(fieldState.error)}
                                            onBlur={field.onBlur}
                                            ariaDescribedBy={
                                                fieldState.error
                                                    ? "checkout-email-err"
                                                    : undefined
                                            }
                                            onChange={(
                                                e: ChangeEvent<HTMLInputElement>,
                                            ) =>
                                                field.onChange(
                                                    e.currentTarget.value,
                                                )
                                            }
                                        />
                                        <div className={styles["errorTrack"]}>
                                            {fieldState.error?.message ? (
                                                <span
                                                    id="checkout-email-err"
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
                    </div>
                    <div className={styles["contactFullWidth"]}>
                        <div className={styles["field"]}>
                            <Controller
                                name="address"
                                control={control}
                                render={({ field, fieldState }) => {
                                    const len = (field.value ?? "").length;
                                    return (
                                        <>
                                            <div className={styles["commentMeta"]}>
                                                <label
                                                    className={styles["label"]}
                                                    htmlFor="checkout-address"
                                                >
                                                    Delivery address
                                                </label>
                                                <span
                                                    className={styles["charCount"]}
                                                    aria-live="polite"
                                                >
                                                    {len} / 500
                                                </span>
                                            </div>
                                            <Textarea
                                                id="checkout-address"
                                                name={field.name}
                                                placeholder="Street, building, apartment, city, postal code"
                                                value={field.value}
                                                invalid={Boolean(fieldState.error)}
                                                onBlur={field.onBlur}
                                                maxLength={500}
                                                rows={4}
                                                ariaDescribedBy={
                                                    fieldState.error
                                                        ? "checkout-address-err"
                                                        : undefined
                                                }
                                                onChange={(
                                                    e: ChangeEvent<HTMLTextAreaElement>,
                                                ) =>
                                                    field.onChange(e.currentTarget.value)
                                                }
                                            />
                                            <div className={styles["errorTrack"]}>
                                                {fieldState.error?.message ? (
                                                    <span
                                                        id="checkout-address-err"
                                                        className={styles["error"]}
                                                        role="alert"
                                                    >
                                                        {fieldState.error.message}
                                                    </span>
                                                ) : null}
                                            </div>
                                        </>
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
            </fieldset>

            <fieldset className={styles["section"]}>
                <legend className={styles["sectionTitle"]}> 2. Delivery</legend>
                <Controller
                    name="deliveryMethod"
                    control={control}
                    render={({ field, fieldState }) => (
                        <div>
                            <div
                                className={styles["radioList"]}
                                role="radiogroup"
                                aria-label="Delivery method"
                                aria-invalid={Boolean(fieldState.error)}
                                aria-describedby={
                                    fieldState.error
                                        ? "checkout-delivery-err"
                                        : undefined
                                }
                            >
                                {DELIVERY_OPTIONS.map((opt) => (
                                    <label
                                        key={opt.value}
                                        className={styles["radioRow"]}
                                    >
                                        <input
                                            type="radio"
                                            name={field.name}
                                            value={opt.value}
                                            checked={field.value === opt.value}
                                            onBlur={field.onBlur}
                                            onChange={() => field.onChange(opt.value)}
                                        />
                                        <span>{opt.label}</span>
                                    </label>
                                ))}
                            </div>
                            <div className={styles["errorTrack"]}>
                                {fieldState.error?.message ? (
                                    <span
                                        id="checkout-delivery-err"
                                        className={styles["error"]}
                                        role="alert"
                                    >
                                        {fieldState.error.message}
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    )}
                />
            </fieldset>

            <fieldset className={styles["section"]}>
                <legend className={styles["sectionTitle"]}> 3. Payment</legend>
                <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field, fieldState }) => (
                        <div>
                            <div
                                className={styles["radioList"]}
                                role="radiogroup"
                                aria-label="Payment method"
                                aria-invalid={Boolean(fieldState.error)}
                                aria-describedby={
                                    fieldState.error
                                        ? "checkout-payment-err"
                                        : undefined
                                }
                            >
                                {PAYMENT_OPTIONS.map((opt) => (
                                    <label
                                        key={opt.value}
                                        className={styles["radioRow"]}
                                    >
                                        <input
                                            type="radio"
                                            name={field.name}
                                            value={opt.value}
                                            checked={field.value === opt.value}
                                            onBlur={field.onBlur}
                                            onChange={() => field.onChange(opt.value)}
                                        />
                                        <span>{opt.label}</span>
                                    </label>
                                ))}
                            </div>
                            <div className={styles["errorTrack"]}>
                                {fieldState.error?.message ? (
                                    <span
                                        id="checkout-payment-err"
                                        className={styles["error"]}
                                        role="alert"
                                    >
                                        {fieldState.error.message}
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    )}
                />
            </fieldset>

            <fieldset className={styles["section"]}>
                <legend className={styles["sectionTitle"]}>Comment</legend>
                <div className={styles["field"]}>
                    <Controller
                        name="comment"
                        control={control}
                        render={({ field, fieldState }) => {
                            const len = (field.value ?? "").length;
                            return (
                                <>
                                    <div className={styles["commentMeta"]}>
                                        <label
                                            className={styles["label"]}
                                            htmlFor="checkout-comment"
                                        >
                                            Order notes (optional)
                                        </label>
                                        <span
                                            className={styles["charCount"]}
                                            aria-live="polite"
                                        >
                                            {len} / 300
                                        </span>
                                    </div>
                                    <Textarea
                                        id="checkout-comment"
                                        name={field.name}
                                        placeholder="Add a note for your order"
                                        value={field.value}
                                        invalid={Boolean(fieldState.error)}
                                        onBlur={field.onBlur}
                                        maxLength={300}
                                        rows={5}
                                        ariaDescribedBy={
                                            fieldState.error
                                                ? "checkout-comment-err"
                                                : undefined
                                        }
                                        onChange={(
                                            e: ChangeEvent<HTMLTextAreaElement>,
                                        ) =>
                                            field.onChange(e.currentTarget.value)
                                        }
                                    />
                                    <div className={styles["errorTrack"]}>
                                        {fieldState.error?.message ? (
                                            <span
                                                id="checkout-comment-err"
                                                className={styles["error"]}
                                                role="alert"
                                            >
                                                {fieldState.error.message}
                                            </span>
                                        ) : null}
                                    </div>
                                </>
                            );
                        }}
                    />
                </div>
            </fieldset>

            <div className={styles["submitWrap"]}>
                <Button variant="fill" type="submit">
                    Submit order
                </Button>
            </div>
        </form>
    );
}

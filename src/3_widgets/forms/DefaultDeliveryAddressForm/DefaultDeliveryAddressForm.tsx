import { useState } from "react";
import type { SubmitEventHandler } from "react";
import { updateUserProfile, type DemoUser } from "@/features/auth";
import { useAppDispatch } from "@/shared/store";
import { Button } from "@/shared/ui/Button";
import { Textarea } from "@/shared/ui/Textarea";

import styles from "./DefaultDeliveryAddressForm.module.scss";

const MAX_LEN = 500;

type DefaultDeliveryAddressFormProps = {
    user: DemoUser;
};

export function DefaultDeliveryAddressForm({
    user,
}: DefaultDeliveryAddressFormProps) {
    const dispatch = useAppDispatch();
    const [address, setAddress] = useState(user.address);
    const [saved, setSaved] = useState(false);

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setSaved(false);
        const next = address.trim();
        if (next.length > MAX_LEN) return;
        dispatch(updateUserProfile({ address: next }));
        setSaved(true);
    };

    const len = address.length;

    return (
        <form className={styles["form"]} onSubmit={handleSubmit}>
            <div className={styles["field"]}>
                <label
                    className={styles["label"]}
                    htmlFor="default-delivery-address"
                >
                    Default delivery address
                </label>
                <span className={styles["counter"]} aria-live="polite">
                    {len} / {MAX_LEN}
                </span>
                <Textarea
                    id="default-delivery-address"
                    name="address"
                    placeholder="Street, building, apartment, city, postal code"
                    value={address}
                    onChange={(e) => setAddress(e.currentTarget.value)}
                    maxLength={MAX_LEN}
                    rows={5}
                />
            </div>
            {saved ? (
                <p className={styles["success"]} role="status">
                    Address saved. It will be prefilled at checkout.
                </p>
            ) : null}
            <Button type="submit" variant="fill">
                Save address
            </Button>
        </form>
    );
}

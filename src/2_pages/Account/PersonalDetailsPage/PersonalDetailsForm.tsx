import { useState } from "react";
import type { SubmitEventHandler } from "react";
import { updateUserProfile, type DemoUser } from "@/features/auth";
import { useAppDispatch } from "@/shared/store";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import styles from "./PersonalDetailsPage.module.scss";

type PersonalDetailsFormProps = {
    user: DemoUser;
};

export function PersonalDetailsForm({ user }: PersonalDetailsFormProps) {
    const dispatch = useAppDispatch();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [phone, setPhone] = useState(user.phone);
    const [saved, setSaved] = useState(false);

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setSaved(false);
        dispatch(
            updateUserProfile({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                phone: phone.trim(),
            }),
        );
        setSaved(true);
    };

    return (
        <form className={styles["form"]} onSubmit={handleSubmit}>
            <p className={styles["hint"]}>
                Profile data is stored in this browser only (localStorage), like
                the cart and favorites.
            </p>
            <div className={styles["field"]}>
                <label className={styles["label"]} htmlFor="profile-firstName">
                    First name
                </label>
                <Input
                    id="profile-firstName"
                    name="firstName"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className={styles["field"]}>
                <label className={styles["label"]} htmlFor="profile-lastName">
                    Last name
                </label>
                <Input
                    id="profile-lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className={styles["field"]}>
                <label className={styles["label"]} htmlFor="profile-email">
                    Email
                </label>
                <p id="profile-email" className={styles["emailStatic"]}>
                    {user.email}
                </p>
                <span className={styles["fieldHint"]}>
                    Sign-in email is fixed for this demo.
                </span>
            </div>
            <div className={styles["field"]}>
                <label className={styles["label"]} htmlFor="profile-phone">
                    Phone
                </label>
                <Input
                    id="profile-phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 555 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            {saved ? (
                <p className={styles["success"]} role="status">
                    Your details have been saved.
                </p>
            ) : null}
            <Button type="submit" variant="fill">
                Save changes
            </Button>
        </form>
    );
}

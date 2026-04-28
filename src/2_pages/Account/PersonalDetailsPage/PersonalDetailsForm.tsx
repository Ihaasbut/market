import { useState } from "react";
import type { SubmitEventHandler } from "react";
import { isValidEmail, updateUserProfile, type DemoUser } from "@/features/auth";
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
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [saved, setSaved] = useState(false);

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setSaved(false);
        if (!isValidEmail(email)) {
            setEmailError("Please enter a valid email");
            return;
        }
        setEmailError(null);
        dispatch(
            updateUserProfile({
                email: email.trim(),
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
                This demo stores profile data in your browser only.
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
                <Input
                    id="profile-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError(null);
                    }}
                    invalid={Boolean(emailError)}
                />
                {emailError ? (
                    <span className={styles["error"]} role="alert">
                        {emailError}
                    </span>
                ) : null}
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

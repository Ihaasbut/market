import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    clearAuthError,
    isValidEmail,
    registerUser,
    selectAuthError,
} from "@/features/auth";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { AuthFormShell } from "@/shared/ui/AuthFormShell";
import styles from "@/shared/ui/AuthFormShell/AuthFormShell.module.scss";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Typography } from "@/shared/ui/Typography";

const MIN_PASSWORD_LENGTH = 6;

export function RegisterPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authError = useAppSelector((state) => selectAuthError(state.auth));
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmError, setConfirmError] = useState<string | null>(null);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError(null);
        dispatch(clearAuthError());
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordError(null);
        setConfirmError(null);
        dispatch(clearAuthError());
    };

    const handleConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setConfirmError(null);
        dispatch(clearAuthError());
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let ok = true;
        if (!isValidEmail(email)) {
            setEmailError("Please enter a valid email");
            ok = false;
        }
        if (password.trim().length < MIN_PASSWORD_LENGTH) {
            setPasswordError(
                `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
            );
            ok = false;
        }
        if (password !== confirmPassword) {
            setConfirmError("Passwords do not match");
            ok = false;
        }
        if (!ok) return;

        try {
            await dispatch(registerUser(email)).unwrap();
            navigate("/");
        } catch {
            /* authError in store */
        }
    };

    return (
        <AuthFormShell
            title="Create account"
            subtitle="Sign up for the demo storefront"
            footer={
                <Typography
                    variant="body-s"
                    as="p"
                    className={styles["footer"]}
                >
                    Already have an account?
                    <Link to="/login" className={styles["link"]}>
                        Sign in
                    </Link>
                  
                    <Link to="/" className={styles["link"]}>
                        Home
                    </Link>
                </Typography>
            }
        >
            <form className={styles["form"]} onSubmit={handleSubmit}>
                <div className={styles["field"]}>
                    <label
                        className={styles["label"]}
                        htmlFor="register-email"
                    >
                        Email
                    </label>
                    <Input
                        id="register-email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={handleEmailChange}
                        invalid={Boolean(emailError)}
                    />
                    {emailError ? (
                        <span className={styles["error"]} role="alert">
                            {emailError}
                        </span>
                    ) : null}
                </div>
                <div className={styles["field"]}>
                    <label
                        className={styles["label"]}
                        htmlFor="register-password"
                    >
                        Password
                    </label>
                    <Input
                        id="register-password"
                        name="password"
                        type="password"
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={handlePasswordChange}
                        invalid={Boolean(passwordError)}
                    />
                    {passwordError ? (
                        <span className={styles["error"]} role="alert">
                            {passwordError}
                        </span>
                    ) : null}
                </div>
                <div className={styles["field"]}>
                    <label
                        className={styles["label"]}
                        htmlFor="register-confirm"
                    >
                        Confirm password
                    </label>
                    <Input
                        id="register-confirm"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={handleConfirmChange}
                        invalid={Boolean(confirmError)}
                    />
                    {confirmError ? (
                        <span className={styles["error"]} role="alert">
                            {confirmError}
                        </span>
                    ) : null}
                </div>
                {authError ? (
                    <span className={styles["error"]} role="alert">
                        {authError}
                    </span>
                ) : null}
                <Button variant="fill" type="submit">Sign up</Button>
            </form>
        </AuthFormShell>
    );
}

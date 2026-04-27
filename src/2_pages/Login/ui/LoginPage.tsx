import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    clearAuthError,
    isValidEmail,
    loginUser,
    selectAuthError,
} from "@/features/auth";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { AuthFormShell } from "@/shared/ui/AuthFormShell";
import styles from "@/shared/ui/AuthFormShell/AuthFormShell.module.scss";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Typography } from "@/shared/ui/Typography";

export function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authError = useAppSelector((state) =>
        selectAuthError(state.auth),
    );
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError(null);
        dispatch(clearAuthError());
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordError(null);
        dispatch(clearAuthError());
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let ok = true;
        if (!isValidEmail(email)) {
            setEmailError("Please enter a valid email");
            ok = false;
        }
        if (password.trim().length === 0) {
            setPasswordError("Please enter your password");
            ok = false;
        }
        if (!ok) return;

        try {
            await dispatch(loginUser(email)).unwrap();
            navigate("/");
        } catch {
            /* error shown via authError */
        }
    };

    return (
        <AuthFormShell
            title="Sign in"
            subtitle="Sign in to continue shopping"
            footer={
                <Typography
                    variant="body-s"
                    as="p"
                    className={styles["footer"]}
                >
                    No account?{" "}
                    <Link
                        to="/register"
                        className={styles["link"]}
                    >
                        Create one
                    </Link>
                    {" · "}
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
                        htmlFor="login-email"
                    >
                        Email
                    </label>
                    <Input
                        id="login-email"
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
                        htmlFor="login-password"
                    >
                        Password
                    </label>
                    <Input
                        id="login-password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
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
                {authError ? (
                    <span className={styles["error"]} role="alert">
                        {authError}
                    </span>
                ) : null}
                <Button variant="fill" type="submit">Sign in</Button>
            </form>
        </AuthFormShell>
    );
}

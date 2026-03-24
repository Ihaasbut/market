import { useEffect, useState, type FormEvent } from "react";

export function useCallbackForm() {
    const [valueName, setValueName] = useState<string>("");
    const [valueEmail, setValueEmail] = useState<string>("");
    const [send, setSend] = useState<boolean>(false);

    useEffect(() => {
        if (send) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [send]);

    const onChangeValueName = (value: string) => {
        setValueName(value);
    };

    const onChangeValueEmail = (value: string) => {
        setValueEmail(value);
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSend(true);
    };

    return {
        valueName,
        valueEmail,
        setSend,
        send,
        onChangeValueName,
        onChangeValueEmail,
        onSubmit,
    };
}

import { useState, type FormEvent } from "react";

export function useCallbackForm() {
    const [valueName, setValueName] = useState<string>("");
    const [valueEmail, setValueEmail] = useState<string>("");
    const [send, setSend] = useState<boolean>(false);

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
        send,
        onChangeValueName,
        onChangeValueEmail,
        onSubmit,
    };
}
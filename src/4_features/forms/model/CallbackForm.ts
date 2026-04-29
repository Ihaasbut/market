import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { callbackFormSchema } from "./callbackFormSchema";
import type { CallbackFormValues } from "./callbackFormSchema";

export function useCallbackForm() {
    const [send, setSend] = useState(false);

    const { control, handleSubmit, reset } = useForm<CallbackFormValues>({
        resolver: zodResolver(callbackFormSchema),
        defaultValues: {
            name: "",
            email: "",
        },
        mode: "onSubmit",
    });

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

    const onSubmit = handleSubmit(() => {
        reset();
        setSend(true);
    });

    return {
        control,
        onSubmit,
        send,
        setSend,
    };
}

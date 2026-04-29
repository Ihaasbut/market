import { z } from "zod";

export const callbackFormSchema = z.object({
    name: z.string().trim().min(1, "Please enter your name"),
    email: z.string().trim().email("Please enter a valid email"),
});

export type CallbackFormValues = z.infer<typeof callbackFormSchema>;

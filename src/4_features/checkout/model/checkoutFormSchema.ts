import { z } from "zod";
import type { PlacedOrderCheckout } from "@/shared/types/placedOrderCheckout";

export const deliveryMethodSchema = z.enum(["post", "sdek"]);
export const paymentMethodSchema = z.enum(["card_on_delivery", "cash_on_delivery"]);

export const checkoutFormSchema = z.object({
    firstName: z.string().trim().min(1, "Enter your first name"),
    lastName: z.string().trim().min(1, "Enter your last name"),
    phone: z.string().trim().min(1, "Enter your phone number"),
    email: z.string().trim().email("Enter a valid email"),
    address: z
        .string()
        .trim()
        .min(1, "Enter delivery address")
        .max(500, "Address must be at most 500 characters"),
    deliveryMethod: deliveryMethodSchema,
    paymentMethod: paymentMethodSchema,
    comment: z.string().max(300, "Comment must be at most 300 characters"),
}) satisfies z.ZodType<PlacedOrderCheckout>;

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

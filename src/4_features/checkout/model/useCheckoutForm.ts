import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { checkoutFormSchema, type CheckoutFormValues } from "./checkoutFormSchema";

export type CheckoutContactDefaults = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
};

export function useCheckoutForm(contactDefaults: CheckoutContactDefaults) {
    return useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            firstName: contactDefaults.firstName,
            lastName: contactDefaults.lastName,
            phone: contactDefaults.phone,
            email: contactDefaults.email,
            address: contactDefaults.address,
            deliveryMethod: "post",
            paymentMethod: "card_on_delivery",
            comment: "",
        },
        mode: "onSubmit",
    });
}

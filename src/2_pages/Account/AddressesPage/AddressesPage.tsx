import { DefaultDeliveryAddressForm } from "@/widgets/forms/DefaultDeliveryAddressForm";
import { selectAuthUser } from "@/features/auth";
import { useAppSelector } from "@/shared/store";

import heading from "../accountPageHeading.module.scss";

export function AddressesPage() {
    const user = useAppSelector((state) => selectAuthUser(state.auth));

    if (!user) {
        return null;
    }

    return (
        <>
            <h1 className={heading["title"]}>My addresses</h1>
            <p className={heading["desc"]}>
                Your default address is used to prefill checkout. It is updated
                when you place an order with a new delivery address.
            </p>

            <DefaultDeliveryAddressForm key={user.address} user={user} />
        </>
    );
}

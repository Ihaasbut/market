import { selectAuthUser } from "@/features/auth";
import { useAppSelector } from "@/shared/store";
import heading from "../accountPageHeading.module.scss";
import { PersonalDetailsForm } from "./PersonalDetailsForm";

export function PersonalDetailsPage() {
    const user = useAppSelector((state) => selectAuthUser(state.auth));

    if (!user) {
        return null;
    }

    return (
        <>
            <h1 className={heading["title"]}>Personal details</h1>
            <p className={heading["desc"]}>
                Update your name, email, and contact information. Changes are
                saved on this device for the demo.
            </p>
            <PersonalDetailsForm user={user} />
        </>
    );
}

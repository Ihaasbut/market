import { useCallback, useMemo } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { selectAuthUser, updateUserProfile } from "@/features/auth";
import { CheckoutForm, type CheckoutFormValues } from "@/features/checkout";
import { selectCartItems } from "@/entities/cart/model";
import { CheckoutCartSidebar } from "@/entities/cart/ui/CheckoutCartSidebar";
import { placeDemoOrder } from "@/entities/order";
import { isCheckoutNavigateState } from "@/shared/lib/isCheckoutNavigateState";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { Typography } from "@/shared/ui/Typography";

import styles from "./CheckoutPage.module.scss";

export function CheckoutPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAppSelector((state) => selectAuthUser(state.auth));
    const cartItems = useAppSelector((state) => selectCartItems(state.cart));

    const checkoutProductIds = useMemo(() => {
        const raw = location.state;
        if (!isCheckoutNavigateState(raw)) {
            return null;
        }
        return [...raw.checkoutProductIds];
    }, [location.state]);

    const checkoutItems = useMemo(() => {
        if (!checkoutProductIds || checkoutProductIds.length === 0) {
            return [];
        }
        return cartItems.filter(
            (item) => item.count > 0 && checkoutProductIds.includes(item.id),
        );
    }, [cartItems, checkoutProductIds]);

    const onSubmitSuccess = useCallback(
        async (data: CheckoutFormValues) => {
            try {
                await dispatch(
                    placeDemoOrder({
                        items: checkoutItems,
                        checkout: data,
                    }),
                ).unwrap();
                dispatch(updateUserProfile({ address: data.address.trim() }));
                navigate("/account/orders", { replace: true });
            } catch {
                // keep form open; optional: toast
            }
        },
        [dispatch, checkoutItems, navigate],
    );

    const cartEmpty =
        cartItems.length === 0 || cartItems.every((item) => item.count < 1);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (cartEmpty) {
        return <Navigate to="/cart" replace />;
    }

    if (!checkoutProductIds || checkoutProductIds.length === 0) {
        return <Navigate to="/cart" replace />;
    }

    if (checkoutItems.length === 0) {
        return <Navigate to="/cart" replace />;
    }

    return (
        <div className="container">
            <div className={styles.page}>
                <div className={styles.layout}>
                    <div className={styles.main}>
                        <Link to="/cart" className={styles.back}>
                            Back to cart
                        </Link>
                        <Typography
                            variant="h4"
                            as="h1"
                            className={styles.title}
                        >
                            Checkout
                        </Typography>
                        <CheckoutForm
                            contactDefaults={{
                                firstName: user.firstName,
                                lastName: user.lastName,
                                phone: user.phone,
                                email: user.email,
                                address: user.address,
                            }}
                            onSubmitSuccess={onSubmitSuccess}
                        />
                    </div>
                    <div className={styles.sidebar}>
                        <CheckoutCartSidebar items={checkoutItems} />
                    </div>
                </div>
            </div>
        </div>
    );
}

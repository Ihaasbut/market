import cn from "classnames";
import { useCallback } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
    CANCELLED_ORDER_STATUS,
    cancelDemoOrder,
    selectOrderById,
} from "@/entities/order";
import { formatOrderDateTime } from "@/shared/lib/formatOrderDate";
import { normalizeImageUrl } from "@/shared/lib/image";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import buttonStyles from "@/shared/ui/Button/Button.module.scss";
import { Typography } from "@/shared/ui/Typography";

import heading from "../accountPageHeading.module.scss";
import styles from "./OrderDetailPage.module.scss";

function deliveryLabel(method: string): string {
    if (method === "post") return "Post";
    if (method === "sdek") return "CDEK";
    return method;
}

function paymentLabel(method: string): string {
    if (method === "card_on_delivery") {
        return "Bank card on delivery";
    }
    if (method === "cash_on_delivery") {
        return "Cash on delivery";
    }
    return method;
}

export function OrderDetailPage() {
    const { orderId } = useParams<{ orderId: string }>();
    const dispatch = useAppDispatch();
    const order = useAppSelector((state) =>
        orderId ? selectOrderById(state, orderId) : undefined,
    );

    const handleCancelOrder = useCallback(() => {
        if (!orderId) return;
        if (
            !window.confirm(
                "Cancel this order? You will not be able to restore it.",
            )
        ) {
            return;
        }
        void dispatch(cancelDemoOrder(orderId));
    }, [dispatch, orderId]);

    if (!orderId) {
        return <Navigate to="/account/orders" replace />;
    }

    if (!order) {
        return (
            <div className={styles["notFound"]}>
                <h1 className={heading["title"]}>Order not found</h1>
                <p className={heading["desc"]}>
                    This order is missing or belongs to another account.
                </p>
                <Link to="/account/orders" className={styles["backLink"]}>
                    ← Back to orders
                </Link>
            </div>
        );
    }

    const { checkout: c } = order;
    const isCancelled = order.status === CANCELLED_ORDER_STATUS;

    return (
        <>
            <Link to="/account/orders" className={styles["back"]}>
                ← Back to orders
            </Link>
            <div
                className={cn(isCancelled && styles["pageBodyCancelled"])}
            >
                <div className={styles["headerRow"]}>
                    <h1
                        className={cn(
                            heading["title"],
                            styles["orderHeading"],
                        )}
                    >
                        Order № {order.orderNumber}
                    </h1>
                    <span
                        className={cn(
                            styles["statusBadge"],
                            isCancelled && styles["statusBadgeCancelled"],
                        )}
                        aria-label={`Status: ${order.status}`}
                    >
                        {order.status}
                    </span>
                </div>
                {isCancelled ? null : (
                    <div className={styles["cancelRow"]}>
                        <button
                            type="button"
                            className={cn(
                                buttonStyles["button"],
                                buttonStyles["button-outside"],
                                styles["cancelButton"],
                            )}
                            onClick={handleCancelOrder}
                        >
                            Cancel order
                        </button>
                    </div>
                )}
                <p className={heading["desc"]}>
                    {formatOrderDateTime(order.placedAt)}
                </p>

                <section className={styles["section"]} aria-label="Items">
                <Typography
                    variant="body-l"
                    as="h2"
                    className={styles["sectionTitle"]}
                >
                    Items
                </Typography>
                <ul className={styles["lines"]}>
                    {order.lines.map((line, index) => {
                        const src = line.image
                            ? normalizeImageUrl(line.image)
                            : null;
                        return (
                            <li
                                key={`${line.productId}-${index}`}
                                className={styles["line"]}
                            >
                                {isCancelled ? null : (
                                    <Link
                                        to={`/product/${line.productId}`}
                                        className={styles["lineLink"]}
                                        aria-label={`View product: ${line.title}`}
                                    />
                                )}
                                <div className={styles["lineInner"]}>
                                    <div className={styles["thumbBox"]}>
                                        {src ? (
                                            <img
                                                src={src}
                                                alt=""
                                                className={styles["thumb"]}
                                            />
                                        ) : (
                                            <div
                                                className={cn(
                                                    styles["thumb"],
                                                    styles["thumbPh"],
                                                )}
                                            />
                                        )}
                                    </div>
                                    <div className={styles["lineBody"]}>
                                        <Typography
                                            variant="body-m"
                                            as="span"
                                            className={styles["lineTitle"]}
                                        >
                                            {line.title}
                                        </Typography>
                                        <Typography
                                            variant="body-xs"
                                            as="span"
                                            className={styles["lineMeta"]}
                                        >
                                            {line.count} × {line.unitPrice}$
                                        </Typography>
                                    </div>
                                    <Typography
                                        variant="body-m"
                                        as="span"
                                        className={styles["lineTotal"]}
                                    >
                                        {line.lineTotal}$
                                    </Typography>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>

            <section className={styles["section"]} aria-label="Delivery and payment">
                <Typography
                    variant="body-l"
                    as="h2"
                    className={styles["sectionTitle"]}
                >
                    Delivery & payment
                </Typography>
                <dl className={styles["dl"]}>
                    <div className={styles["dlRow"]}>
                        <dt>Delivery</dt>
                        <dd>{deliveryLabel(c.deliveryMethod)}</dd>
                    </div>
                    <div className={styles["dlRow"]}>
                        <dt>Delivery address</dt>
                        <dd className={styles["addressValue"]}>
                            {c.address.trim() ? c.address : "—"}
                        </dd>
                    </div>
                    <div className={styles["dlRow"]}>
                        <dt>Payment</dt>
                        <dd>{paymentLabel(c.paymentMethod)}</dd>
                    </div>
                </dl>
            </section>

            <section className={styles["section"]} aria-label="Contact">
                <Typography
                    variant="body-l"
                    as="h2"
                    className={styles["sectionTitle"]}
                >
                    Contact
                </Typography>
                <p className={styles["contactBlock"]}>
                    {c.firstName} {c.lastName}
                    <br />
                    {c.phone}
                    <br />
                    {c.email}
                </p>
                {c.comment.trim() ? (
                    <div className={styles["commentBlock"]}>
                        <Typography
                            variant="body-s"
                            as="span"
                            className={styles["commentLabel"]}
                        >
                            Comment
                        </Typography>
                        <p className={styles["commentText"]}>{c.comment}</p>
                    </div>
                ) : null}
            </section>

            <div className={styles["summary"]}>
                <div className={styles["sumRow"]}>
                    <span>Subtotal</span>
                    <span>{order.subtotal}$</span>
                </div>
                <div className={styles["sumRow"]}>
                    <span>Shipping</span>
                    <span>{order.shippingUsd}$</span>
                </div>
                <div className={styles["sumTotal"]}>
                    <span>Total</span>
                    <span>{order.total}$</span>
                </div>
            </div>
            </div>
        </>
    );
}

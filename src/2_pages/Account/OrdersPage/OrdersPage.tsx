import cn from "classnames";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import {
    CANCELLED_ORDER_STATUS,
    cancelDemoOrder,
    selectOrders,
    type DemoOrder,
} from "@/entities/order";
import { formatOrderDate } from "@/shared/lib/formatOrderDate";
import { normalizeImageUrl } from "@/shared/lib/image";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import buttonStyles from "@/shared/ui/Button/Button.module.scss";
import { Typography } from "@/shared/ui/Typography";

import heading from "../accountPageHeading.module.scss";
import styles from "./OrdersPage.module.scss";

const THUMB_LIMIT = 4;

export function OrdersPage() {
    const dispatch = useAppDispatch();
    const orders = useAppSelector((state) => selectOrders(state));

    const handleCancelOrder = useCallback(
        (orderId: string) => {
            if (
                !window.confirm(
                    "Cancel this order? You will not be able to restore it.",
                )
            ) {
                return;
            }
            void dispatch(cancelDemoOrder(orderId));
        },
        [dispatch],
    );

    if (orders.length === 0) {
        return (
            <>
                <h1 className={heading["title"]}>My orders</h1>
                <p className={heading["desc"]}>
                    View order status and past purchases.
                </p>
                <p className={styles["empty"]}>
                    You have no orders yet. Place an order at checkout — it will
                    appear here with item photos and your order number.
                </p>
            </>
        );
    }

    return (
        <>
            <h1 className={heading["title"]}>My orders</h1>
            <p className={heading["desc"]}>
                View order status and past purchases.
            </p>
            <ul className={styles["list"]}>
                {orders.map((order: DemoOrder) => {
                    const thumbs = order.lines.slice(0, THUMB_LIMIT);
                    const extra = order.lines.length - THUMB_LIMIT;
                    const isCancelled =
                        order.status === CANCELLED_ORDER_STATUS;

                    return (
                        <li key={order.id} className={styles["card"]}>
                            <Link
                                to={`/account/orders/${order.id}`}
                                className={styles["cardHitArea"]}
                                aria-label={`Order ${order.orderNumber}, open details`}
                            >
                                {"\u200b"}
                            </Link>
                            <div
                                className={cn(
                                    styles["cardSurface"],
                                    isCancelled && styles["cardBodyCancelled"],
                                )}
                            >
                                <div className={styles["cardTop"]}>
                                    <div>
                                        <div className={styles["titleRow"]}>
                                            <Typography
                                                variant="body-l"
                                                as="p"
                                                className={styles["orderNo"]}
                                            >
                                                Order № {order.orderNumber}
                                            </Typography>
                                            <span
                                                className={cn(
                                                    styles["status"],
                                                    isCancelled &&
                                                        styles["statusCancelled"],
                                                )}
                                                aria-label={`Status: ${order.status}`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>
                                        <Typography
                                            variant="body-s"
                                            as="p"
                                            className={styles["meta"]}
                                        >
                                            {formatOrderDate(order.placedAt)} ·{" "}
                                            {order.lines.length}{" "}
                                            {order.lines.length === 1
                                                ? "item"
                                                : "items"}
                                        </Typography>
                                    </div>
                                    <Typography
                                        variant="body-l"
                                        as="p"
                                        className={styles["total"]}
                                    >
                                        {order.total}$
                                    </Typography>
                                </div>
                                <div className={styles["thumbs"]}>
                                    {thumbs.map((line) => {
                                        const src = line.image
                                            ? normalizeImageUrl(line.image)
                                            : null;
                                        return (
                                            <div
                                                key={`${order.id}-${line.productId}`}
                                                className={styles["thumbWrap"]}
                                            >
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
                                                            styles["thumbPlaceholder"],
                                                        )}
                                                    />
                                                )}
                                                {line.count > 1 ? (
                                                    <span
                                                        className={
                                                            styles["countBadge"]
                                                        }
                                                        aria-label={`Quantity ${line.count}`}
                                                    >
                                                        ×{line.count}
                                                    </span>
                                                ) : null}
                                            </div>
                                        );
                                    })}
                                    {extra > 0 ? (
                                        <div
                                            className={cn(
                                                styles["thumb"],
                                                styles["moreBadge"],
                                            )}
                                            aria-label={`${extra} more items`}
                                        >
                                            +{extra}
                                        </div>
                                    ) : null}
                                </div>
                                {isCancelled ? null : (
                                    <div className={styles["cardFooter"]}>
                                        <button
                                            type="button"
                                            className={cn(
                                                buttonStyles["button"],
                                                buttonStyles["button-outside"],
                                                styles["cancelButton"],
                                                styles["cardInteractive"],
                                            )}
                                            onClick={() =>
                                                handleCancelOrder(order.id)
                                            }
                                        >
                                            Cancel order
                                        </button>
                                    </div>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

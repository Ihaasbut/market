import { findVisibleCartTarget } from "./cartFlyTarget";

const DURATION_MS = 560;

/** Иконка корзины как в UI (32×32), белый stroke на primary-фоне. */
const FLYING_CART_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
  <path d="M6.6665 9.33334H25.0532C25.4257 9.33336 25.7942 9.41144 26.1347 9.56255C26.4752 9.71366 26.7803 9.93446 27.0303 10.2107C27.2803 10.4869 27.4696 10.8125 27.5861 11.1664C27.7026 11.5203 27.7436 11.8946 27.7065 12.2653L26.9065 20.2654C26.8407 20.9234 26.5328 21.5334 26.0425 21.9772C25.5522 22.4209 24.9145 22.6667 24.2532 22.6667H11.5198C10.9031 22.6669 10.3054 22.4534 9.82843 22.0625C9.35145 21.6716 9.02471 21.1274 8.90384 20.5227L6.6665 9.33334Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.6665 9.33333L5.5865 5.00933C5.51427 4.721 5.34777 4.46508 5.11345 4.28221C4.87912 4.09934 4.59041 4.00001 4.29317 4H2.6665" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.6665 28H13.3332M21.3335 28H24.0002" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`.trim();

/**
 * Анимация «полёта» к иконке корзины в шапке; по завершении вызывает onArrived (например dispatch).
 * Не требует React-контекста: только DOM и координаты.
 */
export function flyToCartThen(
    sourceEl: HTMLElement | null,
    onArrived: () => void,
): void {
    const target = findVisibleCartTarget();
    if (!sourceEl || !target) {
        onArrived();
        return;
    }

    const sr = sourceEl.getBoundingClientRect();
    const tr = target.getBoundingClientRect();
    const size = 64;
    const startX = sr.left + sr.width / 2 - size / 2;
    const startY = sr.top + sr.height / 2 - size / 2;
    const endX = tr.left + tr.width / 2 - size / 2;
    const endY = tr.top + tr.height / 2 - size / 2;
    const dx = endX - startX;
    const dy = endY - startY;

    const el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.style.cssText = [
        "position:fixed",
        "z-index:9999",
        "pointer-events:none",
        `left:${startX}px`,
        `top:${startY}px`,
        `width:${size}px`,
        `height:${size}px`,
        "border-radius:50%",
        "background:var(--color-accent)",
        "border:2px solid rgba(255,255,255,0.45)",
        "box-shadow:0 6px 20px rgba(66,149,228,0.45),0 2px 8px rgba(0,0,0,0.12)",
        "display:flex",
        "align-items:center",
        "justify-content:center",
        "transform:translate(0,0) scale(1)",
        "opacity:1",
    ].join(";");

    el.innerHTML = FLYING_CART_SVG;
    document.body.appendChild(el);

    let finished = false;
    const cleanup = () => {
        if (finished) return;
        finished = true;
        el.removeEventListener("transitionend", onTransitionEnd);
        el.remove();
        onArrived();
    };

    const onTransitionEnd = (e: TransitionEvent) => {
        if (e.propertyName === "transform") {
            cleanup();
        }
    };

    el.addEventListener("transitionend", onTransitionEnd);
    window.setTimeout(cleanup, DURATION_MS + 120);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            el.style.transition = `transform ${DURATION_MS}ms cubic-bezier(0.33, 1, 0.68, 1), opacity ${DURATION_MS}ms ease-out`;
            el.style.transform = `translate(${dx}px, ${dy}px) scale(0.4)`;
            el.style.opacity = "0.92";
        });
    });
}

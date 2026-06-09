type TelegramEvent =
    | "viewportChanged"
    | "safeAreaChanged"
    | "contentSafeAreaChanged";

type TelegramViewportEvent = {
    isStateStable: boolean;
};

type TelegramSafeAreaInsets = {
    top?: number;
};

type TelegramWebApp = {
    viewportHeight?: number;
    viewportStableHeight?: number;
    isFullscreen?: boolean;
    safeAreaInset?: TelegramSafeAreaInsets;
    contentSafeAreaInset?: TelegramSafeAreaInsets;
    ready: () => void;
    expand: () => void;
    disableVerticalSwipes?: () => void;
    requestFullscreen?: () => void;
    setHeaderColor?: (color: string) => void;
    onEvent: (
        eventType: TelegramEvent,
        handler: (event: TelegramViewportEvent) => void,
    ) => void;
};

type TelegramWindow = Window & {
    Telegram?: {
        WebApp?: TelegramWebApp;
    };
};

const FALLBACK_VIEWPORT_HEIGHT = "100vh";

function toCssPixels(value?: number) {
    return typeof value === "number" && Number.isFinite(value)
        ? `${value}px`
        : undefined;
}

function getTelegramWebApp() {
    return (window as TelegramWindow).Telegram?.WebApp;
}

function syncViewportVars(webApp?: TelegramWebApp) {
    const root = document.documentElement;
    const fallbackHeight = `${window.innerHeight}px`;
    const stableViewportHeight =
        toCssPixels(webApp?.viewportStableHeight) ??
        toCssPixels(webApp?.viewportHeight) ??
        fallbackHeight;
    const safeTopInset = webApp?.isFullscreen
        ? (webApp?.contentSafeAreaInset?.top ?? webApp?.safeAreaInset?.top ?? 0)
        : 0;

    root.style.setProperty("--app-stable-height", stableViewportHeight);
    root.style.setProperty("--tg-safe-top", `${safeTopInset}px`);
}

export function initTelegramWebApp() {
    const webApp = getTelegramWebApp();
    const handleBrowserResize = () => syncViewportVars(webApp);

    document.documentElement.style.setProperty(
        "--app-stable-height",
        FALLBACK_VIEWPORT_HEIGHT,
    );
    document.documentElement.style.setProperty("--tg-safe-top", "0px");

    window.addEventListener("resize", handleBrowserResize);

    if (!webApp) {
        syncViewportVars();
        return;
    }

    const handleViewportChange = (event: TelegramViewportEvent) => {
        if (!event.isStateStable) return;

        syncViewportVars(webApp);
    };

    const handleSafeAreaChange = () => syncViewportVars(webApp);

    webApp.ready();
    webApp.expand();
    webApp.disableVerticalSwipes?.();
    webApp.setHeaderColor?.("bg_color");
    webApp.requestFullscreen?.();
    syncViewportVars(webApp);

    webApp.onEvent("viewportChanged", handleViewportChange);
    webApp.onEvent("safeAreaChanged", handleSafeAreaChange);
    webApp.onEvent("contentSafeAreaChanged", handleSafeAreaChange);
}

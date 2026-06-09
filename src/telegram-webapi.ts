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
const TELEGRAM_WEBAPP_SCRIPT_ID = "telegram-webapp-sdk";
const TELEGRAM_WEBAPP_SCRIPT_SRC =
    "https://telegram.org/js/telegram-web-app.js?62";

let isTelegramWebAppInitialized = false;

function toCssPixels(value?: number) {
    return typeof value === "number" && Number.isFinite(value)
        ? `${value}px`
        : undefined;
}

function getTelegramWebApp() {
    return (window as TelegramWindow).Telegram?.WebApp;
}

function loadTelegramWebAppScript() {
    const existingScript = document.getElementById(
        TELEGRAM_WEBAPP_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (existingScript) {
        return Promise.resolve(getTelegramWebApp());
    }

    return new Promise<TelegramWebApp | undefined>((resolve) => {
        const script = document.createElement("script");

        script.id = TELEGRAM_WEBAPP_SCRIPT_ID;
        script.src = TELEGRAM_WEBAPP_SCRIPT_SRC;
        script.async = true;
        script.onload = () => resolve(getTelegramWebApp());
        script.onerror = () => resolve(undefined);

        document.head.append(script);
    });
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

function setupTelegramWebApp(webApp: TelegramWebApp) {
    if (isTelegramWebAppInitialized) {
        syncViewportVars(webApp);
        return;
    }

    isTelegramWebAppInitialized = true;

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

export function initTelegramWebApp() {
    document.documentElement.style.setProperty(
        "--app-stable-height",
        FALLBACK_VIEWPORT_HEIGHT,
    );
    document.documentElement.style.setProperty("--tg-safe-top", "0px");

    window.addEventListener("resize", () =>
        syncViewportVars(getTelegramWebApp()),
    );

    const webApp = getTelegramWebApp();

    if (webApp) {
        setupTelegramWebApp(webApp);
        return;
    }

    syncViewportVars();

    void loadTelegramWebAppScript().then((loadedWebApp) => {
        if (!loadedWebApp) {
            syncViewportVars();
            return;
        }

        setupTelegramWebApp(loadedWebApp);
    });
}

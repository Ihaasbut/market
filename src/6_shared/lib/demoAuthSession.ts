/** Same key as demo auth in `@/features/auth/lib/portfolioMockAuth`. */
export const PORTFOLIO_DEMO_USER_STORAGE_KEY = "portfolio_demo_user";

export function readPersistedDemoUserEmail(): string | null {
    if (typeof window === "undefined") {
        return null;
    }
    const raw = localStorage.getItem(PORTFOLIO_DEMO_USER_STORAGE_KEY);
    if (!raw) {
        return null;
    }
    try {
        const data = JSON.parse(raw) as { email?: unknown };
        return typeof data.email === "string" ? data.email : null;
    } catch {
        return null;
    }
}

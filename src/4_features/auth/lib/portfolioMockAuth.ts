/**
 * Demo auth for portfolio: no backend, localStorage only.
 * Replace with a real API and tokens in production.
 */
const STORAGE_KEY = "portfolio_demo_user";

export type DemoUser = {
    email: string;
    registeredAt: number;
};

export function saveDemoUser(email: string): void {
    const payload: DemoUser = {
        email: email.trim(),
        registeredAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function getDemoUser(): DemoUser | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
        const data = JSON.parse(raw) as DemoUser;
        if (typeof data?.email === "string") return data;
        return null;
    } catch {
        return null;
    }
}

export function clearDemoUser(): void {
    localStorage.removeItem(STORAGE_KEY);
}

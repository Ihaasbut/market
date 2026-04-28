/**
 * Demo auth for portfolio: no backend, localStorage only.
 * Replace with a real API and tokens in production.
 */
const STORAGE_KEY = "portfolio_demo_user";

export type DemoUser = {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    registeredAt: number;
};

export function saveDemoUser(email: string): void {
    const payload: DemoUser = {
        email: email.trim(),
        firstName: "",
        lastName: "",
        phone: "",
        registeredAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function normalizeUser(data: unknown): DemoUser | null {
    if (!data || typeof data !== "object") return null;
    const o = data as Record<string, unknown>;
    if (typeof o.email !== "string") return null;
    return {
        email: o.email,
        firstName: typeof o.firstName === "string" ? o.firstName : "",
        lastName: typeof o.lastName === "string" ? o.lastName : "",
        phone: typeof o.phone === "string" ? o.phone : "",
        registeredAt: typeof o.registeredAt === "number" ? o.registeredAt : Date.now(),
    };
}

export function getDemoUser(): DemoUser | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
        return normalizeUser(JSON.parse(raw) as unknown);
    } catch {
        return null;
    }
}

export function writeDemoUser(user: DemoUser): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearDemoUser(): void {
    localStorage.removeItem(STORAGE_KEY);
}

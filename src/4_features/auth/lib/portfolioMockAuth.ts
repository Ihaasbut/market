/**
 * Demo auth for portfolio: no backend, localStorage only.
 * Replace with a real API and tokens in production.
 */
import { PORTFOLIO_DEMO_USER_STORAGE_KEY } from "@/shared/lib/demoAuthSession";

export type DemoAccount = {
    email: string;
    password: string;
};

export const DEMO_ACCOUNTS: readonly DemoAccount[] = [
    { email: "123@gmail.com", password: "123" },
    { email: "456@gmail.com", password: "123" },
] as const;

export function isDemoLoginCredentials(email: string, password: string): boolean {
    const e = email.trim().toLowerCase();
    return DEMO_ACCOUNTS.some(
        (a) => a.email.toLowerCase() === e && a.password === password,
    );
}

export function isAllowedDemoSessionEmail(email: string): boolean {
    const e = email.trim().toLowerCase();
    return DEMO_ACCOUNTS.some((a) => a.email.toLowerCase() === e);
}

export type DemoUser = {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    registeredAt: number;
};

const PROFILE_STORAGE_PREFIX = "portfolio_demo_profile_v1:";

function profileKey(email: string): string {
    return `${PROFILE_STORAGE_PREFIX}${email.trim().toLowerCase()}`;
}

type PersistedProfile = {
    firstName: string;
    lastName: string;
    phone: string;
    registeredAt: number;
};

function normalizeProfile(data: unknown): PersistedProfile | null {
    if (!data || typeof data !== "object") return null;
    const o = data as Record<string, unknown>;
    return {
        firstName: typeof o.firstName === "string" ? o.firstName : "",
        lastName: typeof o.lastName === "string" ? o.lastName : "",
        phone: typeof o.phone === "string" ? o.phone : "",
        registeredAt: typeof o.registeredAt === "number" ? o.registeredAt : Date.now(),
    };
}

function readPersistedProfileForEmail(email: string): PersistedProfile | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(profileKey(email));
    if (!raw) return null;
    try {
        return normalizeProfile(JSON.parse(raw) as unknown);
    } catch {
        return null;
    }
}

function writePersistedProfileForEmail(user: DemoUser): void {
    if (typeof window === "undefined") return;
    const payload: PersistedProfile = {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        registeredAt: user.registeredAt,
    };
    localStorage.setItem(profileKey(user.email), JSON.stringify(payload));
}

/** Сессия: кто залогинен. Профильные поля при логине подмешиваются из ключа по email. */
export function saveDemoUser(email: string): void {
    const trimmed = email.trim();
    const persisted = readPersistedProfileForEmail(trimmed);
    const payload: DemoUser = {
        email: trimmed,
        firstName: persisted?.firstName ?? "",
        lastName: persisted?.lastName ?? "",
        phone: persisted?.phone ?? "",
        registeredAt: persisted?.registeredAt ?? Date.now(),
    };
    localStorage.setItem(
        PORTFOLIO_DEMO_USER_STORAGE_KEY,
        JSON.stringify(payload),
    );
}

function mergeSessionWithPersistedProfile(user: DemoUser): DemoUser {
    const persisted = readPersistedProfileForEmail(user.email);
    if (persisted) {
        return {
            ...user,
            firstName: persisted.firstName,
            lastName: persisted.lastName,
            phone: persisted.phone,
            registeredAt: persisted.registeredAt,
        };
    }
    if (user.firstName || user.lastName || user.phone) {
        writePersistedProfileForEmail(user);
    }
    return user;
}

export function hydrateDemoUserFromStorage(): DemoUser | null {
    const user = getDemoUser();
    if (!user) return null;
    if (!isAllowedDemoSessionEmail(user.email)) {
        clearDemoUser();
        return null;
    }
    return mergeSessionWithPersistedProfile(user);
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
    const raw = localStorage.getItem(PORTFOLIO_DEMO_USER_STORAGE_KEY);
    if (!raw) return null;
    try {
        return normalizeUser(JSON.parse(raw) as unknown);
    } catch {
        return null;
    }
}

export function writeDemoUser(user: DemoUser): void {
    localStorage.setItem(PORTFOLIO_DEMO_USER_STORAGE_KEY, JSON.stringify(user));
    writePersistedProfileForEmail(user);
}

export function clearDemoUser(): void {
    localStorage.removeItem(PORTFOLIO_DEMO_USER_STORAGE_KEY);
}

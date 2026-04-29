export type { DemoUser } from "./lib/portfolioMockAuth";
export {
    clearDemoUser,
    getDemoUser,
    DEMO_ACCOUNTS,
    hydrateDemoUserFromStorage,
    isAllowedDemoSessionEmail,
    isDemoLoginCredentials,
    saveDemoUser,
    writeDemoUser,
} from "./lib/portfolioMockAuth";
export { isValidEmail } from "./lib/isValidEmail";
export * from "./model";

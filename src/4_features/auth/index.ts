export type { DemoUser } from "./lib/portfolioMockAuth";
export {
    clearDemoUser,
    DEMO_LOGIN_EMAIL,
    DEMO_LOGIN_PASSWORD,
    getDemoUser,
    hydrateDemoUserFromStorage,
    isDemoLoginCredentials,
    saveDemoUser,
    writeDemoUser,
} from "./lib/portfolioMockAuth";
export { isValidEmail } from "./lib/isValidEmail";
export * from "./model";

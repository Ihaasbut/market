/**
 * Старый единый localStorage (до split по email) переносим только в этот аккаунт,
 * чтобы второй демо-пользователь никогда не получал чужие товары.
 * Должен совпадать с первым элементом DEMO_ACCOUNTS в auth.
 */
export const DEMO_LEGACY_STORAGE_OWNER_EMAIL = "123@gmail.com";

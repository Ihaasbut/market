# Market

Демо-витрина (React + Vite + Redux). В демо два аккаунта:

| Email           | Пароль |
|-----------------|--------|
| `123@gmail.com` | `123`  |
| `456@gmail.com` | `123`  |

У каждого email свои ключи в localStorage: корзина `market_cart_v1:<email>`, избранное `market_favorites_v1:<email>`, недавно просмотренные `market_recently_viewed_product_ids_v1:<email>`, **профиль (имя, фамилия, телефон)** — `portfolio_demo_profile_v1:<email>`. Сессия (`portfolio_demo_user`) сбрасывается при выходе; профиль и корзина по email **остаются**, при повторном входе подтягиваются снова.

Регистрация недоступна, только **Sign in**.

## Запуск

```bash
npm install
npm run dev
```

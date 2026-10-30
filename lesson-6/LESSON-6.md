# LESSON-6 — Защищённые маршруты, AuthContext, Outlet и API авторизации

Ветка: `lesson-6`

## Запуск

```bash
npm ci
npm run dev      # http://localhost:5173
npm run build    # прод-сборка
npm run lint     # ESLint
```

## Чеклист

- [x] **ProtectedRoute + useAuth** — 3 балла
    - [x] `useContext` для доступа к авторизации + `<Outlet />`
    - [x] Редирект через `<Navigate replace />`
    - [x] Поведение корректно при обновлении страницы
- [x] **LoginPage** — 3 балла
    - [x] Логин через `POST /auth/login`, токен в `localStorage`
    - [x] Контекст обновляется корректно
    - [x] После логина — редирект на `/profile`
- [x] **ProfilePage** — 3 балла
    - [x] Проверка авторизации работает
    - [x] Имя пользователя загружается через `GET /users/me`
    - [x] Данные восстанавливаются после F5
- [x] **PublicPage + выход** — 3 балла (бонус)
    - [x] Кнопка «Выйти» очищает токен и контекст
    - [x] Редирект на `/login` через `navigate("/login", { replace: true })`
    - [x] После выхода `/profile` недоступен

**Итого: 12 / 12 баллов.**

## Проверка

```bash
npx tsc --noEmit   # без ошибок
npx eslint .       # без ошибок
npm run build      # успешно
```

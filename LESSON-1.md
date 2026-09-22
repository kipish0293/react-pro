# LESSON-N — FSD, сущности, features, страницы

Ветка: `lesson-N`

## Запуск

```bash
npm ci
npm run dev      # http://localhost:5173
npm run build    # прод-сборка
npm run lint     # ESLint
```

## Что сделано

### 1. Проект по FSD — 3 балла

Структура слоёв в `src/`:

```
src/
├── app/          — инициализация приложения (App.tsx, main.tsx, index.css)
├── pages/        — страницы (pages/tasks)
├── widgets/      — (пока пусто, задел на будущее)
├── features/     — пользовательские действия (features/taskList)
├── entities/     — бизнес-сущности (entities/task)
└── shared/       — переиспользуемое (shared/ui/FilterButton)
```

У каждого слайса есть `index.ts` — публичный API. Импорты идут **только через него**, не по внутренним путям.

- `src/entities/task/index.ts` — экспортирует `Task`, `TaskCard`
- `src/features/taskList/index.ts` — экспортирует `TaskList`, `useTasks`, `Filter`
- `src/shared/index.ts` — экспортирует `FilterButton`

Настроены алиасы в `tsconfig.app.json` → `paths`:

```json
"features/*": ["./src/features/*"],
"entities/*": ["./src/entities/*"],
"shared/*":   ["./src/shared/*"]
```

Резолвинг работает в трёх местах:

- TypeScript — через `paths`
- ESLint — через `eslint-import-resolver-typescript`
- Vite — через плагин `vite-tsconfig-paths`

Границы слоёв контролируются `eslint-plugin-boundaries` (правило `boundaries/dependencies`). Импорт «вверх» по слоям запрещён.

### 2. Сущность Task — 3 балла

`src/entities/task/`

- `model/types.ts` — тип `Task`:
  ```ts
  type Task = { id: string; title: string; completed: boolean };
  ```
- `ui/TaskCard.tsx` — карточка задачи. Принимает `task: Task` через пропсы, отображает заголовок и чекбокс.
- `ui/TaskCard.module.css` — стили карточки (CSS Modules).
- `index.ts` — публичный API сущности.

### 3. Компонент «Список задач» — 3 балла

`src/features/taskList/`

- `model/useTasks.ts` — кастомный хук:
  - хранит `tasks` и `filter` в `useState`,
  - `removeTask(id)` удаляет задачу иммутабельно (через `filter`),
  - `tasks` возвращает уже **отфильтрованный** массив (`useMemo`),
  - API: `{ tasks, filter, setFilter, removeTask }`.
- `ui/TaskList.tsx` — рендерит кнопки фильтров и список задач. Использует `TaskCard` из `entities/task` и `FilterButton` из `shared`.
- `ui/TaskList.module.css` — стили списка.
- `index.ts` — публичный API фичи.

### 4. Вывод задач на странице — 2 балла

`src/pages/tasks/ui/TasksPage.tsx` — страница «Задачи». Импортирует `TaskList` из `features/taskList` и рендерит его.

`src/app/App.tsx` — корневой компонент, рендерит `TasksPage`.

`src/app/main.tsx` — точка входа, монтирует `App` в `#root`.

### Бонус. FilterButton в shared — 1 балл

`src/shared/ui/FilterButton/`

- `FilterButton.tsx` — кнопка с пропсами `active`, `onClick`, `children`.
- `FilterButton.module.css` — стили (обычное и активное состояние).
- `index.ts` — публичный API компонента.

Используется в `TaskList` для кнопок фильтрации: `active={filter === value}`.

## Чеклист

- [x] **Проект по FSD** — 3 балла
  - [x] Слои `app / pages / widgets / features / entities / shared` созданы
  - [x] У каждого слайса есть `index.ts` (public API)
  - [x] Настроены `paths` в tsconfig + резолверы для ESLint и Vite
  - [x] Границы слоёв контролируются `eslint-plugin-boundaries`
- [x] **Сущность Task** — 3 балла
  - [x] Тип `Task` в `entities/task/model/types.ts`
  - [x] Компонент `TaskCard` в `entities/task/ui`
  - [x] Стили через CSS Modules
  - [x] Публичный API в `entities/task/index.ts`
- [x] **Список задач** — 3 балла
  - [x] Хук `useTasks` с фильтрацией и удалением
  - [x] Компонент `TaskList` в `features/taskList/ui`
  - [x] Проброс пропсов в `TaskCard`
  - [x] Использование `useState` в хуке
- [x] **Вывод задач на странице** — 2 балла
  - [x] `TasksPage` в `pages/tasks`
  - [x] `TaskList` отрендерен на странице
  - [x] `App` рендерит `TasksPage`
- [x] **Бонус: FilterButton в shared** — 1 балл
  - [x] Компонент в `shared/ui/FilterButton`
  - [x] Используется в `TaskList`

**Итого: 12 / 12 баллов.**

## Проверка

```bash
npx tsc --noEmit   # типы — без ошибок
npx eslint .       # линтер — без ошибок и предупреждений
npm run build      # сборка — успешна
npm run dev        # приложение запускается
```

Поведение в UI:

- отображается список из 4 задач;
- фильтры «Все / Выполненные / Невыполненные» переключают список;
- кнопка удаления убирает задачу из списка без перезагрузки страницы.

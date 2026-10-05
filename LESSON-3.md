# LESSON-3 — RTK Query: `createApi`, `injectEndpoints`, кэш и состояния

Ветка: `lesson-3`

## Запуск

```bash
npm ci
npm run dev      # http://localhost:5173
npm run build    # прод-сборка
npm run lint     # ESLint
```

## Чеклист

- [x] **API-модуль через RTK Query** — 3 балла
  - [x] `createApi` + `fetchBaseQuery` настроены
  - [x] `reducerPath`, `baseUrl`, `tagTypes`
  - [x] `getTasks` возвращает `Task[]` через `transformResponse`
  - [x] Экспортирован хук `useGetTasksQuery`
- [x] **Отображение задач** — 3 балла
  - [x] `useTasks` использует `useGetTasksQuery`
  - [x] Данные копируются в локальный `useState` + добавил useRef для ухода от цикла и нескольких ререндеров
  - [x] `TaskList` рендерит список `TaskCard`
- [x] **Локальное удаление** — 3 балла
  - [x] `removeTask(id)` в `useTasks`
  - [x] Удаление только локальное, без запросов на сервер
  - [x] После удаления задача исчезает из UI
- [x] **Бонус: общий `baseApi` + `injectEndpoints`** — 3 балла
  - [x] `baseApi` в `shared/api` с `reducerPath: 'api'` и `tagTypes: ['Tasks']`
  - [x] `tasksApi` через `baseApi.injectEndpoints(...)`
  - [x] `baseApi.reducer` + `baseApi.middleware` в store один раз
  - [x] `useGetTasksQuery` работает без изменений импортов

**Итого: 12 / 12 баллов.**

## Что сделано

### 1. API-модуль через RTK Query

`src/entities/task/api/tasksApi.ts` — эндпоинт `getTasks` запрашивает `todos` у `jsonplaceholder`, `transformResponse` возвращает `Task[]` без преобразований. Экспортирован хук `useGetTasksQuery`.

```ts
getTasks: build.query<Task[], void>({
  query: () => 'todos',
  transformResponse: (response: Task[]): Task[] => response,
  providesTags: ['Tasks'],
})
```

- `reducerPath` унифицирован через `baseApi` (см. бонус).
- `baseUrl: 'https://jsonplaceholder.typicode.com/'` — со слэшем в конце, `query: () => 'todos'` без ведущего слэша.
- `tagTypes: ['Tasks']` — для будущей инвалидации кэша.

### 2. Отображение задач

`src/features/taskList/model/useTasks.ts` — данные тянутся через `useGetTasksQuery`, копируются в локальный `useState` один раз (защита от бесконечного цикла — условие `tasks.length === 0`).

- `isLoading` / `isError` / `refetch` прокинуты в `TaskList` для состояний «Загрузка…», «Ошибка», кнопки «Обновить».
- `filteredTasks` считается через `useMemo` с зависимостями `[tasks, filter]`.
- `TaskList` рендерит `TaskCard` для каждой задачи; при пустом списке — «Задач нет».

### 3. Локальное удаление

`removeTask(id)` в `useTasks` использует `useCallback` + функциональное обновление `setTasks((prev) => prev.filter(...))`. Никаких запросов на сервер — jsonplaceholder их всё равно не сохраняет. После удаления задача исчезает из UI, `refetch` не затирает локальные правки (копирование выполняется один раз).

### Бонус. Общий `baseApi` + `injectEndpoints`

`src/shared/api/baseApi.ts` — единый экземпляр RTK Query:

```ts
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Tasks'],
  endpoints: () => ({}),
});
```

`src/app/store.ts` — `baseApi.reducer` и `baseApi.middleware` подключены **один раз**:

```ts
export const store = configureStore({
  reducer: { [baseApi.reducerPath]: baseApi.reducer },
  middleware: (gDM) => gDM().concat(baseApi.middleware),
});
```

`tasksApi` переписан на `baseApi.injectEndpoints`, имя хука `useGetTasksQuery` сохранено — импорты в компонентах не менялись.

## Проверка

```bash
npx tsc --noEmit   # без ошибок
npx eslint .       # без ошибок
npm run build      # успешно
```

UI: задачи загружаются с `jsonplaceholder/todos`, фильтры переключают список, удаление и toggle работают локально, при `refetch` данные обновляются, но не сбрасывают локальные удаления (пока список не пуст).
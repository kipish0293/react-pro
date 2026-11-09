# LESSON-7 — esbuild & swc: app, lib, prod/dev, code splitting

Ветка: `lesson-7`

## Запуск

```bash
npm ci
npm run build       # сборка lib + app
npm run dev         # dev-режим приложения с watch
npm run typecheck   # tsc --noEmit для app и lib
```

## Чеклист

- [x] **Сборка приложения через esbuild** — 3 балла
  - [x] `bundle: true`, `minify: true`, `sourcemap: true`
  - [x] Tree shaking работает: неиспользуемые экспорты из `utils.ts` не попали в бандл
  - [x] Динамический `import()` создаёт отдельный чанк
- [x] **Сборка библиотеки через esbuild** — 3 балла
  - [x] Несколько entry points: `index.ts`, `math.ts`, `string.ts`
  - [x] `react` и `lodash` исключены через `external`
  - [x] Вывод в `esm` и `cjs`
- [x] **Production и dev-сборка** — 3 балла
  - [x] dev: watch, без minify
  - [x] prod: minify, sourcemap, tree shaking
  - [x] Переключение через аргумент CLI (`dev` / `production`)
- [x] **swc для библиотеки** — 1.5 балла (бонус)
  - [x] TypeScript → JavaScript через `.swcrc`
  - [x] `module.type: "es6"` и `"commonjs"`
  - [x] `minify`, `sourceMaps`
- [x] **Code splitting по маршрутам** — 1.5 балла (бонус)
  - [x] `routes.ts` с динамическими `import()`
  - [x] Каждая страница — отдельный чанк
  - [x] Неиспользуемые маршруты не грузятся на старте

**Итого: 12 / 12 баллов.**

## Что сделано

## Проверка

```bash
npm run typecheck   # tsc --noEmit в app и lib
npm run build       # lib (esbuild + swc) → app
```

Переключение режимов:

- `npm run build` → prod (minify, sourcemap).
- `npm run dev` → watch, без minify, пересборка при изменении файлов.

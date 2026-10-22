# LESSON-4 — React Hook Form + Zod, динамические поля, wizard на useActionState

Ветка: `lesson-4`

## Запуск

```bash
npm ci
npm run dev      # http://localhost:5173
npm run build    # прод-сборка
npm run lint     # ESLint
```

## Чеклист

- [x] **Форма регистрации пользователя** — 4 балла
    - [x] Форма на React Hook Form
    - [x] Все поля обязательны (username, email, password, confirmPassword)
    - [x] Валидация: email содержит @, пароль ≥ 6 символов, пароли совпадают
    - [x] Ошибки отображаются рядом с соответствующими полями
- [x] **Подключение Zod** — 2 балла
    - [x] Схема registerSchema в model
    - [x] zodResolver(registerSchema) в useForm
    - [x] Сообщения об ошибках показываются под полями через errors.field.message
- [x] **Динамическое поле: социальные ссылки** — 4 балла
    - [x] useFieldArray({ control, name: "socialLinks" })
    - [x] Форма корректно обрабатывает массив ссылок
    - [x] Добавление (append) и удаление (remove) работают без ошибок
    - [x] Каждое поле валидируется как URL
- [x] **Бонус: wizard на useActionState (React 19)** — 2 балла
    - [x] Форма в 2 шага через useActionState
    - [x] Состояния pending / error / success отображаются в UI
    - [x] Zod-валидация внутри экшена

**Итого: 12 / 12 баллов.**

## Что сделано

### 1. Форма регистрации на RHF + Zod

`src/features/register/model/schema.ts` — единая схема registerSchema:

```ts
export const registerSchema = z
    .object({
        username: z.string().min(1, 'Имя пользователя обязательно').min(3, 'Имя пользователя должно быть не менее 3 символов'),
        email: z.email({ error: 'Некорректный формат email' }),
        password: z.string().min(1, 'Пароль обязателен').min(6, 'Пароль должен быть не менее 6 символов'),
        confirmPassword: z.string().min(1, 'Подтверждение пароля обязательно'),
        socialLinks: z.array(socialLinksSchema),
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: 'Пароли не совпадают',
        path: ['confirmPassword'],
    })
```

- Все поля — обязательные через `.min(1, "...")`.
- Email валидируется встроенным `z.email()` (в Zod 4 это отдельная функция).
- Проверка совпадения паролей — через `.refine()` на уровне объекта с `path: ["confirmPassword"]`, чтобы ошибка привязалась именно к полю подтверждения.
- Тип `RegistrationValues = z.infer<typeof registerSchema>` — единый источник правды.

`src/features/register/ui/RhfForm.tsx` — форма на RHF:

```tsx
const {
    register,
    control,
    handleSubmit,
    formState: { errors, touchedFields },
} = useForm<RegistrationValues>({
    resolver: zodResolver(registerSchema),
    defaultValues,
    mode: 'onTouched',
})
```

- `mode: "onTouched"` — ошибки появляются после первого взаимодействия с полем, а не сразу при монтировании.
- Класс `inputError` навешивается по условию `touchedFields.<field> && errors.<field>`.
- Текст ошибки рендерится через `errors.<field>?.message` под соответствующим инпутом.

### 2. Динамическое поле «Социальные ссылки»

`src/features/register/model/schema.ts`:

```ts
export const socialLinksSchema = z.object({
    url: z
        .string()
        .min(1, 'Ссылка обязательна')
        .pipe(z.url({ error: 'Некорректный URL' })),
})
```

- `.min(1)` даёт отдельное сообщение «Ссылка обязательна» для пустого поля.
- `.pipe(z.url(...))` — валидация URL в стиле Zod 4 (`.url()` на строке deprecated).

`src/features/register/ui/RhfForm.tsx` — подключение массива:

```tsx
const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks',
})
```

- В `defaultValues` массив `socialLinks: [{ url: "" }]` — по умолчанию одна ссылка.
- Каждый инпут регистрируется как `register(\`socialLinks.${index}.url\`)`.
- `key={field.id}` (не `index`!) — иначе при удалении строки посередине значения перепутаются.
- Кнопки «Добавить» / «Удалить» — `type="button"`, чтобы не отправлять форму.
- Ошибки массива читаются через `errors.socialLinks?.[index]?.url?.message` (опциональная цепочка обязательна).
- `.min(1)` на массиве не ставим — по задаче пользователь может удалить любое количество ссылок, включая все.

### 3. Wizard на useActionState (React 19)

`src/features/subscription-wizard/model/form.types.ts`:

```ts
export const schema = z.object({
    email: z
        .string()
        .min(1, 'Email обязателен')
        .pipe(z.email({ error: 'Некорректный формат email' })),
})

export type WizardStep = 1 | 2
export type FormIntent = 'next' | 'back' | 'confirm'

export type FormState = {
    step: WizardStep
    email: string
    success: boolean
    errors: Partial<Record<keyof FormFieldsValues, string>>
    message: string | null
}
```

`src/features/subscription-wizard/model/form.actions.ts` — экшен обрабатывает сценарии по intent:

```ts
const intent = (formData.get('intent') as FormIntent) ?? 'next'

if (intent === 'next') {
    /* валидация email → step 2 */
}
if (intent === 'back') {
    /* step 2 → step 1 */
}
if (intent === 'confirm') {
    /* имитация запроса → success */
}
```

- Валидация на шаге 1 — через `schema.safeParse(formData)`, ошибки Zod форматируются в плоский объект `Record<string, string>`.
- На шаге 2 email сохраняется в `state.email`, а в форму добавляется `<input type="hidden" name="email" value={state.email} />` — чтобы он доехал до экшена.
- Имитация запроса — `await new Promise((r) => setTimeout(r, 2000))`, чтобы UI показал pending.

`src/features/subscription-wizard/ui/WisardForm.tsx`:

```tsx
const [state, formAction, isPending] = useActionState(submitFormAction, initialFormState)
```

- `<form action={formAction}>` — вместо `onSubmit`.
- Кнопки: `<button type="submit" name="intent" value="next">Далее</button>`, `value="back"`, `value="confirm"` — одна форма, разные команды.
- `isPending` блокирует кнопки и меняет подпись на «Проверяем...» / «Отправляем...».
- Успех рендерится отдельным экраном.
- Ошибка поля — под инпутом (`state.errors.email`), общее сообщение — внизу формы (`state.message`).

## Проверка

```bash
npx tsc --noEmit   # без ошибок
npx eslint .       # без ошибок
npm run build      # успешно
```

UI:

- **Форма регистрации** — поля username, email, password, confirmPassword валидируются на лету, ошибки видны под соответствующими полями.
- **Социальные ссылки** — по умолчанию одна, можно добавлять и удалять любое количество; каждая валидируется как URL; при удалении значения не «переезжают» между строками.
- **Wizard** — шаг 1: email → шаг 2: подтверждение → success-экран. Состояние pending видно по спиннеру и заблокированным кнопкам, error — под полем или общим сообщением, success — отдельным экраном.

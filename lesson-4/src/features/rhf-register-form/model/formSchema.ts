import { z } from 'zod'

export const socialLinksSchema = z.object({
    url: z
        .string()
        .min(1, 'Ссылка обязательна')
        .pipe(z.url({ error: 'Некорректный URL' })),
})

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

export type RegisterFormData = z.infer<typeof registerSchema>

export type RegistrationValues = z.infer<typeof registerSchema>

export const defaultValues: RegistrationValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    socialLinks: [{ url: '' }],
}

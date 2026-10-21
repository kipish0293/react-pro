import { z } from 'zod'

export const schema = z.object({
    email: z.email({ message: 'Некорректный формат email' }),
})

// Автоматически вытаскиваем тип полей формы из схемы
export type FormFieldsValues = z.infer<typeof schema>

// Шаг визарда
export type WizardStep = 1 | 2

// Intent — какое действие совершил пользователь
export type FormStep = 'next' | 'back' | 'confirm'

// Строим строгий тип стейта формы
export type FormState = {
    email: string
    step: WizardStep
    success: boolean
    errors: Partial<Record<keyof FormFieldsValues, string>>
    message: string | null
}

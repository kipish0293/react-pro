import type { FormState, FormStep, WizardStep } from './form.types'
import { schema } from './form.types'

export const initialFormState: FormState = {
    step: 1,
    email: '',
    success: false,
    errors: {},
    message: null,
}

// Имитация серверного запроса (Server Action)
export async function submitFormAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const step = (formData.get('intent') as FormStep) ?? 'next'

    if (step === 'back') {
        return {
            ...prevState,
            step: 1,
            errors: {},
            message: null,
            success: false,
        }
    }

    if (step === 'next') {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const rawData = { email: formData.get('email') }
        const validatedFields = schema.safeParse(rawData)

        if (!validatedFields.success) {
            const fieldErrors: Partial<Record<string, string>> = {}
            validatedFields.error.issues.forEach((issue) => {
                if (issue.path[0]) fieldErrors[issue.path[0].toString()] = issue.message
            })

            return {
                step: 1,
                email: String(rawData.email ?? ''),
                success: false,
                errors: fieldErrors,
                message: 'Пожалуйста, исправьте ошибки в форме',
            }
        }

        return {
            step: 2,
            email: validatedFields.data.email,
            success: false,
            errors: {},
            message: null,
        }
    }

    if (step === 'confirm') {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const resp = {
            step: 2 as WizardStep,
            email: prevState.email,
            success: true,
            errors: {},
            message: `Подписка для ${prevState.email} успешно оформлена!`,
        }
        alert(JSON.stringify(resp, null, 2))

        console.log('Подписка оформлена:', { email: prevState.email })

        return resp
    }

    return prevState
}

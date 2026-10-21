import { useActionState } from 'react'
import { initialFormState, submitFormAction } from '../model'
import styles from './WisardForm.module.css'

export const WisardForm = () => {
    const [state, formAction, isPending] = useActionState(submitFormAction, initialFormState)

    if (state.success) {
        return (
            <div className={styles.container}>
                <div className={styles.successBox}>
                    <div className={styles.successIcon}>✅</div>
                    <h2 className={styles.successTitle}>Готово!</h2>
                    <p className={styles.successText}>{state.message}</p>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Регистрация (React 19)</h2>

            <form action={formAction} className={styles.form}>
                {state.step === 1 && (
                    <>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="email" className={styles.label}>
                                Электронная почта
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                disabled={isPending}
                                className={`${styles.input} ${state.errors.email ? styles.inputError : ''}`}
                                placeholder="example@mail.com"
                            />
                            {state.errors.email && <span className={styles.errorText}>{state.errors.email}</span>}
                        </div>

                        <button type="submit" disabled={isPending} className={styles.submitBtn}>
                            {isPending ? <span className={styles.spinner}></span> : 'Отправить данные'}
                        </button>
                    </>
                )}

                {state.step === 2 && (
                    <>
                        <div className={styles.confirmBox}>
                            <p className={styles.confirmText}>
                                Подтвердите подписку для <strong className={styles.confirmEmail}>{state.email}</strong>
                            </p>
                        </div>

                        {/* Прокидываем email, чтобы он был доступен в FormData */}
                        <input type="hidden" name="email" value={state.email} />

                        <div className={styles.actions}>
                            <button type="submit" name="intent" value="back" formNoValidate disabled={isPending} className={styles.secondaryBtn}>
                                Назад
                            </button>

                            <button type="submit" name="intent" value="confirm" disabled={isPending} className={styles.submitBtn}>
                                {isPending ? <span className={styles.spinner} /> : 'Подтвердить'}
                            </button>
                        </div>
                    </>
                )}

                {/* Общий статус ответа от сервера */}
                {state.message && !state.success && !state.errors.email && (
                    <div className={`${styles.statusMessage} ${styles.error}`}>{state.message}</div>
                )}
            </form>
        </div>
    )
}

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import type { RegistrationValues } from '../model'
import { defaultValues, registerSchema } from '../model'
import styles from './RhfForm.module.css'

export const RhfForm = () => {
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

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'socialLinks',
    })

    const onSubmit = (values: RegistrationValues) => {
        alert(JSON.stringify(values, null, 2))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
            <h2 className={styles.formTitle}>Регистрация</h2>

            <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="username">
                    Имя пользователя
                </label>
                <input
                    id="username"
                    {...register('username')}
                    className={`${styles.input} ${touchedFields.username && errors.username ? styles.inputError : ''}`}
                    placeholder="Введите имя"
                />
                {errors.username && <div className={styles.errorText}>{errors.username.message}</div>}
            </div>

            <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="email">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`${styles.input} ${touchedFields.email && errors.email ? styles.inputError : ''}`}
                    placeholder="user@example.com"
                />
                {errors.email && <div className={styles.errorText}>{errors.email.message}</div>}
            </div>

            <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="password">
                    Пароль
                </label>
                <input
                    id="password"
                    type="password"
                    {...register('password')}
                    className={`${styles.input} ${touchedFields.password && errors.password ? styles.inputError : ''}`}
                    placeholder="Минимум 6 символов"
                />
                {errors.password && <div className={styles.errorText}>{errors.password.message}</div>}
            </div>

            <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="confirmPassword">
                    Подтверждение пароля
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword')}
                    className={`${styles.input} ${touchedFields.confirmPassword && errors.confirmPassword ? styles.inputError : ''}`}
                    placeholder="Повторите пароль"
                />
                {errors.confirmPassword && <div className={styles.errorText}>{errors.confirmPassword.message}</div>}
            </div>

            <div className={styles.arrayContainer}>
                <h3 className={styles.arrayTitle}>Социальные ссылки</h3>

                {fields.map((field, index) => (
                    <div key={field.id} className={styles.arrayRow}>
                        <div className={`${styles.fieldGroup} ${styles.flexChild}`}>
                            <label className={styles.label} htmlFor={`socialLinks.${index}.url`}>
                                Ссылка №{index + 1}
                            </label>
                            <input
                                id={`socialLinks.${index}.url`}
                                {...register(`socialLinks.${index}.url`)}
                                className={`${styles.input} ${errors.socialLinks?.[index]?.url ? styles.inputError : ''}`}
                                placeholder="https://github.com/username"
                            />
                            {errors.socialLinks?.[index]?.url && <div className={styles.errorText}>{errors.socialLinks[index]?.url?.message}</div>}
                        </div>

                        <button type="button" className={styles.removeBtn} onClick={() => remove(index)}>
                            Удалить
                        </button>
                    </div>
                ))}

                <button type="button" className={styles.addBtn} onClick={() => append({ url: '' })}>
                    + Добавить ссылку
                </button>
            </div>

            <button type="submit" className={styles.submitBtn}>
                Зарегистрироваться
            </button>
        </form>
    )
}

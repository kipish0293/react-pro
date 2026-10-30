import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterMutation } from 'features/authRouting/api/authApi'
import type { RegisterRequest } from 'features/authRouting/types'
import { useAuth } from 'features/authRouting/useAuth'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { z } from 'zod'

const registerSchema = z
    .object({
        about: z.string(),
        avatarPath: z.string(),
        email: z.string(),
        confirmPassword: z.string(),
        name: z.string(),
        password: z.string(),
        phone: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: 'Пароли не совпадают',
        path: ['confirmPassword'],
    })

type RegisteValues = z.infer<typeof registerSchema>

const defaultValues: RegisteValues = {
    about: '',
    avatarPath: '',
    confirmPassword: '',
    password: '',
    email: '',
    name: '',
    phone: '',
}

export function RegisterPage() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [sendRegister] = useRegisterMutation()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisteValues>({ defaultValues, resolver: zodResolver(registerSchema), mode: 'onTouched' })

    const onSubmit = async ({ about, avatarPath, email, name, password, phone }: RegisteValues) => {
        const payload: RegisterRequest = {
            email,
            name,
            password,
            roles: ['USER'],
            ...(about ? { about } : {}),
            ...(avatarPath ? { avatarPath } : {}),
            ...(phone ? { phone } : {}),
        }
        try {
            const { accessToken, user } = await sendRegister(payload).unwrap()

            login(accessToken, user)
            navigate('/profile', { replace: true })
        } catch {
            setError('root', { message: 'Не удалось зарегистрироваться' })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Регистрация</h2>

            <div>
                <label htmlFor="name">Имя</label>
                <input id="name" type="name" {...register('name')} placeholder="Имя" />
                {errors.name && <div>{errors.name.message}</div>}
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" {...register('email')} placeholder="user@example.com" />
                {errors.email && <div>{errors.email.message}</div>}
            </div>

            <div>
                <label htmlFor="password">Пароль</label>
                <input id="password" type="password" {...register('password')} placeholder="Введите пароль" />
                {errors.password && <div>{errors.password.message}</div>}
            </div>

            <div>
                <label htmlFor="confirmPassword">Повторите проль</label>
                <input id="confirmPassword" type="confirmPassword" {...register('confirmPassword')} placeholder="Повторите проль" />
                {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
            </div>

            {errors.root && <div>{errors.root.message}</div>}

            <button type="submit">{isSubmitting ? 'Создаем аккаунт...' : 'Зарегистрироваться'}</button>

            <p>
                уже есть аккаунт ? <Link to="/register">Войти</Link>
            </p>
        </form>
    )
}

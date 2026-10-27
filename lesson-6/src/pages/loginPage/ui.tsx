import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation } from 'features/authRouting/api/authApi'
import { useAuth } from 'features/authRouting/useAuth'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router'
import { z } from 'zod'

const loginSchema = z.object({
    email: z.email({ error: 'Неверный формат email' }),
    password: z.string().min(1, 'Пароль обязателен'),
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()
    const [sendLogin] = useLoginMutation()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), mode: 'onTouched' })

    const onSubmit = async ({ email, password }: LoginValues) => {
        try {
            const { accessToken, user } = await sendLogin({ email, password }).unwrap()

            login(accessToken, user)

            const from = (location.state as { from?: string } | null)?.from

            navigate(from ?? '/profile', { replace: true })
        } catch {
            setError('root', { message: 'Не удалось войти: проверьте email или пароль' })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Вход в систему</h2>

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

            {errors.root && <div>{errors.root.message}</div>}

            <button type="submit">{isSubmitting ? 'Входим...' : 'Войти'}</button>

            <p>
                Нет аккаунта ? <Link to="/register">Зарегистрироваться</Link>
            </p>
        </form>
    )
}

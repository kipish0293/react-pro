import { useAuth } from 'features/authRouting/useAuth'
import { Link } from 'react-router'

export function PublicPage() {
    const { isAuthenticated } = useAuth()

    return (
        <section>
            <h1>Открытая страница</h1>
            <p>Эта страница доступна всем, без регистрации и смс</p>
            {isAuthenticated ? <Link to="/profile">Перейти в профиль</Link> : <Link to="/login">Войти</Link>}
        </section>
    )
}

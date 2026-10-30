import { useAuth } from 'features/authRouting/useAuth'
import { Link, Outlet } from 'react-router'
import styles from './App.module.css'

function App() {
    const { isAuthenticated, logout } = useAuth()
    return (
        <div className={styles.container}>
            <header>
                <nav>
                    <Link to="/public">Публичная страница</Link>
                    <Link to="/profile">Профиль</Link>

                    {isAuthenticated ? (
                        <button onClick={logout} type="button">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login">login</Link>
                            <Link to="/register">register</Link>
                        </>
                    )}
                </nav>
            </header>

            <Outlet />
        </div>
    )
}

export default App

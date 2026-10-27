import { useGetMeQuery } from 'features/authRouting/api/authApi'
import { useAuth } from 'features/authRouting/useAuth'

export function ProfilePage() {
    const { logout } = useAuth()
    const { data, isError, isLoading } = useGetMeQuery(undefined, { refetchOnMountOrArgChange: true })

    return (
        <section>
            <h1>Профиль</h1>

            {isLoading && <p>Загружаем профиль...</p>}
            {isError && <p>Не удалось загрузить профиль</p>}

            {data && (
                <div>
                    <p>Имя - {data.name}</p>
                    <p>email - {data.email}</p>
                </div>
            )}

            <button type="button" onClick={logout}>
                Выйти
            </button>
        </section>
    )
}

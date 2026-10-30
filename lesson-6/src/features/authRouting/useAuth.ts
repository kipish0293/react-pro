import { useContext } from 'react'
import { AuthContext, type AuthContextModel } from './AuthContext'

export function useAuth(): AuthContextModel {
    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error('useAuth можно вызывать только внутри AuthProvider')
    }

    return authContext
}

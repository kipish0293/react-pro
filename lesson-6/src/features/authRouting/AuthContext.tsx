import { createContext, useState, type ReactNode } from 'react'

import type { AuthUser } from './types'

const JWT_LS_KEY = 'JWT'
const USER_INFO_LS_KEY = 'userInfo'

export interface AuthContextModel {
    isAuthenticated: boolean
    login: (accessToken: string, user: AuthUser) => void
    logout: () => void
    user: AuthUser | null
}

interface Session {
    accessToken: string
    user: AuthUser
}

export const AuthContext = createContext<AuthContextModel | null>(null)

function readStoredSession(): Session | null {
    const accessToken = localStorage.getItem(JWT_LS_KEY)
    const user = localStorage.getItem(USER_INFO_LS_KEY)

    if (!accessToken || !user) {
        return null
    }

    try {
        return { accessToken, user: JSON.parse(user) as AuthUser }
    } catch {
        return null
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(readStoredSession)

    const login = (accessToken: string, user: AuthUser) => {
        localStorage.setItem(JWT_LS_KEY, accessToken)
        localStorage.setItem(USER_INFO_LS_KEY, JSON.stringify(user))
        setSession({ accessToken, user })
    }

    const logout = () => {
        localStorage.removeItem(JWT_LS_KEY)
        localStorage.removeItem(USER_INFO_LS_KEY)
        setSession(null)
    }

    const value: AuthContextModel = { isAuthenticated: Boolean(session), login, logout, user: session?.user ?? null }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

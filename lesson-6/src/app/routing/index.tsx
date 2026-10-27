import App from 'app/App'
import { AuthProvider } from 'features/authRouting/AuthContext'
import ProtectedRoute from 'features/authRouting/ProtectedRoute'
import { LoginPage } from 'pages/loginPage'
import { ProfilePage } from 'pages/profilePage'
import { PublicPage } from 'pages/publicPage'
import { RegisterPage } from 'pages/registerPage'
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router'

export const AppRouter: RouteObject[] = [
    {
        element: (
            <AuthProvider>
                <App />
            </AuthProvider>
        ),
        children: [
            { element: <Navigate replace to="/public" />, index: true },
            { element: <PublicPage />, path: 'public' },
            { element: <LoginPage />, path: 'login' },
            { element: <RegisterPage />, path: 'register' },
            { element: <ProtectedRoute />, children: [{ element: <ProfilePage />, path: 'profile' }] },
        ],
    },
]

export const router = createBrowserRouter(AppRouter)

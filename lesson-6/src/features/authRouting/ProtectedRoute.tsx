import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from './useAuth'

function ProtectedRoute() {
    const { isAuthenticated } = useAuth()
    const location = useLocation()

    if (!isAuthenticated) {
        return <Navigate replace state={{ from: location.pathname }} to="login" />
    }

    return <Outlet />
}

export default ProtectedRoute

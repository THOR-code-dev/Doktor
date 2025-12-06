import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { LoadingPage } from '@/components/ui/loading'

interface ProtectedRouteProps {
    children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <LoadingPage />
    }

    if (!user) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />
    }

    return <>{children}</>
}

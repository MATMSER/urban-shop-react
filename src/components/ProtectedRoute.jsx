import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <p className="text-center py-5">Verificando sesión...</p>
  return user ? children : <Navigate to="/login" replace />
}
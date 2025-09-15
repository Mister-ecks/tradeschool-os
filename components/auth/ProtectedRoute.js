'use client'

import { useUser } from '@/lib/auth/UserContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2, Shield, AlertTriangle } from 'lucide-react'

export function ProtectedRoute({ 
  children, 
  requiredRole = null, 
  fallback = null,
  redirectTo = '/login'
}) {
  const { user, loading, isAuthenticated } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(redirectTo)
    }
  }, [loading, isAuthenticated, router, redirectTo])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to access this page.</p>
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You need {requiredRole} privileges to access this page.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Current role: {user?.role || 'Unknown'}
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute


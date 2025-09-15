import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { AdminDashboard } from '@/components/dashboard/AdminDashboard'

export const metadata = {
  title: 'Admin Dashboard - TradeSchool OS',
  description: "Administrative dashboard for managing users, courses, and system settings.",
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  )
}


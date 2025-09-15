import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { Dashboard } from '@/components/dashboard/Dashboard'

export const metadata = {
  title: 'Dashboard - TradeSchool OS',
  description: "Track your learning progress, view completed courses, and continue your skilled trades education.",
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}




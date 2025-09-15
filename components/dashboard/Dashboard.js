'use client'

import { useUser } from '@/lib/auth/UserContext'
import { StudentDashboard } from './StudentDashboard'
import { AdminDashboard } from './AdminDashboard'

export function Dashboard() {
  const { user, isAdmin, isStudent, isInstructor } = useUser()

  // Show different dashboards based on user role
  if (isAdmin) {
    return <AdminDashboard />
  }

  if (isStudent || isInstructor) {
    return <StudentDashboard />
  }

  // Fallback for unknown roles
  return <StudentDashboard />
}




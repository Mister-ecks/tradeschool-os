'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        // Only run on client side
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('authToken')
          if (token) {
            // In a real app, you'd validate the token with your backend
            const userData = JSON.parse(localStorage.getItem('userData') || '{}')
            if (userData.id) {
              setUser(userData)
            }
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email, password, role) => {
    try {
      // In a real app, this would be an API call
      const mockUser = {
        id: Date.now().toString(),
        email,
        role,
        name: email.split('@')[0],
        avatar: null,
        createdAt: new Date().toISOString()
      }

      // Store in localStorage (in production, use secure httpOnly cookies)
      localStorage.setItem('authToken', 'mock-jwt-token')
      localStorage.setItem('userData', JSON.stringify(mockUser))
      
      setUser(mockUser)
      return { success: true, user: mockUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    setUser(null)
  }

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('userData', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
    isInstructor: user?.role === 'instructor'
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

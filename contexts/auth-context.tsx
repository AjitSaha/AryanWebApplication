"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface User {
  uid: string
  email: string
  displayName: string
  role: "admin" | "faculty" | "student"
  profileData?: any
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Simple demo users with validated data
const DEMO_USERS: Record<string, { user: User; password: string }> = {
  "student@college.edu": {
    password: "student123",
    user: {
      uid: "demo-student-001",
      email: "student@college.edu",
      displayName: "John Smith",
      role: "student",
      profileData: {
        rollNumber: "CS2021001",
        course: "B.Tech",
        department: "Computer Science",
        semester: 6,
        cgpa: 8.5,
        attendance: 85,
        phoneNumber: "+1234567890",
      },
    },
  },
  "faculty@college.edu": {
    password: "faculty123",
    user: {
      uid: "demo-faculty-001",
      email: "faculty@college.edu",
      displayName: "Dr. Sarah Johnson",
      role: "faculty",
      profileData: {
        employeeId: "FAC001",
        department: "Computer Science",
        designation: "Assistant Professor",
        experience: "5 years",
        phoneNumber: "+1234567891",
      },
    },
  },
  "admin@college.edu": {
    password: "admin123",
    user: {
      uid: "demo-admin-001",
      email: "admin@college.edu",
      displayName: "Michael Chen",
      role: "admin",
      profileData: {
        employeeId: "ADM001",
        department: "Administration",
        designation: "System Administrator",
        phoneNumber: "+1234567892",
      },
    },
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    try {
      const savedUser = localStorage.getItem("demo-user")
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        if (userData && userData.uid && userData.email && userData.displayName && userData.role) {
          setUser(userData)
        } else {
          localStorage.removeItem("demo-user")
        }
      }
    } catch (error) {
      console.error("Error loading saved user:", error)
      localStorage.removeItem("demo-user")
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true)

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const demoData = DEMO_USERS[email]
      if (!demoData || demoData.password !== password) {
        throw new Error("Invalid email or password")
      }

      const userData = demoData.user
      setUser(userData)
      localStorage.setItem("demo-user", JSON.stringify(userData))
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setUser(null)
      localStorage.removeItem("demo-user")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

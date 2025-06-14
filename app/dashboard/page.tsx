"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { FacultyDashboard } from "@/components/dashboards/faculty-dashboard"
import { StudentDashboard } from "@/components/dashboards/student-dashboard"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!loading && !user && mounted) {
      router.push("/login")
    }
  }, [user, loading, router, mounted])

  if (loading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const renderDashboard = () => {
    switch (user.role) {
      case "admin":
        return <AdminDashboard user={user} />
      case "faculty":
        return <FacultyDashboard user={user} />
      case "student":
        return <StudentDashboard user={user} />
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Role</h2>
              <p className="text-gray-600">Your account role is not recognized.</p>
            </div>
          </div>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {renderDashboard()}
    </motion.div>
  )
}

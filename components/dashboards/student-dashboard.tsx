"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  DollarSign,
} from "lucide-react"
import { safeNumber, formatNumber, formatPercentage, safeDivision } from "@/lib/utils"

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading...</div>
  }

  // Safe user data with fallbacks
  const studentData = {
    name: user?.displayName || "Student",
    rollNumber: user?.profileData?.rollNumber || "N/A",
    course: user?.profileData?.course || "N/A",
    department: user?.profileData?.department || "N/A",
    semester: safeNumber(user?.profileData?.semester, 1),
    cgpa: safeNumber(user?.profileData?.cgpa, 0),
    attendance: safeNumber(user?.profileData?.attendance, 0),
  }

  // Mock data with safe values
  const mockData = {
    subjects: [
      { name: "Data Structures", code: "CS301", credits: 4, grade: "A", marks: 85 },
      { name: "Database Systems", code: "CS302", credits: 3, grade: "A-", marks: 82 },
      { name: "Computer Networks", code: "CS303", credits: 3, grade: "B+", marks: 78 },
      { name: "Software Engineering", code: "CS304", credits: 4, grade: "A", marks: 88 },
      { name: "Operating Systems", code: "CS305", credits: 3, grade: "B+", marks: 76 },
    ],
    assignments: [
      { title: "Database Design Project", subject: "CS302", dueDate: "2024-01-20", status: "pending" },
      { title: "Network Protocol Analysis", subject: "CS303", dueDate: "2024-01-18", status: "submitted" },
      { title: "OS Scheduling Algorithm", subject: "CS305", dueDate: "2024-01-25", status: "pending" },
    ],
    schedule: [
      { time: "09:00 AM", subject: "Data Structures", room: "CS-101", type: "Lecture" },
      { time: "11:00 AM", subject: "Database Systems", room: "CS-102", type: "Lab" },
      { time: "02:00 PM", subject: "Computer Networks", room: "CS-103", type: "Lecture" },
      { time: "04:00 PM", subject: "Software Engineering", room: "CS-104", type: "Tutorial" },
    ],
    fees: {
      total: 50000,
      paid: 35000,
      pending: 15000,
    },
  }

  // Safe calculations
  const totalCredits = mockData.subjects.reduce((sum, subject) => sum + safeNumber(subject.credits, 0), 0)
  const totalMarks = mockData.subjects.reduce((sum, subject) => sum + safeNumber(subject.marks, 0), 0)
  const averageMarks = safeDivision(totalMarks, mockData.subjects.length, 0)
  const feePercentage = safeDivision(mockData.fees.paid, mockData.fees.total, 0) * 100

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {studentData.name}!</h1>
              <p className="text-gray-600 mt-1">
                {studentData.rollNumber} • {studentData.course} • Semester {studentData.semester}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">CGPA: {studentData.cgpa.toFixed(1)}</div>
              <div className="text-sm text-gray-500">Current Semester</div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Total Credits</p>
                    <p className="text-2xl font-bold">{formatNumber(totalCredits)}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Attendance</p>
                    <p className="text-2xl font-bold">{formatPercentage(studentData.attendance)}</p>
                  </div>
                  <Users className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Average Marks</p>
                    <p className="text-2xl font-bold">{formatNumber(averageMarks)}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">Fees Paid</p>
                    <p className="text-2xl font-bold">{formatPercentage(feePercentage)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Subjects */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Current Subjects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.subjects.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold">{subject.name}</h3>
                          <p className="text-sm text-gray-600">
                            {subject.code} • {formatNumber(subject.credits)} Credits
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={subject.grade.startsWith("A") ? "default" : "secondary"}>
                            {subject.grade}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">{formatNumber(subject.marks)}/100</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Assignments */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Pending Assignments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.assignments.map((assignment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold">{assignment.title}</h3>
                          <p className="text-sm text-gray-600">{assignment.subject}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={assignment.status === "submitted" ? "default" : "destructive"}>
                            {assignment.status === "submitted" ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <AlertCircle className="h-3 w-3 mr-1" />
                            )}
                            {assignment.status}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">Due: {assignment.dueDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.schedule.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <Clock className="h-4 w-4 text-gray-500 mx-auto" />
                          <p className="text-xs text-gray-600 mt-1">{item.time}</p>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.subject}</h4>
                          <p className="text-sm text-gray-600">
                            {item.room} • {item.type}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Fee Status */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Fee Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Paid</span>
                        <span>{formatPercentage(feePercentage)}</span>
                      </div>
                      <Progress value={safeNumber(feePercentage, 0)} className="h-2" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Fees:</span>
                        <span className="font-medium">₹{formatNumber(mockData.fees.total)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Paid:</span>
                        <span className="text-green-600">₹{formatNumber(mockData.fees.paid)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pending:</span>
                        <span className="text-red-600">₹{formatNumber(mockData.fees.pending)}</span>
                      </div>
                    </div>
                    <Button className="w-full" size="sm">
                      Pay Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  Calendar,
  Clock,
  Users,
  FileText,
  Upload,
  CheckCircle,
  TrendingUp,
  MessageSquare,
  Bell,
  Target,
  PlusCircle,
  Edit,
} from "lucide-react"
import type { User } from "@/lib/auth"

interface FacultyDashboardProps {
  user: User
}

// Utility functions to handle NaN values
const safeNumber = (value: any, fallback = 0): number => {
  if (value === null || value === undefined || value === "") return fallback
  const num = Number(value)
  return isNaN(num) || !isFinite(num) ? fallback : num
}

const safePercentage = (value: any, fallback = 0): number => {
  const num = safeNumber(value, fallback)
  return Math.min(Math.max(num, 0), 100)
}

const formatNumber = (value: any, fallback = "0"): string => {
  const num = safeNumber(value, 0)
  return num.toString()
}

const safeDivision = (numerator: any, denominator: any, fallback = 0): number => {
  const num = safeNumber(numerator, 0)
  const den = safeNumber(denominator, 1) // Prevent division by zero
  if (den === 0) return fallback
  return num / den
}

export const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ user }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedSubject, setSelectedSubject] = useState("")

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Mock data with safe defaults
  const facultyData = {
    profile: {
      employeeId: "FAC001",
      department: user.profileData?.department || "Computer Science",
      designation: "Assistant Professor",
      experience: "5 years",
      profileImage: user.profileData?.profileImage,
    },
    subjects: [
      { id: 1, name: "Data Structures", code: "CS301", students: 45, semester: 3 },
      { id: 2, name: "Database Systems", code: "CS401", students: 38, semester: 4 },
      { id: 3, name: "Software Engineering", code: "CS501", students: 42, semester: 5 },
    ],
    schedule: [
      { time: "09:00 AM", subject: "Data Structures", room: "CS-101", class: "CS-3A" },
      { time: "11:00 AM", subject: "Database Systems", room: "CS-102", class: "CS-4B" },
      { time: "02:00 PM", subject: "Software Engineering", room: "CS-103", class: "CS-5A" },
      { time: "04:00 PM", subject: "Lab Session", room: "CS-Lab1", class: "CS-3A" },
    ],
    assignments: [
      {
        id: 1,
        title: "Binary Tree Implementation",
        subject: "Data Structures",
        submissions: 35,
        total: 45,
        dueDate: "2024-01-20",
      },
      {
        id: 2,
        title: "ER Diagram Design",
        subject: "Database Systems",
        submissions: 28,
        total: 38,
        dueDate: "2024-01-18",
      },
      {
        id: 3,
        title: "Requirements Analysis",
        subject: "Software Engineering",
        submissions: 40,
        total: 42,
        dueDate: "2024-01-25",
      },
    ],
    attendance: [
      { subject: "Data Structures", present: 38, total: 45, percentage: 84 },
      { subject: "Database Systems", present: 32, total: 38, percentage: 84 },
      { subject: "Software Engineering", present: 39, total: 42, percentage: 93 },
    ],
    feedback: [
      {
        id: 1,
        student: "John Doe",
        subject: "Data Structures",
        message: "Need help with tree traversal algorithms",
        date: "2024-01-15",
      },
      {
        id: 2,
        student: "Jane Smith",
        subject: "Database Systems",
        message: "Clarification needed on normalization",
        date: "2024-01-14",
      },
      {
        id: 3,
        student: "Mike Johnson",
        subject: "Software Engineering",
        message: "Project timeline discussion",
        date: "2024-01-13",
      },
    ],
  }

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

  // Calculate safe values
  const totalStudents = facultyData.subjects.reduce((sum, s) => sum + safeNumber(s.students, 0), 0)
  const validAttendance = facultyData.attendance.filter((a) => safeNumber(a.percentage, 0) > 0)
  const avgAttendance =
    validAttendance.length > 0
      ? Math.round(validAttendance.reduce((sum, a) => sum + safeNumber(a.percentage, 0), 0) / validAttendance.length)
      : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Welcome, Prof. {user.displayName || "Faculty"}!
          </h1>
          <p className="text-gray-600">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            • {currentTime.toLocaleTimeString()}
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Students</p>
                  <p className="text-3xl font-bold">{formatNumber(totalStudents)}</p>
                </div>
                <Users className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Subjects</p>
                  <p className="text-3xl font-bold">{formatNumber(facultyData.subjects.length)}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Assignments</p>
                  <p className="text-3xl font-bold">{formatNumber(facultyData.assignments.length)}</p>
                </div>
                <FileText className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Avg Attendance</p>
                  <p className="text-3xl font-bold">{formatNumber(avgAttendance)}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Subjects */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    My Subjects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {facultyData.subjects.map((subject, index) => (
                      <motion.div
                        key={subject.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedSubject(subject.name)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{subject.name}</h4>
                          <Badge variant="outline">{subject.code}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Semester {formatNumber(subject.semester)}</span>
                          <span>{formatNumber(subject.students)} students</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Today's Schedule */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {facultyData.schedule.map((class_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                            <p className="text-sm font-medium">{class_.time}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">{class_.subject}</h4>
                            <p className="text-sm text-gray-600">{class_.class}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{class_.room}</Badge>
                          <div className="mt-1">
                            <Button size="sm" variant="outline">
                              Mark Attendance
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Assignments */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-600" />
                      Assignments
                    </div>
                    <Button size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create New
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {facultyData.assignments.map((assignment, index) => {
                      const submissions = safeNumber(assignment.submissions, 0)
                      const total = safeNumber(assignment.total, 1) // Prevent division by zero
                      const submissionPercentage = safePercentage((submissions / total) * 100, 0)

                      return (
                        <motion.div
                          key={assignment.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div>
                            <h4 className="font-semibold">{assignment.title}</h4>
                            <p className="text-sm text-gray-600">{assignment.subject}</p>
                            <p className="text-xs text-gray-500">Due: {assignment.dueDate}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium">
                                {formatNumber(submissions)}/{formatNumber(total)}
                              </span>
                              <div className="w-16 h-2 bg-gray-200 rounded-full">
                                <div
                                  className="h-2 bg-green-500 rounded-full transition-all duration-300"
                                  style={{ width: `${submissionPercentage}%` }}
                                />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Attendance Overview */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Attendance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {facultyData.attendance.map((attendance, index) => {
                      const percentage = safePercentage(attendance.percentage, 0)
                      const present = safeNumber(attendance.present, 0)
                      const total = safeNumber(attendance.total, 0)

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-sm">{attendance.subject}</h4>
                            <span className="text-sm font-bold text-green-600">{formatNumber(percentage)}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-green-500 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {formatNumber(present)}/{formatNumber(total)} students present
                          </p>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Student Feedback */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Student Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {facultyData.feedback.map((feedback, index) => (
                      <motion.div
                        key={feedback.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm">{feedback.student}</h4>
                          <span className="text-xs text-gray-500">{feedback.date}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{feedback.subject}</p>
                        <p className="text-sm">{feedback.message}</p>
                        <Button size="sm" variant="outline" className="mt-2 w-full">
                          Reply
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col gap-2">
                      <Upload className="h-4 w-4" />
                      <span className="text-xs">Upload Notes</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-xs">Create Assignment</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col gap-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-xs">Mark Attendance</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-xs">Enter Marks</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Announcements */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-orange-600" />
                    Send Announcement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Input placeholder="Announcement title" />
                    <Textarea placeholder="Type your message..." rows={3} />
                    <Button className="w-full">Send to Students</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

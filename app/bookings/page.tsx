"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ClientOnly } from "@/components/client-only"
import {
  Calendar,
  MapPin,
  Star,
  Users,
  Clock,
  Plane,
  Heart,
  Search,
  Filter,
  Download,
  MessageCircle,
  Phone,
  Loader2,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"

function BookingsContent() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("upcoming")
  const [userBookings, setUserBookings] = useState<any[]>([])

  // Load user-specific bookings
  useEffect(() => {
    if (user) {
      const savedBookings = localStorage.getItem(`wanderlust-bookings-${user.uid}`)
      if (savedBookings) {
        try {
          setUserBookings(JSON.parse(savedBookings))
        } catch (error) {
          console.warn("Failed to load bookings:", error)
          setUserBookings([])
        }
      } else {
        setUserBookings([])
      }
    }
  }, [user])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filterBookings = (status: string) => {
    const now = new Date()
    return userBookings.filter((booking) => {
      const startDate = new Date(booking.startDate)
      const matchesSearch =
        searchQuery === "" ||
        booking.packageTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.confirmationCode.toLowerCase().includes(searchQuery.toLowerCase())

      if (!matchesSearch) return false

      switch (status) {
        case "upcoming":
          return booking.status === "confirmed" && startDate > now
        case "pending":
          return booking.status === "pending"
        case "completed":
          return booking.status === "completed"
        case "cancelled":
          return booking.status === "cancelled"
        default:
          return true
      }
    })
  }

  const stats = [
    { label: "Total Trips", value: userBookings.filter((b) => b.status === "completed").length.toString() },
    { label: "Upcoming", value: filterBookings("upcoming").length.toString() },
    { label: "Pending", value: filterBookings("pending").length.toString() },
    {
      label: "Total Spent",
      value: `$${userBookings
        .filter((b) => b.status === "completed")
        .reduce((sum, b) => sum + b.totalPrice, 0)
        .toLocaleString()}`,
    },
  ]

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Card className="p-8 text-center">
          <CardContent>
            <Plane className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Please Log In</h2>
            <p className="text-gray-600 mb-4">You need to be logged in to view your bookings.</p>
            <Button asChild>
              <a href="/login">Go to Login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Trips</h1>
          <p className="text-xl text-gray-600">Manage your travel bookings and explore your journey history</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by destination, package name, or confirmation code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bookings Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            {["upcoming", "pending", "completed", "cancelled"].map((status) => (
              <TabsContent key={status} value={status} className="mt-6">
                <div className="space-y-6">
                  {filterBookings(status).length === 0 ? (
                    <Card className="text-center py-12">
                      <CardContent>
                        <div className="text-gray-400 mb-4">
                          <Plane className="h-16 w-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No {status} trips found</h3>
                        <p className="text-gray-600 mb-4">
                          {status === "upcoming"
                            ? "You don't have any upcoming trips. Start planning your next adventure!"
                            : `No ${status} bookings to display.`}
                        </p>
                        {status === "upcoming" && (
                          <Button asChild>
                            <Link href="/packages">
                              <Plane className="mr-2 h-4 w-4" />
                              Browse Packages
                            </Link>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ) : (
                    filterBookings(status).map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row gap-6">
                              {/* Image */}
                              <div className="lg:w-48 flex-shrink-0">
                                <img
                                  src={booking.image || "/placeholder.svg"}
                                  alt={booking.packageTitle}
                                  className="w-full h-32 lg:h-full object-cover rounded-lg"
                                />
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <h3 className="text-xl font-semibold text-gray-900">{booking.packageTitle}</h3>
                                      <Badge className={getStatusColor(booking.status)}>
                                        <span className="flex items-center gap-1">
                                          {getStatusIcon(booking.status)}
                                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </span>
                                      </Badge>
                                    </div>
                                    <div className="flex items-center text-gray-600 mb-2">
                                      <MapPin className="h-4 w-4 mr-1" />
                                      <span>{booking.destination}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 mb-2">
                                      <Calendar className="h-4 w-4 mr-1" />
                                      <span>
                                        {new Date(booking.startDate).toLocaleDateString()} -{" "}
                                        {new Date(booking.endDate).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                      <Users className="h-4 w-4 mr-1" />
                                      <span>
                                        {booking.travelers} traveler{booking.travelers !== 1 ? "s" : ""}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right mt-4 lg:mt-0">
                                    <div className="text-2xl font-bold text-gray-900">
                                      ${booking.totalPrice.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-600">Total Cost</div>
                                  </div>
                                </div>

                                {/* Rating for completed trips */}
                                {booking.status === "completed" && booking.rating && (
                                  <div className="flex items-center mb-4">
                                    <span className="text-sm text-gray-600 mr-2">Your rating:</span>
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < booking.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                )}

                                {/* Actions */}
                                <div className="flex flex-wrap gap-3">
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                  {booking.status === "confirmed" && (
                                    <>
                                      <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-1" />
                                        Download Voucher
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <MessageCircle className="h-4 w-4 mr-1" />
                                        Contact Support
                                      </Button>
                                    </>
                                  )}
                                  {booking.status === "completed" && !booking.rating && (
                                    <Button variant="outline" size="sm">
                                      <Star className="h-4 w-4 mr-1" />
                                      Leave Review
                                    </Button>
                                  )}
                                  {booking.status === "pending" && (
                                    <Button variant="outline" size="sm">
                                      <Phone className="h-4 w-4 mr-1" />
                                      Contact Agent
                                    </Button>
                                  )}
                                </div>

                                {/* Confirmation Code */}
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <div className="text-sm text-gray-600">
                                    Confirmation Code:{" "}
                                    <span className="font-mono font-medium">{booking.confirmationCode}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready for Your Next Adventure?</h3>
              <p className="text-blue-100 mb-6">
                Discover amazing destinations and create new memories with our curated travel packages.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                  <Link href="/packages">
                    <Plane className="mr-2 h-5 w-5" />
                    Browse Packages
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/destinations">
                    <Heart className="mr-2 h-5 w-5" />
                    Explore Destinations
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default function BookingsPage() {
  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen flex items-center justify-center pt-16">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <BookingsContent />
    </ClientOnly>
  )
}

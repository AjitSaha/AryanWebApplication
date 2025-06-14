"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ClientOnly } from "@/components/client-only"
import { MapPin, Calendar, Camera, Edit, Save, X, Plane, Heart, Star, Award, Globe, Loader2 } from "lucide-react"

function ProfileContent() {
  const { user, isDemoMode } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    dateOfBirth: "",
    travelPreferences: "",
    emergencyContact: "",
  })

  // Load user-specific data
  useEffect(() => {
    if (user) {
      // Load saved profile data or set defaults
      const savedProfile = localStorage.getItem(`wanderlust-profile-${user.uid}`)
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile)
          setProfileData(parsed)
        } catch (error) {
          console.warn("Failed to load profile data:", error)
          setDefaultProfile()
        }
      } else {
        setDefaultProfile()
      }
    }
  }, [user])

  const setDefaultProfile = () => {
    if (user) {
      setProfileData({
        displayName: user.displayName || "Travel Enthusiast",
        email: user.email || "",
        phone: "",
        location: "",
        bio: "New to Wanderlust - excited to explore the world!",
        dateOfBirth: "",
        travelPreferences: "",
        emergencyContact: "",
      })
    }
  }

  const handleSave = async () => {
    if (!user) return

    setIsEditing(true)
    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      localStorage.setItem(`wanderlust-profile-${user.uid}`, JSON.stringify(profileData))
      toast({
        title: "Profile updated!",
        description: "Your profile information has been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      })
    }
    setIsEditing(false)
  }

  // User-specific travel stats (would come from booking history in real app)
  const getUserTravelStats = () => {
    if (!user) return { countries: 0, trips: 0, rating: 0, points: 0 }

    // In a real app, this would query the user's actual booking/travel history
    const savedStats = localStorage.getItem(`wanderlust-stats-${user.uid}`)
    if (savedStats) {
      try {
        return JSON.parse(savedStats)
      } catch (error) {
        console.warn("Failed to load travel stats:", error)
      }
    }

    // Default stats for new users
    return { countries: 0, trips: 0, rating: 0, points: 0 }
  }

  const travelStats = getUserTravelStats()
  const statsDisplay = [
    { icon: Globe, label: "Countries Visited", value: travelStats.countries.toString(), color: "text-blue-600" },
    { icon: Plane, label: "Total Trips", value: travelStats.trips.toString(), color: "text-green-600" },
    {
      icon: Star,
      label: "Average Rating",
      value: travelStats.rating > 0 ? travelStats.rating.toFixed(1) : "N/A",
      color: "text-yellow-600",
    },
    { icon: Award, label: "Travel Points", value: travelStats.points.toString(), color: "text-purple-600" },
  ]

  // User-specific recent trips (would come from actual bookings)
  const getUserRecentTrips = () => {
    if (!user) return []

    const savedTrips = localStorage.getItem(`wanderlust-trips-${user.uid}`)
    if (savedTrips) {
      try {
        return JSON.parse(savedTrips)
      } catch (error) {
        console.warn("Failed to load trips:", error)
      }
    }
    return []
  }

  const recentTrips = getUserRecentTrips()

  const achievements = [
    { title: "First Trip", description: "Completed your first booking", icon: Plane, earned: travelStats.trips > 0 },
    { title: "Explorer", description: "Visited 3+ countries", icon: Globe, earned: travelStats.countries >= 3 },
    { title: "Adventurer", description: "Completed 5+ trips", icon: Star, earned: travelStats.trips >= 5 },
    { title: "World Traveler", description: "Visited 10+ countries", icon: Award, earned: travelStats.countries >= 10 },
  ]

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Card className="p-8 text-center">
          <CardContent>
            <Plane className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Please Log In</h2>
            <p className="text-gray-600 mb-4">You need to be logged in to view your profile.</p>
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
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white">
                <AvatarImage src={user?.photoURL || "/placeholder.svg"} alt={profileData.displayName} />
                <AvatarFallback className="text-2xl bg-white text-blue-600">
                  {profileData.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute -bottom-2 -right-2 rounded-full bg-white text-blue-600 hover:bg-gray-100"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold mb-2">{profileData.displayName}</h1>
              <p className="text-blue-100 mb-4">{profileData.bio || "Welcome to Wanderlust!"}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {profileData.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{profileData.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </motion.div>

        {/* Travel Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          {statsDisplay.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile Info</TabsTrigger>
                <TabsTrigger value="trips">Recent Trips</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Personal Information
                      {isEditing && (
                        <Button onClick={handleSave} className="ml-4">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Full Name</Label>
                        <Input
                          id="displayName"
                          value={profileData.displayName}
                          onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          disabled={true}
                          className="bg-gray-50"
                        />
                        <p className="text-xs text-gray-500">Email cannot be changed</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          disabled={!isEditing}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                          disabled={!isEditing}
                          placeholder="Enter your city/country"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="travelPreferences">Travel Preferences</Label>
                        <Input
                          id="travelPreferences"
                          value={profileData.travelPreferences}
                          onChange={(e) => setProfileData({ ...profileData, travelPreferences: e.target.value })}
                          disabled={!isEditing}
                          placeholder="e.g., Adventure, Beach, Culture"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        disabled={!isEditing}
                        rows={3}
                        placeholder="Tell us about yourself and your travel interests..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        value={profileData.emergencyContact}
                        onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                        disabled={!isEditing}
                        placeholder="Name and phone number"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trips" className="mt-6">
                {recentTrips.length === 0 ? (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Plane className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-semibold mb-2">No trips yet</h3>
                      <p className="text-gray-600 mb-4">Start your travel journey by booking your first trip!</p>
                      <Button asChild>
                        <a href="/packages">Browse Packages</a>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {recentTrips.map((trip: any, index: number) => (
                      <motion.div
                        key={trip.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex gap-4">
                              <img
                                src={trip.image || "/placeholder.svg"}
                                alt={trip.destination}
                                className="w-24 h-24 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="text-lg font-semibold">{trip.destination}</h3>
                                  <Badge variant="secondary">{trip.status}</Badge>
                                </div>
                                <p className="text-gray-600 mb-2">{trip.date}</p>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < (trip.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="ml-2 text-sm text-gray-600">({trip.rating || 0}/5)</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="achievements" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className={`${achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50"}`}>
                        <CardContent className="p-6 text-center">
                          <achievement.icon
                            className={`h-12 w-12 mx-auto mb-4 ${
                              achievement.earned ? "text-green-600" : "text-gray-400"
                            }`}
                          />
                          <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                          <p className="text-gray-600 text-sm">{achievement.description}</p>
                          {achievement.earned && <Badge className="mt-3 bg-green-600">Earned</Badge>}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Travel Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Travel Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                {profileData.travelPreferences ? (
                  <div className="space-y-2">
                    {profileData.travelPreferences.split(",").map((pref, index) => (
                      <Badge key={index} variant="secondary" className="mr-2">
                        {pref.trim()}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No preferences set yet</p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline" asChild>
                  <a href="/bookings">
                    <Heart className="h-4 w-4 mr-2" />
                    View My Trips
                  </a>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <a href="/packages">
                    <Plane className="h-4 w-4 mr-2" />
                    Book New Trip
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen flex items-center justify-center pt-16">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <ProfileContent />
    </ClientOnly>
  )
}

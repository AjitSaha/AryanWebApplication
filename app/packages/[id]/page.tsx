"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { demoPackages, type TravelPackage } from "@/lib/demo-data"
import { ClientOnly } from "@/components/client-only"
import {
  MapPin,
  Star,
  Calendar,
  Check,
  Heart,
  Share2,
  ArrowLeft,
  Plane,
  Hotel,
  Utensils,
  Camera,
  Shield,
  Clock,
  Phone,
  Mail,
  Loader2,
} from "lucide-react"

function PackageDetailContent() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [pkg, setPkg] = useState<TravelPackage | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingData, setBookingData] = useState({
    travelers: 1,
    startDate: "",
    specialRequests: "",
    contactPhone: "",
    contactEmail: "",
  })
  const [isBooking, setIsBooking] = useState(false)

  useEffect(() => {
    const packageData = demoPackages.find((p) => p.id === params.id)
    if (packageData) {
      setPkg(packageData)
    } else {
      router.push("/packages")
    }
  }, [params.id, router])

  const handleBooking = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to book this package.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsBooking(true)

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Booking confirmed!",
      description: "Your travel package has been booked successfully. We'll contact you soon with details.",
    })

    setIsBookingOpen(false)
    setIsBooking(false)

    // Reset form
    setBookingData({
      travelers: 1,
      startDate: "",
      specialRequests: "",
      contactPhone: "",
      contactEmail: "",
    })
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  const totalPrice = pkg.price * bookingData.travelers

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img src={pkg.image || "/placeholder.svg"} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Button variant="ghost" className="text-white hover:bg-white/20 mb-4" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Packages
              </Button>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {pkg.featured && <Badge className="bg-orange-500 text-white">Featured</Badge>}
                    <Badge variant="secondary" className="bg-white/90 text-gray-700">
                      {pkg.category}
                    </Badge>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{pkg.title}</h1>
                  <div className="flex items-center text-white/90 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-lg">
                      {pkg.location}, {pkg.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 mr-1 text-yellow-400 fill-current" />
                      <span className="font-medium">{pkg.rating}</span>
                      <span className="ml-1">({pkg.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-1" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <div className="text-3xl md:text-4xl font-bold text-white">${pkg.price}</div>
                  {pkg.originalPrice && <div className="text-lg text-white/70 line-through">${pkg.originalPrice}</div>}
                  <div className="text-white/90">per person</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Trip</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-6">{pkg.description}</p>

                    <h3 className="text-xl font-semibold mb-4">Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {pkg.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="itinerary" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Day by Day Itinerary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {pkg.itinerary.map((day, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex gap-4"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                              {day.day}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">{day.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{day.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inclusions" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What's Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pkg.inclusions.map((inclusion, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{inclusion}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Hotel className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm font-medium">Accommodation</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Utensils className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-sm font-medium">Meals</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Camera className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-sm font-medium">Activities</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <div className="text-sm font-medium">Insurance</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Book This Trip</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">${pkg.price}</div>
                      {pkg.originalPrice && (
                        <div className="text-lg text-gray-500 line-through">${pkg.originalPrice}</div>
                      )}
                      <div className="text-gray-600">per person</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Group Size:</span>
                        <span className="font-medium">Max 12 people</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Difficulty:</span>
                        <span className="font-medium">Moderate</span>
                      </div>
                    </div>

                    <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6">
                          <Plane className="mr-2 h-5 w-5" />
                          Book Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Book Your Trip</DialogTitle>
                          <DialogDescription>Fill in your details to book {pkg.title}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="travelers">Travelers</Label>
                              <Input
                                id="travelers"
                                type="number"
                                min="1"
                                max="12"
                                value={bookingData.travelers}
                                onChange={(e) =>
                                  setBookingData({ ...bookingData, travelers: Number.parseInt(e.target.value) || 1 })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="startDate">Start Date</Label>
                              <Input
                                id="startDate"
                                type="date"
                                value={bookingData.startDate}
                                onChange={(e) => setBookingData({ ...bookingData, startDate: e.target.value })}
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="contactEmail">Email</Label>
                            <Input
                              id="contactEmail"
                              type="email"
                              placeholder="your@email.com"
                              value={bookingData.contactEmail}
                              onChange={(e) => setBookingData({ ...bookingData, contactEmail: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="contactPhone">Phone</Label>
                            <Input
                              id="contactPhone"
                              type="tel"
                              placeholder="+1 (555) 123-4567"
                              value={bookingData.contactPhone}
                              onChange={(e) => setBookingData({ ...bookingData, contactPhone: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="specialRequests">Special Requests</Label>
                            <Textarea
                              id="specialRequests"
                              placeholder="Any special requirements or requests..."
                              value={bookingData.specialRequests}
                              onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                            />
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <span>Total Cost:</span>
                              <span className="text-2xl font-bold text-blue-600">${totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {bookingData.travelers} traveler{bookingData.travelers !== 1 ? "s" : ""} × ${pkg.price}
                            </div>
                          </div>
                          <Button
                            onClick={handleBooking}
                            className="w-full"
                            disabled={isBooking || !bookingData.startDate || !bookingData.contactEmail}
                          >
                            {isBooking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Confirm Booking
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <div className="text-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Free cancellation up to 24 hours before departure
                    </div>

                    <div className="border-t pt-4">
                      <div className="text-sm text-gray-600 mb-2">Need help?</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PackageDetailPage() {
  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen flex items-center justify-center pt-16">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <PackageDetailContent />
    </ClientOnly>
  )
}

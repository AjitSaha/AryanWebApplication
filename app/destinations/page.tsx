"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { demoPackages } from "@/lib/demo-data"
import { Search, MapPin, Star, Calendar, ArrowRight, Globe, Users, Camera } from "lucide-react"
import Link from "next/link"

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Group packages by country
  const destinationsByCountry = demoPackages.reduce(
    (acc, pkg) => {
      if (!acc[pkg.country]) {
        acc[pkg.country] = []
      }
      acc[pkg.country].push(pkg)
      return acc
    },
    {} as Record<string, typeof demoPackages>,
  )

  const filteredDestinations = Object.entries(destinationsByCountry).filter(
    ([country, packages]) =>
      country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      packages.some(
        (pkg) =>
          pkg.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  )

  const stats = [
    { icon: Globe, label: "Countries", value: Object.keys(destinationsByCountry).length.toString() },
    { icon: MapPin, label: "Destinations", value: demoPackages.length.toString() },
    { icon: Users, label: "Happy Travelers", value: "50,000+" },
    { icon: Camera, label: "Experiences", value: "1,000+" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Explore Amazing Destinations</h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
              Discover breathtaking locations around the world, from tropical beaches to mountain peaks, ancient cities
              to modern metropolises.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-full shadow-xl text-gray-900"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations by Country */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Destinations by Country</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our carefully selected destinations across the globe
            </p>
          </motion.div>

          <div className="space-y-12">
            {filteredDestinations.map(([country, packages], countryIndex) => (
              <motion.div
                key={country}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: countryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mr-4">{country}</h3>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {packages.length} destination{packages.length !== 1 ? "s" : ""}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {packages.map((pkg, index) => (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -10 }}
                      className="group"
                    >
                      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                        <div className="relative overflow-hidden">
                          <img
                            src={pkg.image || "/placeholder.svg"}
                            alt={pkg.title}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                              {pkg.category}
                            </Badge>
                          </div>
                          <div className="absolute bottom-4 right-4">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{pkg.rating}</span>
                            </div>
                          </div>
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start mb-2">
                            <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                              {pkg.location}
                            </CardTitle>
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-600">From ${pkg.price}</div>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-600 mb-2">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="text-sm">{pkg.duration}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
                          <Button className="w-full group-hover:bg-green-600 transition-colors" asChild>
                            <Link href={`/packages/${pkg.id}`}>
                              Explore Destination
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No destinations found</h3>
              <p className="text-gray-600 mb-6">Try searching for a different location</p>
              <Button onClick={() => setSearchQuery("")}>Show All Destinations</Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Explore?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Browse our complete collection of travel packages and find your perfect adventure.
            </p>
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full"
              asChild
            >
              <Link href="/packages">
                View All Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

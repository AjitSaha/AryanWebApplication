export interface TravelPackage {
  id: string
  title: string
  location: string
  country: string
  image: string
  price: number
  originalPrice?: number
  duration: string
  rating: number
  reviews: number
  description: string
  highlights: string[]
  inclusions: string[]
  itinerary: {
    day: number
    title: string
    description: string
  }[]
  category: string
  featured: boolean
}

export const demoPackages: TravelPackage[] = [
  {
    id: "1",
    title: "Magical Bali Adventure",
    location: "Bali",
    country: "Indonesia",
    image: "/placeholder.svg?height=400&width=600",
    price: 1299,
    originalPrice: 1599,
    duration: "7 days",
    rating: 4.8,
    reviews: 324,
    description:
      "Experience the enchanting beauty of Bali with pristine beaches, ancient temples, and vibrant culture.",
    highlights: [
      "Visit iconic Tanah Lot Temple",
      "Explore Ubud's rice terraces",
      "Snorkeling in crystal clear waters",
      "Traditional Balinese cooking class",
      "Sunset dinner cruise",
    ],
    inclusions: [
      "4-star hotel accommodation",
      "Daily breakfast",
      "Airport transfers",
      "Professional tour guide",
      "All entrance fees",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bali",
        description:
          "Airport pickup and check-in to your beachfront resort. Welcome dinner with traditional Balinese performance.",
      },
      {
        day: 2,
        title: "Ubud Cultural Tour",
        description:
          "Visit Monkey Forest Sanctuary, explore traditional markets, and enjoy lunch overlooking rice terraces.",
      },
      {
        day: 3,
        title: "Temple Hopping",
        description: "Discover ancient temples including Tanah Lot and Uluwatu with spectacular sunset views.",
      },
    ],
    category: "Beach",
    featured: true,
  },
  {
    id: "2",
    title: "Swiss Alps Explorer",
    location: "Interlaken",
    country: "Switzerland",
    image: "/placeholder.svg?height=400&width=600",
    price: 2199,
    originalPrice: 2599,
    duration: "10 days",
    rating: 4.9,
    reviews: 156,
    description: "Breathtaking mountain adventures in the heart of the Swiss Alps with luxury accommodations.",
    highlights: [
      "Jungfraujoch - Top of Europe",
      "Scenic train rides",
      "Lake cruises",
      "Mountain hiking trails",
      "Swiss chocolate factory tour",
    ],
    inclusions: [
      "5-star mountain resort",
      "All meals included",
      "Train passes",
      "Cable car tickets",
      "Professional mountain guide",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Zurich",
        description: "Airport transfer to Interlaken. Evening welcome reception with Swiss specialties.",
      },
      {
        day: 2,
        title: "Jungfraujoch Excursion",
        description: "Journey to the 'Top of Europe' via cogwheel train. Ice Palace and Sphinx Observatory visit.",
      },
      {
        day: 3,
        title: "Lake Thun Cruise",
        description: "Scenic boat cruise with Alpine views. Visit to traditional Swiss village.",
      },
    ],
    category: "Mountain",
    featured: true,
  },
  {
    id: "3",
    title: "Tokyo Modern Metropolis",
    location: "Tokyo",
    country: "Japan",
    image: "/placeholder.svg?height=400&width=600",
    price: 1899,
    duration: "8 days",
    rating: 4.7,
    reviews: 289,
    description: "Immerse yourself in Japan's fascinating blend of ancient traditions and cutting-edge technology.",
    highlights: [
      "Visit iconic Senso-ji Temple",
      "Experience Shibuya Crossing",
      "Traditional tea ceremony",
      "Sushi making workshop",
      "Day trip to Mount Fuji",
    ],
    inclusions: [
      "Boutique hotel in Shibuya",
      "Daily breakfast",
      "JR Pass for trains",
      "English-speaking guide",
      "Cultural experiences",
    ],
    itinerary: [
      {
        day: 1,
        title: "Tokyo Arrival",
        description: "Airport transfer and hotel check-in. Evening exploration of Shibuya district.",
      },
      {
        day: 2,
        title: "Traditional Tokyo",
        description: "Visit Senso-ji Temple, traditional markets, and participate in tea ceremony.",
      },
      {
        day: 3,
        title: "Modern Tokyo",
        description: "Explore Harajuku, visit Tokyo Skytree, and experience the vibrant nightlife.",
      },
    ],
    category: "City",
    featured: false,
  },
  {
    id: "4",
    title: "Santorini Sunset Paradise",
    location: "Santorini",
    country: "Greece",
    image: "/placeholder.svg?height=400&width=600",
    price: 1599,
    originalPrice: 1899,
    duration: "6 days",
    rating: 4.9,
    reviews: 412,
    description: "Romantic getaway to the stunning Greek island with white-washed buildings and breathtaking sunsets.",
    highlights: [
      "Famous Oia sunset views",
      "Wine tasting tours",
      "Volcanic island cruise",
      "Traditional Greek cooking",
      "Private beach access",
    ],
    inclusions: ["Luxury cave hotel", "Daily breakfast", "Airport transfers", "Wine tour guide", "Sunset cruise"],
    itinerary: [
      {
        day: 1,
        title: "Santorini Arrival",
        description: "Airport pickup and check-in to your cave hotel. Welcome dinner with sea views.",
      },
      {
        day: 2,
        title: "Oia Village Tour",
        description: "Explore the famous blue-domed churches and enjoy the world's most beautiful sunset.",
      },
      {
        day: 3,
        title: "Wine & Volcano",
        description: "Visit local wineries and take a boat trip to the volcanic islands.",
      },
    ],
    category: "Beach",
    featured: true,
  },
  {
    id: "5",
    title: "Machu Picchu Trek",
    location: "Cusco",
    country: "Peru",
    image: "/placeholder.svg?height=400&width=600",
    price: 1799,
    duration: "9 days",
    rating: 4.6,
    reviews: 198,
    description: "Adventure trek to the ancient Inca citadel through breathtaking Andean landscapes.",
    highlights: [
      "Classic Inca Trail trek",
      "Machu Picchu sunrise",
      "Sacred Valley exploration",
      "Local community visits",
      "Andean cuisine experience",
    ],
    inclusions: [
      "Mountain lodge accommodation",
      "All meals during trek",
      "Professional trek guide",
      "Porter services",
      "Train tickets",
    ],
    itinerary: [
      {
        day: 1,
        title: "Cusco Acclimatization",
        description: "Arrival and city tour to acclimatize to the altitude. Visit San Pedro Market.",
      },
      {
        day: 2,
        title: "Sacred Valley",
        description: "Explore Pisac ruins and traditional markets. Overnight in Sacred Valley.",
      },
      {
        day: 3,
        title: "Inca Trail Begins",
        description: "Start the classic 4-day Inca Trail trek to Machu Picchu.",
      },
    ],
    category: "Adventure",
    featured: false,
  },
  {
    id: "6",
    title: "Dubai Luxury Experience",
    location: "Dubai",
    country: "UAE",
    image: "/placeholder.svg?height=400&width=600",
    price: 2299,
    duration: "5 days",
    rating: 4.8,
    reviews: 267,
    description: "Luxury desert adventure with world-class shopping, dining, and entertainment.",
    highlights: [
      "Burj Khalifa observation deck",
      "Desert safari with dinner",
      "Dubai Mall shopping spree",
      "Luxury yacht cruise",
      "Gold Souk exploration",
    ],
    inclusions: [
      "5-star hotel accommodation",
      "Daily breakfast & dinner",
      "Private car transfers",
      "VIP experiences",
      "Shopping vouchers",
    ],
    itinerary: [
      {
        day: 1,
        title: "Dubai Arrival",
        description: "Luxury hotel check-in and evening visit to Dubai Fountain show.",
      },
      {
        day: 2,
        title: "Modern Dubai",
        description: "Burj Khalifa visit, Dubai Mall shopping, and fine dining experience.",
      },
      {
        day: 3,
        title: "Desert Adventure",
        description: "Desert safari with camel riding, sandboarding, and traditional BBQ dinner.",
      },
    ],
    category: "Luxury",
    featured: true,
  },
]

export const demoUser = {
  uid: "demo-user",
  email: "demo@wanderlust.com",
  displayName: "Demo Traveler",
}

export const categories = ["All", "Beach", "Mountain", "City", "Adventure", "Luxury"]
export const durations = ["All", "3-5 days", "6-8 days", "9+ days"]
export const priceRanges = [
  { label: "All", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "$500 - $1000", min: 500, max: 1000 },
  { label: "$1000 - $1500", min: 1000, max: 1500 },
  { label: "$1500 - $2000", min: 1500, max: 2000 },
  { label: "$2000+", min: 2000, max: Number.POSITIVE_INFINITY },
]

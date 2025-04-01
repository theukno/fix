"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Search, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"

// Mock product data
const allProducts = [
  // Happy mood products
  {
    id: 1,
    name: "Celebration Box",
    price: 39.99,
    image: "/Cele.jpg?height=200&width=200",
    description: "A curated box of treats to celebrate good moments.",
    mood: "happy",
    category: "gift-sets",
  },
  {
    id: 2,
    name: "Gratitude Journal",
    price: 14.99,
    image: "/jo.webp?height=200&width=200",
    description: "Record your daily moments of joy and gratitude.",
    mood: "happy",
    category: "stationery",
  },
  {
    id: 3,
    name: "Party Lights",
    price: 24.99,
    image: "/pl.jpg?height=200&width=200",
    description: "Colorful LED lights to enhance your happy atmosphere.",
    mood: "happy",
    category: "home",
  },
  {
    id: 4,
    name: "Upbeat Playlist Subscription",
    price: 9.99,
    image: "/uw.jpeg?height=200&width=200",
    description: "Access to curated playlists that boost your mood.",
    mood: "happy",
    category: "digital",
  },

  // Calm mood products
  {
    id: 5,
    name: "Calming Tea Set",
    price: 24.99,
    image: "/tea.jpg?height=200&width=200",
    description: "A selection of herbal teas to help you relax and unwind.",
    mood: "calm",
    category: "food-drink",
  },
  {
    id: 6,
    name: "Aromatherapy Diffuser",
    price: 34.99,
    image: "/benefits-of-diffusers.webp?height=200&width=200",
    description: "Essential oil diffuser with calming scents.",
    mood: "calm",
    category: "home",
  },
  {
    id: 7,
    name: "Meditation Cushion",
    price: 29.99,
    image: "/cu.webp?height=200&width=200",
    description: "Comfortable cushion for your meditation practice.",
    mood: "calm",
    category: "wellness",
  },
  {
    id: 8,
    name: "Sound Machine",
    price: 19.99,
    image: "/sm.jpg?height=200&width=200",
    description: "Create a peaceful environment with nature sounds.",
    mood: "calm",
    category: "electronics",
  },

  // Sad mood products
  {
    id: 9,
    name: "Comfort Blanket",
    price: 34.99,
    image: "/blanket.jpg?height=200&width=200",
    description: "A soft, weighted blanket for those days when you need extra comfort.",
    mood: "sad",
    category: "home",
  },
  {
    id: 10,
    name: "Self-Care Box",
    price: 44.99,
    image: "/gift.jpg?height=200&width=200",
    description: "A collection of items to help you practice self-care.",
    mood: "sad",
    category: "gift-sets",
  },
  {
    id: 11,
    name: "Mood-Boosting Lamp",
    price: 49.99,
    image: "/lamp.jpeg?height=200&width=200",
    description: "Light therapy lamp to help improve your mood.",
    mood: "sad",
    category: "electronics",
  },
  {
    id: 12,
    name: "Comforting Playlist Subscription",
    price: 9.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Access to music that provides comfort and support.",
    mood: "sad",
    category: "digital",
  },

  // Energetic mood products
  {
    id: 13,
    name: "Energizing Fitness Kit",
    price: 49.99,
    image: "/kit.png?height=200&width=200",
    description: "Everything you need for a quick workout to boost your energy.",
    mood: "energetic",
    category: "wellness",
  },
  {
    id: 14,
    name: "Protein Snack Box",
    price: 29.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Healthy snacks to fuel your active lifestyle.",
    mood: "energetic",
    category: "food-drink",
  },
  {
    id: 15,
    name: "Wireless Earbuds",
    price: 59.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "High-quality earbuds for your energetic music or podcasts.",
    mood: "energetic",
    category: "electronics",
  },
  {
    id: 16,
    name: "Productivity Planner",
    price: 19.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Plan your day efficiently and channel your energy.",
    mood: "energetic",
    category: "stationery",
  },
]

const categories = [
  { value: "all", label: "All Categories" },
  { value: "gift-sets", label: "Gift Sets" },
  { value: "home", label: "Home & Living" },
  { value: "wellness", label: "Wellness" },
  { value: "electronics", label: "Electronics" },
  { value: "stationery", label: "Stationery" },
  { value: "food-drink", label: "Food & Drink" },
  { value: "digital", label: "Digital Products" },
]

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortOption, setSortOption] = useState("featured")

  const { addToCart } = useCart()
  const { toast } = useToast()

  // Filter products based on mood tab, search query, and category
  const filteredProducts = allProducts.filter((product) => {
    const matchesMood = activeTab === "all" || product.mood === activeTab
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

    return matchesMood && matchesSearch && matchesCategory
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low") {
      return a.price - b.price
    } else if (sortOption === "price-high") {
      return b.price - a.price
    } else if (sortOption === "name") {
      return a.name.localeCompare(b.name)
    }
    // Default: featured (no specific sort)
    return 0
  })

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Shop Products</h1>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mood Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-5 w-full max-w-md mx-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="happy">Happy</TabsTrigger>
          <TabsTrigger value="calm">Calm</TabsTrigger>
          <TabsTrigger value="sad">Comfort</TabsTrigger>
          <TabsTrigger value="energetic">Energetic</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {product.mood.charAt(0).toUpperCase() + product.mood.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.description}</p>
                <p className="font-bold">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No products found</h2>
          <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  )
}


"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock product data based on mood
const moodProducts = {
  happy: [
    { id: 1, name: "Celebration Box", price: 39.99, image: "/Cele.jpg", description: "A curated box of treats to celebrate good moments." },
    { id: 2, name: "Gratitude Journal", price: 14.99, image: "/jo.webp", description: "Record your daily moments of joy and gratitude." },
    { id: 3, name: "Party Lights", price: 24.99, image: "/pl.jpg", description: "Colorful LED lights to enhance your happy atmosphere." },
    { id: 4, name: "Upbeat Playlist Subscription", price: 9.99, image: "/uw.jpeg", description: "Access to curated playlists that boost your mood." },
  ],
  calm: [
    { id: 5, name: "Calming Tea Set", price: 24.99, image: "/tea.jpg", description: "A selection of herbal teas to help you relax and unwind." },
    { id: 6, name: "Aromatherapy Diffuser", price: 34.99, image: "/benefits-of-diffusers.webp", description: "Essential oil diffuser with calming scents." },
    { id: 7, name: "Meditation Cushion", price: 29.99, image: "/cu.webp", description: "Comfortable cushion for your meditation practice." },
    { id: 8, name: "Sound Machine", price: 19.99, image: "/sm.jpg", description: "Create a peaceful environment with nature sounds." },
  ],
  sad: [
    { id: 9, name: "Comfort Blanket", price: 34.99, image: "/blanket.jpg", description: "A soft, weighted blanket for those days when you need extra comfort." },
    { id: 10, name: "Self-Care Box", price: 44.99, image: "/gift.jpg", description: "A collection of items to help you practice self-care." },
    { id: 11, name: "Mood-Boosting Lamp", price: 49.99, image: "/lamp.jpeg", description: "Light therapy lamp to help improve your mood." },
    { id: 12, name: "Comforting Playlist Subscription", price: 9.99, image: "/cmu.jpg", description: "Access to music that provides comfort and support." },
  ],
  energetic: [
    { id: 13, name: "Energizing Fitness Kit", price: 49.99, image: "/kit.png", description: "Everything you need for a quick workout to boost your energy." },
    { id: 14, name: "Protein Snack Box", price: 29.99, image: "/1.jpeg", description: "Healthy snacks to fuel your active lifestyle." },
    { id: 15, name: "Wireless Earbuds", price: 59.99, image: "/2.jpeg", description: "High-quality earbuds for your energetic music or podcasts." },
    { id: 16, name: "Productivity Planner", price: 19.99, image: "/3.jpg", description: "Plan your day efficiently and channel your energy." },
  ],
}

// Mood descriptions and titles
const moodDescriptions = {
  happy: "You're in a positive and joyful mood! Here are some products to celebrate and enhance your happiness.",
  calm: "You're feeling peaceful and relaxed. These products can help maintain your tranquil state of mind.",
  sad: "You might be feeling down right now. These products are designed to provide comfort and support.",
  energetic: "You're full of energy and ready for action! These products can help channel your enthusiasm.",
}

const moodTitles = {
  happy: "Happy & Joyful",
  calm: "Calm & Peaceful",
  sad: "Looking for Comfort",
  energetic: "Energetic & Active",
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const [mood, setMood] = useState<string>("happy")
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const moodParam = searchParams.get("mood")
    if (moodParam && Object.keys(moodProducts).includes(moodParam)) {
      setMood(moodParam)
      setProducts(moodProducts[moodParam as keyof typeof moodProducts])
    } else {
      // Default to happy if no valid mood is provided
      setProducts(moodProducts.happy)
    }
  }, [searchParams])

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <Badge className="mb-4 text-lg px-3 py-1">{moodTitles[mood as keyof typeof moodTitles]}</Badge>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          Your Personalized Recommendations
        </h1>
        <p className="text-gray-500 md:text-xl dark:text-gray-400 max-w-[700px] mx-auto">
          {moodDescriptions[mood as keyof typeof moodDescriptions]}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription className="text-sm">{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="font-bold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" as="a" href={`/product/${product.id}`}>
                View Product
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/products">
          <Button size="lg">
            Browse All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

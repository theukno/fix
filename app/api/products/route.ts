import { NextResponse } from "next/server"
import { getAllProducts, getProductsByMood } from "@/lib/db"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const mood = url.searchParams.get("mood")

    let products

    if (mood) {
      products = await getProductsByMood(mood)
    } else {
      products = await getAllProducts()
    }

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}


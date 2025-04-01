import { NextResponse } from "next/server"
import { getUserByEmail } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Check if user exists
    const user = await getUserByEmail(email)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // In a real application, you should verify the password

    return NextResponse.json({
      message: "Login successful",
      user,
    }, { status: 200 })
  } catch (error) {
    console.error("Error logging in:", error)
    return NextResponse.json({ error: "Failed to login" }, { status: 500 })
  }
}

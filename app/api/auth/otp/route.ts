import { NextResponse } from "next/server"
import { getUserByEmail } from "@/lib/db"

// Mock OTP generation and storage
const otpStore: Record<string, { otp: string; expires: number }> = {}

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Store OTP with 10-minute expiration
    otpStore[email] = {
      otp,
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes
    }

    // In a real application, send the OTP via email
    console.log(`OTP for ${email}: ${otp}`)

    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error sending OTP:", error)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { email, otp } = await req.json()

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 })
    }

    // Verify OTP
    const storedOTP = otpStore[email]

    if (!storedOTP) {
      return NextResponse.json({ error: "No OTP found for this email" }, { status: 400 })
    }

    if (storedOTP.expires < Date.now()) {
      delete otpStore[email]
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 })
    }

    if (storedOTP.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }

    // OTP is valid, check if user exists
    const user = await getUserByEmail(email)

    // Clear OTP after successful verification
    delete otpStore[email]

    return NextResponse.json({
      message: "OTP verified successfully",
      isNewUser: !user,
    })
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 })
  }
}


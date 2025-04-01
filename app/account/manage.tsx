"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function ManageAccount() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const checkSession = () => {
      const email = localStorage.getItem("sessionEmail")
      if (!email) {
        router.push("/account") // Redirect to login page if session is not valid
      } else {
        setUser({ email })
      }
    }
    checkSession()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("sessionEmail")
    setUser(null)
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    })
    router.push("/account/page.tsx") // Redirect to login page after logging out
  }

  if (!user) {
    return (
      <div className="container max-w-md mx-auto py-12 px-4 text-center">
        <Card>
          <CardHeader>
            <CardTitle>Session Expired</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please log in again to manage your account.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/account/page.tsx")}>Go to Login</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Member Since:</strong> {new Date().toLocaleDateString()}</p>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" onClick={handleLogout}>Log Out</Button>
        </CardFooter>
      </Card>
    </div>
  )
}


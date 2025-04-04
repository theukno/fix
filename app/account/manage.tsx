"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function ManageAccount() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const checkSession = () => {
      const email = localStorage.getItem("sessionEmail")
      if (!email) {
        router.push("/account/page.tsx") // Redirect to login page if session is not valid
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
        <div className="border rounded-lg p-8 shadow-lg">
          <header className="mb-4">
            <h2 className="text-xl font-semibold">Session Expired</h2>
          </header>
          <section className="mb-4">
            <p>Please log in again to manage your account.</p>
          </section>
          <footer>
            <Button onClick={() => router.push("/account/page.tsx")}>Go to Login</Button>
          </footer>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <div className="border rounded-lg p-8 shadow-lg">
        <header className="mb-4">
          <h2 className="text-xl font-semibold">Account Management</h2>
        </header>
        <section className="mb-4">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Member Since:</strong> {new Date().toLocaleDateString()}</p>
        </section>
        <footer>
          <Button variant="destructive" onClick={handleLogout}>Log Out</Button>
        </footer>
      </div>
    </div>
  )
}

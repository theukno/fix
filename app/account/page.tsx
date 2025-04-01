"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function ManageAccount() {
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionEmail = localStorage.getItem("sessionEmail")
        if (!sessionEmail) return

        const res = await fetch("/api/account", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: sessionEmail }),
        })
        const data = await res.json()

        if (res.ok) {
          setUser(data.user)
        } else {
          localStorage.removeItem("sessionEmail")
        }
      } catch (error) {
        console.error("Error checking session:", error)
      }
    }
    checkSession()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" })
      return
    }

    try {
      const res = await fetch("/api/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (res.ok) {
        localStorage.setItem("sessionEmail", email)
        setUser(data.user)
        toast({ title: "Login Successful" })
        router.push("/account/manage")
      } else {
        toast({ title: "Login Failed", description: data.message, variant: "destructive" })
      }
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  const handleLogout = async () => {
    if (!user) return

    try {
      await fetch("/api/account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      })
      localStorage.removeItem("sessionEmail")
      setUser(null)
      toast({ title: "Logged out successfully" })
      router.push("/account")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (!user) {
    return (
      <div className="container max-w-md mx-auto py-12 px-4 text-center">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
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
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Member Since:</strong> {new Date().toLocaleDateString()}</p>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" onClick={handleLogout}>Log Out</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

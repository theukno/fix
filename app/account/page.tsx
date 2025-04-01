"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function AccountPage() {
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const sessionEmail = localStorage.getItem("sessionEmail")
    if (sessionEmail) {
      setUser({ email: sessionEmail })
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" })
      return
    }
    localStorage.setItem("sessionEmail", email)
    setUser({ email })
    toast({ title: "Login Successful", description: "You have been logged in successfully." })
  }

  const handleLogout = () => {
    localStorage.removeItem("sessionEmail")
    setUser(null)
    toast({ title: "Logged Out", description: "You have been logged out successfully." })
  }

  if (user) {
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

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Account Access</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input id="email-login" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login">Password</Label>
                  <Input id="password-login" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

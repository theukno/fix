"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const checkSession = async () => {
      const sessionEmail = localStorage.getItem("sessionEmail")
      if (sessionEmail) {
        setIsLoggedIn(true)
        setUser({ email: sessionEmail }) // Mock user info, ideally fetched from the backend
      }
    }
    checkSession()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Mock login process
    localStorage.setItem("sessionEmail", email) // Storing user email as part of session
    setIsLoggedIn(true)
    setUser({ email })
    toast({
      title: "Login Successful",
      description: "You are now logged in.",
    })
    router.push("/app/page.tsx") // Redirect to account management page after login
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Simulating signup process here (you would typically send data to an API)
    toast({
      title: "Signup Successful",
      description: "Your account has been created.",
    })

    // After signup, automatically log the user in
    localStorage.setItem("sessionEmail", email) // Store email to mark user as logged in
    setIsLoggedIn(true)
    setUser({ email })

    // Redirect to the account management page after signup
    router.push("/app/page.tsx")
  }

  const handleLogout = async () => {
    localStorage.removeItem("sessionEmail")
    setIsLoggedIn(false)
    setUser(null)
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    })
    router.push("/account/page.tsx") // Redirect to the login page after logout
  }

  if (isLoggedIn) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        <div className="border rounded-lg p-8 shadow-lg">
          <header className="mb-4">
            <h2 className="text-xl font-semibold">Account Info</h2>
          </header>
          <section className="mb-4">
            <p className="text-sm text-muted-foreground mb-1">Email</p>
            <p className="font-medium mb-4">{user?.email}</p>
            <p className="text-sm text-muted-foreground mb-1">Member Since</p>
            <p className="font-medium">{new Date().toLocaleDateString()}</p>
          </section>
          <footer>
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              Log Out
            </Button>
          </footer>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <div className="border rounded-lg p-8 shadow-lg">
        <header className="text-center mb-4">
          <h2 className="text-2xl font-semibold">Account Access</h2>
          <p className="text-sm text-muted-foreground">Sign in or create an account to continue</p>
        </header>
        <section>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input
                    id="email-login"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login">Password</Label>
                  <Input
                    id="password-login"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input
                    id="email-signup"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input
                    id="password-signup"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  )
}

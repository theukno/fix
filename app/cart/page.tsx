"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/components/cart-provider"
import { useRouter } from "next/navigation" // Import useRouter
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, CreditCard, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal } = useCart()
  const { toast } = useToast()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Placeholder for login state
  const router = useRouter() // Initialize router

  useEffect(() => {
    const sessionEmail = localStorage.getItem("sessionEmail")
    if (sessionEmail) {
      setIsLoggedIn(true) // Update state if user is logged in
    }
  }, [])

  const handleCheckout = () => {
    console.log("Checkout clicked!"); // Debug log to track click
    if (!isLoggedIn) {
      console.log("User not logged in, redirecting to login page..."); // Debug log for redirection
      router.push("/app/account/page.tsx"); // Redirect to login page (remove `.tsx`)
    } else {
      console.log("User logged in, redirecting to payment page..."); // Debug log for routing
      router.push("/app/checkout/page.tsx"); // Redirect to payment page (remove `.tsx`)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-muted p-6">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground">Looks like you haven't added any products to your cart yet.</p>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border rounded-md shadow-md">
              <div className="relative h-24 w-24 rounded-md overflow-hidden">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">${item.price.toFixed(2)}</p>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="p-6 border rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex flex-col space-y-2 mt-4">
              <Button className="w-full" onClick={handleCheckout}>
                <CreditCard className="mr-2 h-4 w-4" />
                Checkout
              </Button>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

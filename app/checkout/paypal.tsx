// app/paypal/checkout.tsx

"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

// Dynamically import the PayPalButton component (to prevent SSR issues)
const PayPalButton = dynamic(() => import("./components/PayPalButton"), { ssr: false })

export default function CheckoutPage() {
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentError, setPaymentError] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true)
    toast({
      title: "Payment Successful!",
      description: "Thank you for your purchase.",
    })
  }

  const handlePaymentError = () => {
    setPaymentError(true)
    toast({
      title: "Payment Failed",
      description: "Something went wrong with your payment. Please try again.",
      variant: "destructive",
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Pay with PayPal</h1>

      <div className="w-full max-w-md p-6 border rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>$10.00</span>
        </div>

        <div className="mb-4">
          <PayPalButton amount="10.00" onSuccess={handlePaymentSuccess} onError={handlePaymentError} />
        </div>
      </div>

      {paymentSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
            <p className="mt-2">Thank you for your purchase.</p>
            <Button className="mt-4" onClick={() => router.push("/")}>Go to Homepage</Button>
          </div>
        </div>
      )}

      {paymentError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <h2 className="text-2xl font-bold text-red-600">Payment Failed!</h2>
            <p className="mt-2">Something went wrong. Please try again.</p>
            <Button className="mt-4" onClick={() => setPaymentError(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}

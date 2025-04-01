"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

export default function CheckoutPage() {
  const [total, setTotal] = useState(99.99)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Enter your shipping details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input id="zipCode" placeholder="10001" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Product Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              {isClient && (
                <PayPalScriptProvider options={{ clientId: "AZz1Rm-UFpfhQNhvTBWUMFVuFGKdmMeY-fPkcdDe7FpgU2o1G4n33frFvsBolbStXvOmfZcY_vSXi_XL" }}>
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={async (data, actions) => {
                      return await actions.order.create({
                        purchase_units: [{ amount: { value: total.toString() } }],
                      })
                    }}
                    onApprove={async (data, actions) => {
                      return await actions.order.capture()
                        .then((details) => {
                          alert("Transaction completed by " + details.payer.name.given_name)
                        })
                        .catch((error) => {
                          console.error("Payment failed:", error);
                          alert("Payment failed. Please try again.");
                        });
                    }}
                  />
                </PayPalScriptProvider>
              )}
              <Button className="w-full mt-4" onClick={() => document.querySelector("iframe")?.contentWindow?.document.querySelector("button")?.click()}>
                Complete Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

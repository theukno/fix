"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/components/cart-provider";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { cartItems, subtotal, clearCart } = useCart();
  const [isComplete, setIsComplete] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false); // State to show PayPal buttons

  const handleCheckoutClick = () => {
    setShowPayPal(true); // Show PayPal buttons when checkout is clicked
  };

  const handlePaymentSuccess = (details) => {
    setIsComplete(true);
    clearCart();

    toast({
      title: "Payment Successful",
      description: `Thank you, ${details.payer.name.given_name}! Your order has been placed.`,
    });

    setTimeout(() => router.push("/checkout/confirmation"), 2000);
  };

  const handlePaymentError = (err) => {
    console.error("PayPal Checkout Error:", err);
    toast({
      title: "Payment Failed",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
  };

  const handlePaymentCancel = () => {
    toast({
      title: "Payment Cancelled",
      description: "You have cancelled the payment process.",
    });
  };

  useEffect(() => {
    if (cartItems.length === 0 && !isComplete) {
      router.push("/cart");
    }
  }, [cartItems, isComplete, router]);

  return (
    <PayPalScriptProvider options={{ "client-id": "YOUR_REAL_PAYPAL_CLIENT_ID", currency: "USD" }}>
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {isComplete ? (
          <div className="text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-semibold">Order Confirmed!</h2>
            <p>Thank you for your purchase.</p>
            <Button className="mt-4" onClick={() => router.push("/")}>Return to Home</Button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="p-6 border rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Payment</h2>
                {!showPayPal ? (
                  <Button onClick={handleCheckoutClick} className="w-full">
                    Proceed to Checkout
                  </Button>
                ) : (
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: { value: subtotal.toFixed(2) },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then(handlePaymentSuccess);
                    }}
                    onError={handlePaymentError}
                    onCancel={handlePaymentCancel}
                  />
                )}
              </div>
            </div>

            <div>
              <div className="p-6 border rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between mb-2">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PayPalScriptProvider>
  );
}

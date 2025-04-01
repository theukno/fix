"use client"; // Ensures this file runs only on the client side

import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import { Button } from "@/components/ui/button"; // UI Button component

export default function CheckoutPage() {
  const [isPayPalLoaded, setIsPayPalLoaded] = useState(false);
  const router = useRouter();

  // Logic to load PayPal script
  useEffect(() => {
    if (typeof window !== "undefined" && !window.paypal) {
      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=AZz1Rm-UFpfhQNhvTBWUMFVuFGKdmMeY-fPkcdDe7FpgU2o1G4n33frFvsBolbStXvOmfZcY_vSXi_XL";
      script.async = true;
      script.onload = () => setIsPayPalLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsPayPalLoaded(true);
    }
  }, []);

  // Redirect to the gateway page when the user clicks "Complete Purchase"
  const handleCompletePurchase = () => {
    router.push("/appy/checkout/paypal"); // Redirect to the payment gateway page
  };

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="p-6 border rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Payment Options</h2>

        {/* PayPal Button */}
        {isPayPalLoaded ? (
          <div id="paypal-button-container">
            {/* Your dynamically imported PayPal button component */}
            <PayPalButton />
          </div>
        ) : (
          <p>Loading PayPal...</p>
        )}

        {/* Fallback Checkout Button */}
        <Button className="w-full mt-4" onClick={handleCompletePurchase}>
          Complete Purchase
        </Button>
      </div>
    </div>
  );
}

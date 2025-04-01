"use client"; // Ensures this file runs only on the client side
 
 import { useRouter } from "next/navigation";
 import { Button } from "@/components/ui/button";
 import { useCart } from "@/components/cart-provider";
 import PayPal from "/paypal";
 import { useEffect, useState } from "react";
 import { useRouter } from "next/navigation"; // For navigation
 import { Button } from "@/components/ui/button"; // UI Button component
 import dynamic from "next/dynamic"; // For dynamic imports
 
 export default function InvoicePage() {
 // Dynamically import the PayPal button component (if using one)
 const PayPalButton = dynamic(() => import("@/components/PayPalButton"), {
   ssr: false, // Prevents SSR errors
 });
 
 export default function CheckoutPage() {
   const [isPayPalLoaded, setIsPayPalLoaded] = useState(false);
   const router = useRouter();
   
 
   useEffect(() => {
     if (typeof window !== "undefined" && !window.paypal) {
       const script = document.createElement("script");
       script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID";
       script.async = true;
       script.onload = () => setIsPayPalLoaded(true);
       document.body.appendChild(script);
     } else {
       setIsPayPalLoaded(true);
     }
   }, []);
 
   return (
     <Paypal />
     <div className="container max-w-4xl mx-auto py-12 px-4">
       <h1 className="text-3xl font-bold mb-6">Checkout</h1>
 
       <div className="p-6 border rounded-md shadow-md">
         <h2 className="text-xl font-semibold mb-4">Payment Options</h2>
 
         {/* PayPal Button */}
         {isPayPalLoaded ? (
           <div id="paypal-button-container">
             <PayPalButton />
           </div>
         ) : (
           <p>Loading PayPal...</p>
         )}
 
         {/* Fallback Checkout Button */}
         <Button className="w-full mt-4" onClick={() => router.push("/thank-you")}>
           Complete Purchase
         </Button>
       </div>
     </div>
   );
 }

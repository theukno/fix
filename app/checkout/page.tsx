"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import PayPal from "/paypal";

export default function InvoicePage() {
  const router = useRouter();
  
  return (
    <Paypal />
  );
}

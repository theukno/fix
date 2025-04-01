"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function InvoicePage() {
  const router = useRouter();
  const { cartItems, subtotal } = useCart();

  const generateInvoice = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 14, 20);
    doc.setFontSize(12);
    doc.text("Order Summary:", 14, 30);

    const tableData = cartItems.map((item) => [item.name, item.quantity, `$${(item.price * item.quantity).toFixed(2)}`]);
    doc.autoTable({
      head: [["Item", "Quantity", "Price"]],
      body: tableData,
      startY: 40,
    });

    doc.text(`Total: $${subtotal.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);
    doc.save("invoice.pdf");
  };

  const handlePayment = async () => {
    try {
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: subtotal.toFixed(2) }),
      });
      const data = await response.json();
      if (data?.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        throw new Error("Failed to get PayPal approval URL");
      }
    } catch (error) {
      console.error("PayPal Payment Error:", error);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Invoice</h1>
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
      <div className="mt-6 flex gap-4">
        <Button onClick={generateInvoice} className="bg-gray-500 hover:bg-gray-600 text-white">
          Download Invoice
        </Button>
        <Button onClick={handlePayment} className="bg-blue-500 hover:bg-blue-600 text-white">
          Make Payment
        </Button>
      </div>
    </div>
  );
}

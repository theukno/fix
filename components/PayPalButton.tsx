// app/paypal/components/PayPalButton.tsx

"use client"  // Ensure this runs only on the client side

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

interface PayPalButtonProps {
  amount: string
  onSuccess: () => void
  onError: () => void
}

export default function PayPalButton({ amount, onSuccess, onError }: PayPalButtonProps) {
  return (
    <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount } }],
          })
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(() => {
            onSuccess()
          })
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  )
}

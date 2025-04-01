// app/paypal/components/PayPalButton.tsx

"use client"  // Ensure this runs only on the client side

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

interface PayPalButtonProps {
  amount: string
  onSuccess: () => void
  onError: () => void
}

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount }) => {
    return (
        <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: amount, // Dynamic value
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        alert("Transaction completed by " + details.payer.name.given_name);
                    });
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;

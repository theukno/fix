"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
      {children}
    </PayPalScriptProvider>
  );
};

export default PayPalProvider;

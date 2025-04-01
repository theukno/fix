import React, { useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation, useNavigate } from "react-router-dom";

const PayPal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let username = sessionStorage.getItem('username');
  const plan = location.state?.plan || "No file selected";
  const clientId = "AZz1Rm-UFpfhQNhvTBWUMFVuFGKdmMeY-fPkcdDe7FpgU2o1G4n33frFvsBolbStXvOmfZcY_vSXi_XL";
  const initialOptions = {
    "client-id": clientId,
    currency: "USD",
    intent: "capture",
  };


  return (
    <div className="paymentCon">
      <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: { value: plan },
                },
              ],
              application_context: {
                shipping_preference: "NO_SHIPPING",
                user_action: "PAY_NOW",
              },
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              alert(Transaction completed by ${details.payer.name.given_name});
            });
          }}
          onError={(err) => {
            console.error("PayPal error:", err);
            alert("An error occurred while processing the payment.");
          }}
        />
        <div className="text-gray-500 text-sm mt-2">
          Powered by <span className="text-blue-500">PayPal</span>
        </div>
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPal;

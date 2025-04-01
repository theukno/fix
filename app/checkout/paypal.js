"use client"; // Runs only on the client side

import { useState, useEffect } from "react";
import PayPalButton from "@/components/PayPalButton";

const Checkout = () => {
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        // Fetch or calculate the total amount dynamically
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setCartTotal(total.toFixed(2)); // Ensure two decimal places for PayPal
    }, []);

    return (
        <div>
            <h1>Checkout</h1>
            <PayPalButton amount={cartTotal} />
        </div>
    );
};

export default Checkout;

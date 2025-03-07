import { rederOrderSummary } from "./Checkouts/orderSummary.js";
import { renderPaymentSummary } from "./Checkouts/paymentSummary.js";
import '../data/backend-practice.js';
import { cart, updateCartQuantityDisplay } from "../data/cart.js";



// Call the function when the page loads
updateCartQuantityDisplay();

rederOrderSummary();
renderPaymentSummary();
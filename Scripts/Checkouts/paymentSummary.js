import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getdeliverOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export const renderPaymentSummary = () => {
  let totalQuantity = 0;
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    if (product) {
      productPriceCents += product.priceCents * cartItem.quantity;
    }

    const deliveryOption = getdeliverOption(cartItem.deliverOptionId);
    if (deliveryOption) {
      shippingPriceCents += deliveryOption.priceCents;
    }
  });

  for(let i = 0 ; i < cart.length ; i++){
    totalQuantity += cart[i].quantity;
  }
 
  

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = taxCents + totalBeforeTaxCents;

  const paymentSummaryHtml = ` 
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (<span class="js-total-quantity">${totalQuantity}</span>):</div>
            <div class="payment-summary-money">
            $${formatCurrency(productPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
              $${formatCurrency(shippingPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
              $${formatCurrency(totalBeforeTaxCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
              $${formatCurrency(taxCents)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
              $${formatCurrency(totalCents)}
            </div>
          </div>

          <button class="place-order-button button-primary">
           Place your order
          </button> `;


          document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;

};

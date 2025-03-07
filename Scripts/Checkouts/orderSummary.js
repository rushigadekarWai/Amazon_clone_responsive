import {
  cart,
  removeFromCart,
  updateCartQuantity,
  updateCartQuantityDisplay,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  deliverOptions,
  getdeliverOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export const rederOrderSummary = () => {


  const orderSummaryContainer = document.querySelector(".js-order-summary");

   if (!orderSummaryContainer) {
    console.error("❌ orderSummaryContainer not found in the DOM!");
    return;
  }

  // 🔹 Check if the cart is empty
  if (cart.length === 0) {
    orderSummaryContainer.innerHTML = `
      <div class="empty-cart-message">
        <p>🛒 Your cart is empty! Add products to continue shopping.</p>
      </div>
    `;
    return;
  }

  let cartSummaryHtml = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    const deliverOptionHtml = (matchingProduct, cartItem) => {
      let html = "";

      deliverOptions.forEach((deliverOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliverOption.deliveryDays, "days");

        const dateString = deliveryDate.format("dddd, MMMM, D");

        const priceString =
          deliverOption.priceCents === 0
            ? "FREE"
            : `$${formatCurrency(deliverOption.priceCents)} -`;

        const isChecked = deliverOption.id === cartItem.deliverOptionId;

        html += `<div class="delivery-option js-delivery-option" 
      data-product-id="${matchingProduct.id}"
      data-deliver-option-id =" ${deliverOption.id}">
                  <input type="radio"
                    ${isChecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} - Shipping
                    </div>
                  </div>
                </div> `;
      });
      return html;
    };

    const deliveryOptionId = cartItem.deliverOptionId;

    // let deliverOption;
    // deliverOptions.forEach((option)=>{
    //   if(option.id === deliveryOptionId){
    //     deliverOption = option;

    //   }
    // });
    const deliverOption = getdeliverOption(deliveryOptionId);
    const today = dayjs();
    const deliveryDate = today.add(deliverOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM, D");

    cartSummaryHtml += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}" 
     data-product-id="${matchingProduct.id}"
     data-deliver-option-id="${deliverOption.id}"
  >
    <div class="delivery-date">  
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image" src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">${matchingProduct.pname}</div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: 
            <span class="js-quantity-display" data-product-id="${matchingProduct.id}">
              ${cartItem.quantity}
            </span>
          </span>

          <button class="update-quantity-button js-show-quantity-box" 
                  data-product-id="${matchingProduct.id}">
            Update
          </button>

          <span class="delete-quantity-link link-primary js-delete-link" 
                data-product-id="${matchingProduct.id}">
            Delete
          </span>

          <!-- Hidden Quantity Input Box -->
          <div class="quantity-box js-quantity-box" data-product-id="${matchingProduct.id}">
            <input type="number" 
                   class="quantity-input js-quantity-input"
                   data-product-id="${matchingProduct.id}"
                   min="1"
                   step="1"
                   style="width: 50px; padding: 5px; text-align: center;">
            <button class="save-quantity-button js-save-quantity" 
                    data-product-id="${matchingProduct.id}">
              Save
            </button>
            <button class="cancel-quantity-button js-cancel-quantity"
                    data-product-id="${matchingProduct.id}">
              Cancel
            </button>
          </div>

        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliverOptionHtml(matchingProduct, cartItem)}               
      </div>
    </div>
  </div>
`;

  });

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();

      rederOrderSummary();
      renderPaymentSummary();
    });
  });

  // Update Quantity Functionality
  document.querySelectorAll(".js-quantity-select").forEach((select) => {
    select.addEventListener("change", (event) => {
      const newQuantity = parseInt(event.target.value);
      const productId = event.target.dataset.productId;

      updateCartQuantity(productId, newQuantity);
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", (event) => {
      const cartItemContainer = event.target.closest(".cart-item-container");
      if (!cartItemContainer) return;

      const productId = cartItemContainer.dataset.productId;
      const deliverOptionId = element.dataset.deliverOptionId.trim();
      if (!productId) return;

      updateDeliveryOption(productId, deliverOptionId);

      const selectedOption = deliverOptions.find(
        (opt) => opt.id === deliverOptionId
      );
      if (!selectedOption) return;

      const newDeliveryDate = dayjs()
        .add(selectedOption.deliveryDays, "days")
        .format("dddd, MMMM D");
      cartItemContainer.querySelector(
        ".delivery-date"
      ).textContent = `Delivery date: ${newDeliveryDate}`;

      renderPaymentSummary();
    });
  });



  // update btn js
  document.querySelectorAll(".js-show-quantity-box").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.productId;
      const quantityBox = document.querySelector(`.js-quantity-box[data-product-id="${productId}"]`);
      quantityBox.style.display = "block"; // Show the box
    });
    updateCartQuantityDisplay();
  });

  document.querySelectorAll(".js-cancel-quantity").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.productId;
      const quantityBox = document.querySelector(`.js-quantity-box[data-product-id="${productId}"]`);
      quantityBox.style.display = "none"; // Hide the box
    });

  });
  
  // Save button to update quantity
  document.querySelectorAll(".js-save-quantity").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.productId;
      const inputField = document.querySelector(`.js-quantity-input[data-product-id="${productId}"]`);
      const newQuantity = parseInt(inputField.value);
  
      if (isNaN(newQuantity) || newQuantity < 1) {
        alert("Please enter a valid quantity (1 or more).");
        return;
      }
  
      updateCartQuantity(productId, newQuantity);
  
      // Update the displayed quantity in the cart
      document.querySelector(`.js-quantity-display[data-product-id="${productId}"]`).textContent = newQuantity;
  
      // Hide the input box
      const quantityBox = document.querySelector(`.js-quantity-box[data-product-id="${productId}"]`);
      quantityBox.style.display = "none";
  
      // ✅ Call renderPaymentSummary() to update the total
      updateCartQuantityDisplay();
      renderPaymentSummary();
    });
  });
  
  
};



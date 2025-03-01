import { cart, removeFromCart, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliverOptions } from "../data/deliveryOptions.js";

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

      html += `<div class="delivery-option">
                  <input type="radio"
                    ${isChecked ? 'checked' : ' '}
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
  let deliveryOption;

  deliverOptions.forEach( (option)=>{
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }

  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM, D");




  cartSummaryHtml += `<div class="cart-item-container js-cart-item-container-${
    matchingProduct.id
  }">
            <div class="delivery-date">           
               Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.pname}  
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: 
                    <select class="quantity-select js-quantity-select" data-product-id="${
                      matchingProduct.id
                    }">
                      ${[1, 2, 3, 4, 5]
                        .map(
                          (qty) => `
                        <option value="${qty}" ${
                            cartItem.quantity === qty ? "selected" : ""
                          }>${qty}</option>
                      `
                        )
                        .join("")}
                    </select>
                  </span>

                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                    matchingProduct.id
                  }">
                    Delete
                  </span>
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

//date js code

// const deliveryDate = today.add(7, 'days');
// deliveryDate.format('dddd, MMMM D');
// console.log( deliveryDate.format('dddd, MMMM D'));

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();
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

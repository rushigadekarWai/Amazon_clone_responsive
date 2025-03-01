import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";

// const products = [
//   {
//     image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//     pname: "Black and Gray Atheletic Cotton Socks - 6 Pairs",
//     rating: {
//       stars: 4.5,
//       count: 87,
//     },
//     priceCents: 1090,
//   },

//   {
//     image: "images/products/intermediate-composite-basketball.jpg",
//     pname: "Intermediate Size Basketball",
//     rating: {
//       stars: 4,
//       count: 127,
//     },
//     priceCents: 2095,
//   },

//   {
//     image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//     pname: " Adults Plain Cotton T-shirt - 2 Pack",
//     rating: {
//       stars: 4.5,
//       count: 56,
//     },
//     priceCents: 799,
//   },
//   {
//     image:'images/products/black-2-slot-toaster.jpg',
//     pname:"2 Slot Toaster - Black",
//     rating:{
//       stars:4.5,
//       count:2197
//     },
//     priceCents:1899
//   }
// ];

let productsHtml = "";

products.forEach((product) => {
  productsHtml += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
             ${product.pname}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container js-quantity-selector-${
            product.id
          }">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">

            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${
            product.id
          }"
          >
            Add to Cart
          </button>
        </div>`;
});


const addMessage = (addedMessage) => {
  if (addedMessage) {
    addedMessage.classList.add("show-message");

    setTimeout(() => {
      addedMessage.classList.remove("show-message");
    }, 2000);
  }
};

const updateCartQuantity = () => {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
};

document.querySelector(".js-products-grid").innerHTML = productsHtml;

// document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
//   button.addEventListener('click',  ()=>{
//     const productName =  button.dataset.productName;

//     let matchingItem;

//     cart.forEach((item)=>{
//       if(productName === item.productName){
//         matchingItem = item;
//       }
//     });

//     if(matchingItem){
//       matchingItem.quantity += 1;
//     }
//     else{
//       cart.push({
//         productName: productName,
//         quantity:1
//       });
//     }

//     let cartQuantity = 0;

//     cart.forEach( (item)=>{
//       cartQuantity += item.quantity;

//     })

//     document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

//   });

// })

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    const productContainer = button.closest(".product-container");
    const quantitySelector = productContainer.querySelector("select");
    const addedMessage = productContainer.querySelector(".added-to-cart");

    if (!quantitySelector) {
      console.error(`Quantity selector not found for product ID: ${productId}`);
      return;
    }
    // Get the selected value
    const selectedQuantity = Number(quantitySelector.value);

    
    addMessage(addedMessage);

    addToCart(productId, addedMessage, selectedQuantity);
    updateCartQuantity();
  });
});

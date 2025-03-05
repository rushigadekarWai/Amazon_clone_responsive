import { loadFromStorage } from "./cart";

const cart = {
  cartItems: undefined,
  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem("cart-oop"));

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliverOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliverOptionId: "2",
        },
      ];
    }
  },

  saveToStorage() {
    localStorage.setItem("cart-oop", JSON.stringify(cart));
  },

  addToCart(productId, selectedQuantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
      if (productId === cartItem.id) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
      // matchingItem.quantity += selectedQuantity;
    } else {
      cart.push({
        productId: productId,
        quantity: 1,
        deliverOptionId: "1",
        // quantity: selectedQuantity,
      });
    }

    saveToStorage();
  },

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId != productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveToStorage();
  },

  updateDeliveryOption(productId, deliverOptionId) {
    const cartItem = this.cartItems.find(
      (item) => item.productId === productId
    );
    if (!cartItem) {
      console.error("❌ No matching cart item found for productId:", productId);
      return;
    }

    cartItem.deliverOptionId = deliverOptionId;
    this.saveToStorage();
  },
};


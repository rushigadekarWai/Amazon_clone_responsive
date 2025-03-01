export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
 cart = [{
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliverOptionId: '1'
  },
  {
    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1,
    deliverOptionId: '2'
  }
  ];
}




const saveToStorage = () =>{
  localStorage.setItem('cart', JSON.stringify(cart));
}

export const addToCart = (productId, selectedQuantity) => {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.id) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity +=1;
    // matchingItem.quantity += selectedQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity : 1,
      deliverOptionId: '1'
      // quantity: selectedQuantity,
    });
  }

  saveToStorage();
};


export const removeFromCart = (productId)=>{
    const newCart = [];

    cart.forEach((cartItem)=>{
      if(cartItem.productId != productId){
        newCart.push(cartItem)
      }
    });

    cart = newCart;
    saveToStorage();

}

export function updateCartQuantity(productId, newQuantity) {
  const cartItem = cart.find(item => item.productId === productId);
  if (cartItem) {
    cartItem.quantity = newQuantity;
  }
}

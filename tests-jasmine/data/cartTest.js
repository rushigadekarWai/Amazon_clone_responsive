import {cart, addToCart} from '../../data/cart.js';
import { products } from '../../data/products.js';

describe('test suite: addTocart', ()=>{
  it('adds exiting product to the cart', ()=>{
    spyOn(localStorage, 'setItem');
    spyOn(loadFromStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([
        {
          productId:'aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f',
          quantity: 1,
          deliverOptionId: '1'
        }
      ])
    });
    loadFromStorage();

    
    addToCart('aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(cart[0].productId).toEqual('aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f');
    expect(cart[0].quantity)
  });

  it('adds a new product to the cart', ()=>{

    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    loadFromStorage();
    // console.log(localStorage.getItem('cart'));                 

    addToCart('aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(cart[0].productId).toEqual('aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f');
    expect(cart[0].quantity)
  });
})
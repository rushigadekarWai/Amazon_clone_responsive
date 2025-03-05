import {renderOrderSummary} from '../../Scripts/Checkouts/orderSummary.js';
import {loadFromStorage} from '../../data/cart.js';


describe('test suite: renderOrderSummary', () =>{
  it('displays the cart', ()=>{
    document.querySelector('.js-test-container').innerHTML = ` 
    
        <div class="js-order-summary"></div>
    
    `;

    spyOn(loadFromStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliverOptionId: '1'
      },
      {
        productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity : 1,
        deliverOptionId: '2'
      }
      ]);

    });
    loadFromStorage();
    
    renderOrderSummary();

    expect(
      document.querySelectorAll('.js-cart-item-container').length ).toEqual(2);

      
  })
})
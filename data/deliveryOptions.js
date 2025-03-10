export const deliverOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
];


export const getdeliverOption = (deliverOptionId)=>{
  let deliverOption;
   deliverOptions.forEach((options)=>{
    if(options.id === deliverOptionId){
      deliverOption = options;
    }
   })
   return deliverOption || deliverOptions[0];
}

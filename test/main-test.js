'use strict';

describe('pos', () => {

  //test isCartItemsValid
  it('should print valid when call isCartItemsValid', () => {

    const cartItems = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    isCartItemsValid(cartItems);

    const expectText = `valid`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });

  it('should print CartItems is Empty when call isCartItemsValid', () => {

    const cartItems = [];

    spyOn(console, 'log');

    isCartItemsValid(cartItems);

    const expectText = "CartItems is Empty!";

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
  
  it('should print Barcode is not Exists! when call isCartItemsValid', () => {

    const cartItems = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000009',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    isCartItemsValid(cartItems);

    const expectText = "Barcode is not Exists!";

    expect(console.log).toHaveBeenCalledWith(expectText);
  });

  //test getItemLists
  it('should print itemLists when call getItemLists', () => {

    const cartItems = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    getItemLists(cartItems);

    const expectText = [{ barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 5 }, { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2.5 }, { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, count: 3 }];
    expect(console.log).toHaveBeenCalledWith(expectText);
  });

  it('should print Barcode is not Exists! when call getItemLists', () => {

    const cartItems = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000009',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    getItemLists(cartItems);

    const expectText = "Barcode is not Exists!";
    expect(console.log).toHaveBeenCalledWith(expectText);
  });

  //test getSumCostLists
  it('should print sumCostLists when call getSumCostLists', () => {

    const itemLists = [{ barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 5 }, { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2.5 }, { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, count: 3 }];
    
    spyOn(console, 'log');
    
    getSumCostLists(itemLists);
    
    const expectText = [{ barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 5, sum: 15 }, { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2.5, sum: 37.5 }, { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, count: 3, sum: 13.5 }];
    expect(console.log).toHaveBeenCalledWith(expectText);
  });  
  
  //test getPromotionLists
  it('should print promotionLists when call getPromotionLists', () => {
    
    const sumCostLists = [{ barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 5, sum: 15 }, { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2.5, sum: 37.5 }, { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, count: 3, sum: 13.5 }];
    
    spyOn(console, 'log');

    getPromotionLists(sumCostLists);

    const expectText = [{ barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 5, sum: 15, promotionPrice: 6 }, { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2.5, sum: 37.5, promotionPrice: 0 }, { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, count: 3, sum: 13.5, promotionPrice: 4.5 }];
    expect(console.log).toHaveBeenCalledWith(expectText);
  });  
  
  //test getReceiptCostItems
  it('should print receiptCostItems when call getReceiptCostItems', () => {
    
    const itemLists = [{ barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 5 }, { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2.5 }, { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, count: 3 }];

    spyOn(console, 'log');

    getReceiptCostItems(itemLists);

    const expectText = [{ barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 5, sum: 15, promotionPrice: 6 }, { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2.5, sum: 37.5, promotionPrice: 0 }, { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, count: 3, sum: 13.5, promotionPrice: 4.5 }];
    expect(console.log).toHaveBeenCalledWith(expectText);
  });  

  //test getTotalPrice
  it('should print totalPrice when call getTotalPrice', () => {
    
    const receiptCostItems = [{ barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 5, sum: 15, promotionPrice: 6 }, { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2.5, sum: 37.5, promotionPrice: 0 }, { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, count: 3, sum: 13.5, promotionPrice: 4.5 }];

    spyOn(console, 'log');

    getTotalPrice(receiptCostItems);

    const expectText = 55.50;
    expect(console.log).toHaveBeenCalledWith(expectText);
  });  

  //test getTotalPromotion
  it('should print totalPromotion when call getTotalPromotion', () => {
    
    const receiptCostItems = [{ barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 5, sum: 15, promotionPrice: 6 }, { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2.5, sum: 37.5, promotionPrice: 0 }, { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, count: 3, sum: 13.5, promotionPrice: 4.5 }];

    spyOn(console, 'log');

    getTotalPromotion(receiptCostItems);

    const expectText = 10.5;
    expect(console.log).toHaveBeenCalledWith(expectText);
  });  

  //test printReceipt
//   it('should print text', () => {

//     const tags = [
//       'ITEM000001',
//       'ITEM000001',
//       'ITEM000001',
//       'ITEM000001',
//       'ITEM000001',
//       'ITEM000003-2.5',
//       'ITEM000005',
//       'ITEM000005-2',
//     ];

//     spyOn(console, 'log');

//     printReceipt(tags);

//     const expectText = `***<没钱赚商店>收据***
// 名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
// 名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
// 名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
// ----------------------
// 总计：58.50(元)
// 节省：7.50(元)
// **********************`;

//     expect(console.log).toHaveBeenCalledWith(expectText);
//   });
});

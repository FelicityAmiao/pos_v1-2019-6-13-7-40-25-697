'use strict';

describe('pos', () => {

  //test isCartItemsValid
  it('should print valid', () => {

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

  it('should print CartItems is Empty', () => {

    const cartItems = [];

    spyOn(console, 'log');

    isCartItemsValid(cartItems);

    const expectText = "CartItems is Empty!";

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
  
  it('should print Barcode is not Exists!', () => {

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

'use strict';

let dbValidBarcodes = () => loadAllItems().map((dbItem) => dbItem.barcode);

let isCartItemsEmpty = (cartItems) => !cartItems || cartItems.length === 0;

let getSplitedCartItems = (cartItems) => cartItems.map((cartItem) => {
    let barcodeCount = cartItem.split("-");
    return {
        barcode: barcodeCount[0],
        count: barcodeCount[1]? barcodeCount[1]: 1
    };
});

let getCartItemBarcodes = (cartItems) => getSplitedCartItems(cartItems).map((item) => item.barcode);

let isBarcodesValid = (cartItems) => getCartItemBarcodes(cartItems).filter((item) => dbValidBarcodes().includes(item)).length === getCartItemBarcodes(cartItems).length;

let loadResultValid = (cartItems) => {
    if(isCartItemsEmpty(cartItems)) return "CartItems is Empty!";
    return isBarcodesValid(cartItems)? "valid": `Barcode is not Exists!`;
}

let isCartItemsValid = (cartItems) => {
    console.log(loadResultValid(cartItems));
};

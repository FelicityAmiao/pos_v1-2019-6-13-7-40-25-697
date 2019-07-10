'use strict';

//1
let dbValidBarcodes = () => loadAllItems().map((dbItem) => dbItem.barcode);

let isCartItemsEmpty = (cartItems) => !cartItems || cartItems.length === 0;

let getSplitedCartItems = (cartItems) => cartItems.map((cartItem) => {
    let barcodeCount = cartItem.split("-");
    return {
        barcode: barcodeCount[0],
        count: barcodeCount[1]? parseFloat(barcodeCount[1]): 1
    };
});

let getCartItemBarcodes = (cartItems) => getSplitedCartItems(cartItems).map((item) => item.barcode);

let isBarcodesValid = (cartItems) => getCartItemBarcodes(cartItems).filter((item) => dbValidBarcodes().includes(item)).length === getCartItemBarcodes(cartItems).length;

let loadResultValid = (cartItems) => {
    if(isCartItemsEmpty(cartItems)) return "CartItems is Empty!";
    return isBarcodesValid(cartItems)? "valid": `Barcode is not Exists!`;
}

let isCartItemsValid = (cartItems) => console.log(loadResultValid(cartItems));

//2
let getCounts = (cartItems) => {
    let countObj = {};
    getSplitedCartItems(cartItems).reduce((obj, curr) => {
        obj[curr.barcode]? obj[curr.barcode]+= curr.count: obj[curr.barcode] = curr.count;
        return obj;
    }, countObj);
    return countObj;
};

let addCountToBuyItemLists = (buyItemLists, countObjs) => {
    for(let key in countObjs) {
        buyItemLists.forEach((item) => {
            if(item.barcode === key) item.count = countObjs[key];
        });
    }
}

let getItemLists = (cartItems) => {
    if(!(loadResultValid(cartItems) === "valid")) console.log(loadResultValid(cartItems));
    let itemLists = loadAllItems().filter((item) => getCartItemBarcodes(cartItems).includes(item.barcode));
    let countObjs = getCounts(cartItems);
    addCountToBuyItemLists(itemLists, countObjs);
    console.log(itemLists);
}

//3
let getSumCostLists = (itemLists) => {
    console.log(itemLists.map((item) => {
        item.sum = item.price * item.count;
        return item;
    }));
}

//4
let getBuyTwoFreeOneBarcodes = () => loadPromotions().filter((item) => item.type === "BUY_TWO_GET_ONE_FREE")[0].barcodes;
let getPromotionLists = (sumCostLists) => {
    let buyTwoFreeOneBarcodes = getBuyTwoFreeOneBarcodes();
    console.log(sumCostLists.map((item) => {
        if(buyTwoFreeOneBarcodes.includes(item.barcode) && item.count >= 2) {
            item.promotionPrice = Math.floor(item.count / 2)*item.price;
        }else {
            item.promotionPrice = 0;
        }
        return item;
    }))
}
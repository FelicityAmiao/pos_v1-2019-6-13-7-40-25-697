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

let isCartItemsValid = (cartItems) => {
    let isCartItemsValidResult = loadResultValid(cartItems);
    console.log(isCartItemsValidResult);
    return isCartItemsValidResult;
};

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
    if(!(loadResultValid(cartItems) === "valid")) {
        let result = loadResultValid(cartItems);
        console.log(result);
        return result;
    }
    let itemLists = loadAllItems().filter((item) => getCartItemBarcodes(cartItems).includes(item.barcode));
    let countObjs = getCounts(cartItems);
    addCountToBuyItemLists(itemLists, countObjs);
    console.log(itemLists);
    return itemLists;
}

//3
let getSumCostLists = (itemLists) => {
    let sumCostLists = itemLists.map((item) => {
        item.sum = item.price * item.count;
        return item;
    });
    console.log(sumCostLists);
    return sumCostLists;
}

//4
let getBuyTwoFreeOneBarcodes = () => loadPromotions().filter((item) => item.type === "BUY_TWO_GET_ONE_FREE")[0].barcodes;
let getPromotionLists = (sumCostLists) => {
    let buyTwoFreeOneBarcodes = getBuyTwoFreeOneBarcodes();
    let promotionLists = sumCostLists.map((item) => {
        if(buyTwoFreeOneBarcodes.includes(item.barcode) && item.count >= 2) {
            item.promotionPrice = Math.floor(item.count / 2)*item.price;
        }else {
            item.promotionPrice = 0;
        }
        return item;
    });
    console.log(promotionLists);
    return promotionLists;
}

//5
let getReceiptCostItems = (itemLists) => {
    let receiptCostItems = getPromotionLists(getSumCostLists(itemLists));
    console.log(receiptCostItems);
    return receiptCostItems;
}

//6
let getTotalPrice = (receiptCostItems) => {
    let totalPrice = receiptCostItems.reduce((x, y, index) => (index > 1 && index < 4)? x + y.sum - y.promotionPrice: x.sum - x.promotionPrice + y.sum - y.promotionPrice);
    console.log(totalPrice);
    return totalPrice;
}

//7
let getTotalPromotion = (receiptCostItems) => {
    let totalPromotion = receiptCostItems.reduce((x, y, index) => (index > 1 && index < 4)? x + y.promotionPrice: x.promotionPrice + y.promotionPrice);
    console.log(totalPromotion);
    return totalPromotion;
}

//8
let getReceiptItems = (itemLists) => {
    let receiptItems = {
        receiptCostItems: getReceiptCostItems(itemLists),
        totalPrice: getTotalPrice(getReceiptCostItems(itemLists)),
        totalPromotion: getTotalPromotion(getReceiptCostItems(itemLists))
    }
    console.log(receiptItems);
    return receiptItems;
};

//9
let getReceipt = (receiptItems) => {
    let receipt = `***<没钱赚商店>收据***`;
    receiptItems.receiptCostItems.forEach((item) => receipt += `
名称：${item.name}，数量：${item.count}${item.unit}，单价：${(item.price).toFixed(2)}(元)，小计：${(item.sum-item.promotionPrice).toFixed(2)}(元)`);
    receipt +=`
----------------------
总计：${(receiptItems.totalPrice).toFixed(2)}(元)
节省：${(receiptItems.totalPromotion).toFixed(2)}(元)
**********************`;
    console.log(receipt);
    return receipt;
};

//10
let printReceipt = (cartItems) => getReceipt(getReceiptItems(getItemLists(cartItems)));
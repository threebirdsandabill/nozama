'use strict'

const store = require('../store')

const updateCartArray = function (itemId, itemQty, itemPrice, updateType) {
  const cartItems = store.user.cart
  console.log('itemid', itemId)
//  console.log('in here with cart items of', cartItems)

  const checkIfItemExists = function (itemId) {
    for (let i = 0; i < cartItems.length; i++) {
    //  console.log('value of itemId at loop is', cartItems[i].itemId._id)
    //  console.log('price of itemId at loop is', cartItems[i].itemId.price)
    //  console.log('cart items.length is', cartItems.length)
      if (cartItems[i].itemId._id === itemId) {
        return i
      }
    }
    return -1
  }
  const indexOfArray = checkIfItemExists(itemId)
  console.log('index of array is ', indexOfArray)
  if (indexOfArray === -1 || indexOfArray === undefined) {
    console.log('in the if')
    const newItem = {
      itemId: itemId,
      itemQty: itemQty,
      itemPrice: itemPrice
    }
    cartItems.push(newItem)
    // console.log('new cart', cartItems)
    return cartItems
  } else if (updateType === 'update') {
    cartItems[indexOfArray].itemQty = itemQty
    return cartItems
  } else if (updateType === 'add') {
    cartItems[indexOfArray].itemQty = parseInt(cartItems[indexOfArray].itemQty) + parseInt(itemQty)
    return cartItems
  }
}

const removeItem = function () {

}

const cartTotal = function () {
  let totalCost = 0
  let totalItems = 0
  const cartItems = store.user.cart
  for (let i = 0; i < cartItems.length; i++) {
  // console.log('logitems', cartItems[i].itemId.price)
    totalItems = totalItems + cartItems[i].itemId.itemQty
    totalCost = totalCost + cartItems[i].itemId.price
  }
  store.user.totalCost = totalCost.toFixed(2)
  store.user.totalItems = totalItems
  // console.log('user store total', store.user.totalCost)
}

module.exports = {
  updateCartArray,
  cartTotal,
  removeItem
}

'use strict'

const store = require('../store')

const updateCartArray = function (itemId, itemQty, itemPrice, updateType) {
  const cartItems = store.user.cart
  const checkIfItemExists = function (itemId) {
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].itemId._id === itemId) {
        return i
      }
    }
    return -1
  }
  const indexOfArray = checkIfItemExists(itemId)
  if (updateType === 'remove') {
    if (indexOfArray !== -1 && indexOfArray !== undefined) {
      cartItems.splice(indexOfArray, 1)
      return cartItems
    }
  } else {
    if (indexOfArray === -1 || indexOfArray === undefined) {
      const newItem = {
        itemId: itemId,
        itemQty: itemQty,
        itemPrice: itemPrice
      }
      cartItems.push(newItem)
      return cartItems
    } else if (updateType === 'update') {
      cartItems[indexOfArray].itemQty = parseInt(itemQty)
      return cartItems
    } else if (updateType === 'add') {
      cartItems[indexOfArray].itemQty = parseInt(cartItems[indexOfArray].itemQty) + parseInt(itemQty)
      return cartItems
//   if (indexOfArray === -1 || indexOfArray === undefined) {
//     const newItem = {
//       itemId: itemId,
//       itemQty: itemQty,
//       itemPrice: itemPrice
    }
  }
}

const removeItem = function () {

}

const cartTotal = function (data) {
  let totalCost = 0
  let totalItems = 0
  const cartItems = store.user.cart
  for (let i = 0; i < cartItems.length; i++) {
    totalItems = totalItems + cartItems[i].itemQty
    totalCost = totalCost + (cartItems[i].itemId.price * cartItems[i].itemQty)
//     totalItems = totalItems + cartItems[i].itemId.itemQty
//     totalCost = totalCost + cartItems[i].itemId.price
  }

  store.user.totalCost = totalCost.toFixed(2)
  store.user.totalItems = totalItems
  return data

}

module.exports = {
  updateCartArray,
  cartTotal,
  removeItem
}

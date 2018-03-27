'use strict'

const store = require('../store')

const updateCartArray = function (itemId, itemQty) {
  console.log('qty', itemQty)
  let cartItems = store.user.cart
  console.log('old cart items', cartItems)
  // update items
  // cartItems = [
  //   {
  //     itemId: '5ab9315c2acdda3b315668aa',
  //     quantity: 1
  //   },
  //   {
  //     itemId: '5ab9315c2acdda3b315668ab',
  //     quantity: 1
  //   }
  // ]
  const newItem = {
    itemId: itemId,
    itemQty: itemQty
  }
  cartItems.push(newItem)
  console.log('new cart', cartItems)
  return cartItems
}

module.exports = {
  updateCartArray
}

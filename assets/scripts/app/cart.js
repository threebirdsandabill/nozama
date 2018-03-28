'use strict'

const store = require('../store')

const updateCartArray = function (itemId, itemQty, updateType) {
  const cartItems = store.user.cart
  console.log('in here with cart items of', cartItems)

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
      itemQty: itemQty
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

const cartTotal = function () {
  let totalPrice = 0
  const cartItems = store.user.cart
  for (let i = 0; i < cartItems.length; i++) {
  // console.log('logitems', cartItems[i].itemId.price)

    totalPrice = totalPrice + cartItems[i].itemId.price
  }
  store.user.totalPrice = totalPrice
  console.log('user store total', store.user.totalPrice)
}

module.exports = {
  updateCartArray,
  cartTotal
}

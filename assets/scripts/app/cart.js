'use strict'

const store = require('../store')

const updateCartArray = function (itemId, itemQty, updateType) {
  let cartItems = store.user.cart
  console.log('in here with cart items of', cartItems)

  const checkIfItemExists = function (itemId) {
    for (let i = 0; i < cartItems.length; i++) {
      console.log('value of itemId at loop is', cartItems[i].itemId)
      console.log('cart items.length is', cartItems.length)
      if (cartItems[i].itemId === itemId) {
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
    console.log('new cart', cartItems)
    return cartItems
  } else if (updateType === 'update') {
    cartItems[indexOfArray].itemQty = itemQty
    return cartItems
  } else if (updateType === 'add') {
    cartItems[indexOfArray].itemQty = parseInt(cartItems[indexOfArray].itemQty) + parseInt(itemQty)
    return cartItems
  }
}

module.exports = {
  updateCartArray
}

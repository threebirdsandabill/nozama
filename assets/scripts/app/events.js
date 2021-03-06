
const api = require('./api')
const store = require('../store')
// const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')
const showCartTemplate = require('../templates/cart-populate.handlebars')
const cart = require('./cart')
const authApi = require('../auth/api')
let orderTotalAmount
// const

const onShowItems = function () {
//  event.preventDefault()
  api.getItems()
    .then(ui.getItemsSucces)
    .catch(ui.getItemsFailure)
}

const onAddToCart = (event) => {
  event.preventDefault()
  if (store.user !== undefined) {
    const itemId = $(event.target).data('btnitemid')
    const itemQty = $('#qty_' + itemId).val()
    const itemPrice = $('#price_' + itemId).val()
    // set actionType so that the ui function knows what kind of message to give
    const actionDescription = ' added'

    const data = {
      'user': {
        'cart': cart.updateCartArray(itemId, itemQty, itemPrice, 'add')
      }
    }
    //  const data = cart.updateCartArray(itemId, itemQty)
    api.updateCart(data)
      .then((data) => { ui.updateCartSuccess(data, actionDescription) })
      .then(onGetUserCart)
      .catch(ui.updateCartFailure)
    // api.updateCart()
    //   .then(ui.showAddToCart)
    //   .catch(ui.generalFailure)
  } else {
    $('#signInModal').modal('show')
  }
}

const onUpdateCartItemQty = (event) => {
  event.preventDefault()
  // set actionType so that the ui function knows what kind of message to give
  const actionDescription = 'updated'
  // get cart items

  const itemId = $(event.target).data('btnupdateitemid')
  const itemQty = $('#updateqty_' + itemId).val()
  const itemPrice = $('#price_' + itemId).val()
  const data = {
    'user': {
      'cart': cart.updateCartArray(itemId, itemQty, itemPrice, 'update')
    }
  }
  api.updateCart(data)
    .then((data) => { ui.updateCartSuccess(data, actionDescription) })
    .then(onGetUserCart)
    .catch(ui.updateCartFailure)
}

const onRemoveCartItem = (event) => {
  event.preventDefault()
  const actionDescription = 'remove'
  // get cart items
  const itemId = $(event.target).data('btnremoveitemid')
  const data = {
    'user': {
      'cart': cart.updateCartArray(itemId, 0, 0, 'remove')
    }
  }

  api.updateCart(data)
    .then((d) => {
    //  console.log('this is whats returned', d)
      return d
    })
    .then((data) => { ui.updateCartSuccess(data, actionDescription) })
    .then(onGetUserCart)
    .catch(ui.updateCartFailure)
}

const onCartClickOpen = function (event) { // this broke in Firefox because we didn't pass 'event' as a var.
  event.preventDefault()
  if (store.user !== undefined) {
    api.getUserCart()
      .then(cart.cartTotal)
      .then(ui.populateCart)
      .catch(ui.populateCartError)
  } else {
    $('#signInModal').modal('show')
  }
}

const onGetUserCart = () => {
  //  event.preventDefault()
  api.getUserCart()
    .then(cart.cartTotal)
    .then(ui.getUserCartSuccess)
    .catch(ui.getUserCartFailure)
}

const onGetTotal = () => {
  event.preventDefault()
  cart.cartTotal()
  $('#addToCartModal').modal('show')
  const showCartHtml = showCartTemplate({ items: store.user.cart })
  $('.cart-populate').html(showCartHtml)
}

const onPurchaseClick = function (event) {
  orderTotalAmount = store.user.totalCost
  event.preventDefault()
  handler.open({
    name: 'Stripe.com',
    description: 'Nozama Payments', // TODO change
    zipCode: true,
    amount: orderTotalAmount * 100 // have to multiply to get $$ not cents
  })
}

const getUserDetails = function () {
  authApi.getUser()
    .then(convertCartToOrder)
}

const emptycart = function () { // TODO this isn't working...
  let userData
  authApi.getUser()
    .then((d) => {
      userData = d
      userData.user.cart = [{}]
      const data = userData.user
      return data
    })
    .then(api.updateCart)
}

// const emptycart = function () { // TODO this isn't working...
//   let userData
//   authApi.getUser()
//     .then((d) => {
//       console.log('inside empty cart, data is not expecting empty array', d)
//       userData = d
//       // console.log('intiial value of userData is ', userData)
//       // userData.user.cart = []
//       // console.log('userData is now', userData)
//       // const data = userData.user
//       // console.log('data with userData.user', data)
//       const data = {
//         'user': {
//           'cart': [null]
//         }
//       }
//       console.log('in emptycart, data.user.cart is', data.user.cart)
//       return data
//     })
//     .then(api.updateCart)
//     // .then((prev) => console.log('previous is ', prev))
// }

const showAnEmptyCart = function () {
  api.getUserCart()
    .then(cart.cartTotal)
    .then(ui.getUserCartSuccess)
    .catch(ui.getUserCartFailure)
}

const convertCartToOrder = function (data) {
  let userData = {
    order: {
      orderDate: new Date(),
      items: [{}],
      orderTotal: 0
    }
  }
  let orderCost = 0
  for (let i = 0; i < data.user.cart.length; i++) {
    let itemsInstance = {
      itemId: data.user.cart[i].itemId,
      quantity: data.user.cart[i].itemQty,
      cost: data.user.cart[i].itemPrice * data.user.cart[i].itemQty
    }
    orderCost = orderCost + itemsInstance.cost
    userData.order.items.push(itemsInstance)
  }
  userData.order.orderTotal = orderCost
  api.makeOrder(userData)
    .then(ui.makeOrderSuccess)
    .then(showAnEmptyCart)
    // .then(cart.cartTotal)
    // .then(ui.populateCart)
    // .catch(ui.populateCartError)
    .catch(ui.convertCartToOrderFailure)
}

const handler = StripeCheckout.configure({
  key: 'pk_test_cfCdMlT05l4K7RWnQLigIuM0',
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function (token) {
    const data = {
      token: {
        token_id: token.id,
        amount: orderTotalAmount * 100 // TODO update to be equal to the total
      }
    }
    // const data = tokenInfo
    api.createCharge(data)
      .then(ui.paymentSuccessful)
      .catch(ui.paymentFailure)
      .then(getUserDetails)
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
  }
})

const displayOrderHistory = function () {
  $('#orderHistoryModal').modal('show')
  api.getPurchaseHistory()
    .then(ui.orderHistorySuccess)
    .then('ui order history success promise in events has fired')
    .catch(ui.orderHistoryFailure)
}

const addHandlers = () => {
  // $('body').on('click', '.btn-add-to-cart', onAddToCart)
  // $('.cart-icon').on('click', onCartClickOpen)
  $('body').on('click', '#checkout', onPurchaseClick) // TODO link this with handlebars template
  // $('#purchaseButton').on('click', onPurchaseClick)
  $('body').on('click', '.btn-add-to-cart', onAddToCart)
  $('.cart-icon').on('click', onCartClickOpen)
  $('.get-user').on('click', onGetUserCart)
  $('#carttotal').on('click', onGetTotal)
  $('body').on('click', '.btn-update-item', onUpdateCartItemQty)
  $('body').on('click', '.btn-remove-item', onRemoveCartItem)
  $('#orderHistory').on('click', displayOrderHistory)
  // add event for updating cart item
  // add event for removing cart item
}

module.exports = {
  addHandlers: addHandlers,
  // pageLoadEvents: pageLoadEvents,
  onShowItems,
  onAddToCart,
  onUpdateCartItemQty,
  onRemoveCartItem,
  onGetUserCart
}

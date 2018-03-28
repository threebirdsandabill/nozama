
const api = require('./api')
const store = require('../store')
// const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')
const showCartTemplate = require('../templates/cart-populate.handlebars')
const cart = require('./cart')
const authApi = require('../auth/api')
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
    // set actionType so that the ui function knows what kind of message to give
    const actionDescription = ' added'

    const data = {
      'user': {
        'cart': cart.updateCartArray(itemId, itemQty, 'add')
      }
    }
    //  const data = cart.updateCartArray(itemId, itemQty)
    console.log('cart data is in onAddToCart', data)
    api.updateCart(data)

      .then(ui.updateCartSuccess(data, actionDescription))
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
  const itemId = '' // get itemid
  const itemQty = '' // get qty

  const data = cart.updateCartArray(itemId, itemQty, 'update')
  console.log('cart data is onUpdateCartitemQty', data)

  api.updateCart(data)
    .then(ui.updateCartSuccess(data, actionDescription))
    .catch(ui.updateCartFailure)
}

const onRemoveCartItem = (event) => {
  event.preventDefault()
  const actionDescription = 'updated'
  // get cart items
  const itemId = '' // get itemid
  const itemQty = '' // get qty

  const data = cart.updateCartArray(itemId, itemQty)
  console.log('cart data is onRemoveItem', data)

  api.updateCart(data)
    .then(ui.updateCartSuccess(data, actionDescription))
    .catch(ui.updateCartFailure)
}

const onCartClickOpen = function () {
  $('#addToCartModal').modal('show')
  const showCartHtml = showCartTemplate({ items: store.user.cart })
  $('.cart-populate').html(showCartHtml)
}

const onPurchaseClick = function (event) {
  event.preventDefault()
  handler.open({
    name: 'Stripe.com',
    description: 'Nozama Payments', // TODO change
    zipCode: true,
    amount: 2000 // TODO dynamic amount
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
      // console.log('inside empty cart, data is not expecting empty array', d)
      userData = d
      // console.log('intiial value of userData is ', userData)
      userData.user.cart = [{}]
      console.log('userData is now', userData)
      const data = userData.user
      console.log('data with userData.user', data)
      return data
    })
    .then(api.updateCart)
    .then((prev) => console.log('previous is ', prev))
}

const convertCartToOrder = function (data) {
  let userData = {
    order: {
      orderDate: new Date(),
      items: [{}],
      orderTotal: 0
    }
  }
  console.log('in convertCartToOrder data is', data)
  let orderCost = 0
  console.log('in convertCartToOrder looking for amount', data.user.cart)
  for (let i = 0; i < data.user.cart.length; i++) {
    let itemsInstance = {
      itemId: data.user.cart[i].itemId,
      quantity: data.user.cart[i].itemQty,
      cost: 12 // TODO need to update this to be dynamic
    }
    orderCost = orderCost + itemsInstance.cost
    userData.order.items.push(itemsInstance)
  }
  userData.order.orderTotal = orderCost
  console.log('total cost of order', userData.order.orderTotal)
  api.makeOrder(userData)
    .then((d) => console.log('in promise for make order', d)) // TODO update to sucess message
    .then(emptycart)
    .catch(console.error)
}

const handler = StripeCheckout.configure({
  key: 'pk_test_cfCdMlT05l4K7RWnQLigIuM0',
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function (token) {
    const data = {
      token: {
        token_id: token.id,
        amount: 10000 // TODO update to be equal to the total
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

const addHandlers = () => {
  $('body').on('click', '.btn-add-to-cart', onAddToCart)
  $('.cart-icon').on('click', onCartClickOpen)
  // $('body').on('click', '#purchaseButton', onPurchaseClick) // TODO link this with handlebars template
  $('#purchaseButton').on('click', onPurchaseClick)
  // add event for updating cart item
  // add event for removing cart item
}

const pageLoadEvents = () => {
  ui.updateAuthLayout()
}

module.exports = {
  addHandlers: addHandlers,
  pageLoadEvents: pageLoadEvents,
  onShowItems,
  onAddToCart,
  onUpdateCartItemQty,
  onRemoveCartItem
}

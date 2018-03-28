
const api = require('./api')
const store = require('../store')
// const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')
const showCartTemplate = require('../templates/cart-populate.handlebars')
const orderHistoryTemplate = require('../templates/order-history.handlebars')
const cart = require('./cart')

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
      .then(onGetUserCart())
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

  const data = cart.updateCartArray(itemId, itemQty, 'update')
  console.log('cart data is onUpdateCartitemQty', data)

  api.updateCart(data)
    .then(ui.updateCartSuccess(data, actionDescription))
    .then(onCartClickOpen)
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
    .then(onGetUserCart())
    .catch(ui.updateCartFailure)
}

const onCartClickOpen = function () {
  event.preventDefault()
  if (store.user !== undefined) {
    api.getUserCart()
      .then(cart.cartTotal())
      .then(ui.populateCart)
      .catch(ui.populateCartError)
  } else {
    $('#signInModal').modal('show')
  }
}

const onGetUserCart = () => {
  event.preventDefault()
  //  console.log('userid for cart', store.user.id)
  api.getUserCart()
    .then(cart.cartTotal)
    .then(ui.getUserCartSuccess)
    .catch(ui.getUserCartFailure)
  //  console.log('total', store.user.totalCost)
}

const onGetTotal = () => {
  event.preventDefault()
  cart.cartTotal()
  $('#addToCartModal').modal('show')
  const showCartHtml = showCartTemplate({ items: store.user.cart })
  $('.cart-populate').html(showCartHtml)
}

const displayOrderHistory = function () {
  $('#orderHistoryModal').modal('show')
  const orderHistoryHtml = orderHistoryTemplate({ orders: store.user.orders }) // this part is basically dummy code!
  $('.history-populate').html(orderHistoryHtml)
}

const addHandlers = () => {
  $('body').on('click', '.btn-add-to-cart', onAddToCart)
  $('.cart-icon').on('click', onCartClickOpen)
  $('.get-user').on('click', onGetUserCart)
  $('#carttotal').on('click', onGetTotal)
  $('body').on('click', '.btn-update-item', onUpdateCartItemQty)
  $('#orderHistory').on('click', displayOrderHistory)
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
  onRemoveCartItem,
  onGetUserCart
}

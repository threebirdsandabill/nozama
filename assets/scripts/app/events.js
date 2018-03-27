
const api = require('./api')
const store = require('../store')
// const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')

const onShowItems = function () {
//  event.preventDefault()
  api.getItems()
    .then(ui.getItemsSucces)
    .catch(ui.getItemsFailure)
}

const onAddToCart = (event) => {
  event.preventDefault()
  if (store.user !== undefined) {
    // set actionType so that the ui function knows what kind of message to give
    const actionDescription = 'added'
    // get cart items
    let cartItems = store.user.cart
    // find the one we're updating
    // change the amount
    // set the data variable to contain user and cart items
    const data = {
      'user': {
        'cart': cartItems
      }
    }
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
  let cartItems = store.user.cart
  // find the one we're updating
  // change the amount
  // set the data variable to contain user and cart items
  const data = {
    'user': {
      'cart': cartItems
    }
  }
  api.updateCart(data)
    .then(ui.updateCartSuccess(data, actionDescription))
    .catch(ui.updateCartFailure)
}

const onRemoveCartItem = (event) => {
  event.preventDefault()

  // set actionType so that the ui function knows what kind of message to give
  const actionDescription = 'removed'
  // get cart items
  let cartItems = store.user.cart
  // find the one we're updating
  // change the amount
  // set the data variable to contain user and cart items
  const data = {
    'user': {
      'cart': cartItems
    }
  }
  api.updateCart(data)
    .then(ui.updateCartSuccess(data, actionDescription))
    .catch(ui.updateCartFailure)
}

const addHandlers = () => {
  $('body').on('click', '.btn-add-to-cart', onAddToCart)
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

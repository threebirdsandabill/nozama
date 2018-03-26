
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
  console.log('got here')
  if (store.user !== undefined) {
    api.addToCart($(event.target).data('itemid'))
      .then(ui.showAddToCart)
      .catch(ui.generalFailure)
  } else {
    $('#signInModal').modal('show')
  }
}

const addHandlers = () => {
  $('body').on('click', '.btn-add-to-cart', onAddToCart)
}

const pageLoadEvents = () => {
  ui.updateAuthLayout()
}

module.exports = {
  addHandlers: addHandlers,
  pageLoadEvents: pageLoadEvents,
  onShowItems,
  onAddToCart
}

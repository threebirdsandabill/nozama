
const api = require('./api')
// const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')

const onShowItems = function () {
//  event.preventDefault()
  api.getItems()
    .then(ui.getItemsSucces)
    .catch(ui.getItemsFailure)
}

const addHandlers = () => {
}

const pageLoadEvents = () => {
  ui.updateAuthLayout()
}

module.exports = {
  addHandlers: addHandlers,
  pageLoadEvents: pageLoadEvents,
  onShowItems
}

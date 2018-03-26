'use strict'
const ui = require('./ui.js')
const api = require('./api.js')
const getFormFields = require('../../../lib/get-form-fields.js')

const onShowSignUpModal = function () {
  $('#signUpModal').modal('show')
}

const onSignUp = function (event) { // TODO I want to make it so that it automatically signs in. I will look into it tonight
  event.preventDefault()
  const data = getFormFields(this)
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const addHandlers = () => {
  $('#signUp').on('click', onShowSignUpModal)
  $('#signUpForm').on('submit', onSignUp)
}

module.exports = {
  addHandlers
}

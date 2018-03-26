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

const onShowSignInModal = function () {
  $('#signInModal').modal('show')
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onShowChangePasswordModal = function () {
  $('#changePasswordModal').modal('show')
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.changePassword(data)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}

const addHandlers = () => {
  $('#signUp').on('click', onShowSignUpModal)
  $('#signUpForm').on('submit', onSignUp)
  $('#signIn').on('click', onShowSignInModal)
  $('#signInForm').on('submit', onSignIn)
  $('#changePassword').on('click', onShowChangePasswordModal)
  $('#changePasswordForm').on('submit', onChangePassword)
}

module.exports = {
  addHandlers
}

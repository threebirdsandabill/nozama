'use strict'

const store = require('../store')
// require('../../../node_modules/jquery-toast-plugin/src/jquery.toast.js')
require('jquery-toast-plugin')
// require('../../../node_modules/jquery-toast-plugin/src/jquery.toast.css')

const onSignInSuccess = function (data) {
  $.toast({
    text: "You're now logged in!",
    heading: 'Welcome to Nozama',
    icon: 'success',
    showHideTransition: 'plain',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'top-right',
    textAlign: 'left',
    loader: true,
    loaderBg: '#9EC600'
  })
  $('#signInModal').modal('hide')

  $('#signInForm').each(function () {
    this.reset()
  })
  store.user = data.user

  $('.change-password').css('display', 'block')
  $('.sign-in').css('display', 'none')
  $('.sign-up').css('display', 'none')
  $('.sign-out').css('display', 'block')
}

const onSignInFailure = function () {
  $.toast({
    text: 'Sorry, there was a problem signing in. Please check your creds',
    heading: 'Error',
    icon: 'error',
    showHideTransition: 'plain',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'top-right',
    textAlign: 'left',
    loader: true,
    loaderBg: '#9EC600'
  })
}

const onSignOutSuccess = function () {
  $.toast({
    text: "You're now logged out!",
    heading: 'See you next time',
    icon: 'success',
    showHideTransition: 'plain',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'top-right',
    textAlign: 'left',
    loader: true,
    loaderBg: '#9EC600'
  })
  $('.change-password').css('display', 'none')
  $('.sign-in').css('display', 'block')
  $('.sign-up').css('display', 'block')
  $('.sign-out').css('display', 'none')
}

const onSignUpSuccess = function () {
  $.toast({
    text: 'Please sign in now!',
    heading: 'Thanks for signing up',
    icon: 'success',
    showHideTransition: 'plain',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'top-right',
    textAlign: 'left',
    loader: true,
    loaderBg: '#9EC600'
  })
  $('#signUpModal').modal('hide')

  $('#signUpForm').each(function () {
    this.reset()
  })
}

const onSignUpFailure = function () {
  $.toast({
    text: 'Sorry, there was a problem signing up',
    heading: 'Error',
    icon: 'error',
    showHideTransition: 'plain',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'top-right',
    textAlign: 'left',
    loader: true,
    loaderBg: '#9EC600'
  })
}

const onToSignIn = function () {
  $('.sign-in-form').toggle()
  $('.sign-up-form').toggle()
  $('.sign-in-error').css('display', 'none')
  $('#signUpForm').each(function () {
    this.reset()
  })
}

const onChangePasswordSuccess = function () {
  $('#changePasswordModal').modal('hide')
  $.toast({
    text: "Don't forget it now!",
    heading: 'Password changed successfully!',
    icon: 'success',
    showHideTransition: 'plain',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'top-right',
    textAlign: 'left',
    loader: true,
    loaderBg: '#9EC600'
  })
  $('#changePasswordForm').each(function () {
    this.reset()
  })
}

const onChangePasswordFailure = function () {
  $.toast({
    text: 'Sorry, there was a problem changing your password',
    heading: 'Error',
    icon: 'error',
    showHideTransition: 'plain',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'top-right',
    textAlign: 'left',
    loader: true,
    loaderBg: '#9EC600'
  })
}

module.exports = {
  onSignInSuccess,
  onSignUpSuccess,
  onToSignIn,
  onSignInFailure,
  onSignUpFailure,
  onSignOutSuccess,
  onChangePasswordSuccess,
  onChangePasswordFailure
}

'use strict'

const store = require('../store')
// require('../../../node_modules/jquery-toast-plugin/src/jquery.toast.js')
require('jquery-toast-plugin')
// require('../../../node_modules/jquery-toast-plugin/src/jquery.toast.css')

const onSignInSuccess = function (data) {
  $('#signInForm').toggle()
  $('.sign-in-error').css('display', 'none')
  $('.navbar').toggle()
  $('.main-section').toggle()
  $.toast({
    text: "You're now logged in!",
    heading: 'Welcome to Crew',
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

  $('#signInForm').each(function () {
    this.reset()
  })
  store.user = data.user
}

const onSignInFailure = function () {
  $('.sign-in-error').css('display', 'block')
}

const onSignOutSuccess = function () {
  $('#signInForm').toggle() // this to ffs
  $('.navbar').toggle()
  $('.main-section').toggle()
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
}

const onToSignUp = function () {
  $('.sign-in-form').toggle()
  $('.sign-up-form').toggle()
  $('.sign-up-error').css('display', 'none')
  $('#signInForm').each(function () {
    this.reset()
  })
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

  $('.signUpForm').each(function () {
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
  $('#editUserSettings').modal('hide')
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
}

const onChangePasswordFailure = function () {
  $('.change-password-error').css('display', 'block')
}

module.exports = {
  onSignInSuccess,
  onSignUpSuccess,
  onToSignIn,
  onToSignUp,
  onSignInFailure,
  onSignUpFailure,
  onSignOutSuccess,
  onChangePasswordSuccess,
  onChangePasswordFailure
}

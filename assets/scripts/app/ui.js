'use strict'

const showItemGrid = require('../templates/product-grid.handlebars')

const getItemsSucces = (data) => {
  console.log('data is', data)
  $('#store-items').html(showItemGrid({ items: data.items }))
}

const paymentSuccessful = function (data) {
  $('#addToCartModal').modal('hide')
  $.toast({
    text: 'Payment recieved! Order Placed',
    heading: 'Payment successful',
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

const paymentFailure = function (data) {
  $.toast({
    text: 'There was a problem processing this payment. Please try again',
    heading: 'Error with payment',
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

const updateCartSuccess = function (data, actionDescription) {
  $.toast({
    text: 'Item ' + actionDescription,
    heading: 'Cart updated',
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

module.exports = {
  getItemsSucces,
  updateCartSuccess,
  paymentSuccessful,
  paymentFailure
}

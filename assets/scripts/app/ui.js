'use strict'

const showItemGrid = require('../templates/product-grid.handlebars')
const showCartTemplate = require('../templates/cart-populate.handlebars')
const store = require('../store')

const getItemsSucces = (data) => {
  console.log('data is', data)
  $('#store-items').html(showItemGrid({ items: data.items }))
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

const onUserCartClick = function () {
  $('#addToCartModal').modal('show')
  const showCartHtml = showCartTemplate({ items: store.user.cart })
  $('.cart-populate').html(showCartHtml)
}

module.exports = {
  getItemsSucces,
  updateCartSuccess,
  onUserCartClick
}

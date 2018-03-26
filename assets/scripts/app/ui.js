'use strict'

const showItemGrid = require('../templates/product-grid.handlebars')

const getItemsSucces = (data) => {
  console.log('data is', data)
  $('#store-items').html(showItemGrid({ items: data.items }))
}

module.exports = {
  getItemsSucces
}

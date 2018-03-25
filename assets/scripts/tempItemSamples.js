'use strict'

const sampleItems = require('./sampleset')
const showSamples = require('./templates/product-grid.handlebars')

const tempItems = function () {
  const showSamplesHtml = showSamples({ items: sampleItems.sampleItems.items })
  console.log('items: ', sampleItems.sampleItems.items)
  $('#store-items').html(showSamplesHtml)
}

module.exports = {
  tempItems
}

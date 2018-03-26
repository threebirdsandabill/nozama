'use strict'
const config = require('../config')
// const store = require('../store')

const getItems = function (data) {
  // console.log('token is', store.user.token)
  // console.log('url ', config.apiUrl)
  return $.ajax({
    url: config.apiUrl + '/items',
    method: 'GET',
    headers: {
      contentType: 'application/json'
    }
  })
}

module.exports = {
  getItems
}

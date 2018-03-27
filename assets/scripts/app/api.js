'use strict'
const config = require('../config')
const store = require('../store')

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

const updateCart = function (data) {
  return $.ajax({
    url: config.apiUrl + '/users/' + data.id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  getItems,
  updateCart
}

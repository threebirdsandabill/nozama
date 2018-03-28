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
  console.log('in update Cart with', data)
  return $.ajax({
    url: config.apiUrl + '/users/' + store.user.id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const createCharge = function (data) {
  return $.ajax({
    url: config.apiUrl + '/tokens',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const makeOrder = function (data) {
  return $.ajax({
    url: config.apiUrl + '/orders',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  getItems,
  updateCart,
  createCharge,
  makeOrder
}

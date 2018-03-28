'use strict'
const config = require('../config')
const store = require('../store')

const getItems = function (data) {
  return $.ajax({
    url: config.apiUrl + '/items',
    method: 'GET',
    headers: {
      contentType: 'application/json'
    }
  })
}
const getUserCart = function () {
  return $.ajax({
    url: config.apiUrl + '/users/' + store.user.id,
    method: 'GET',
    headers: {
      contentType: 'application/json',
      authorization: 'Token token=' + store.user.token
    }
  })
}

const updateCart = function (data) {
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

const getPurchaseHistory = function () {
  return $.ajax({
    url: config.apiUrl + '/orders/',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getItems,
  updateCart,
  createCharge,
  makeOrder,
  getUserCart,
  getPurchaseHistory
}

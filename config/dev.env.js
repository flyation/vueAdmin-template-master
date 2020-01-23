'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  // BASE_API: '"https://www.easy-mock.com/mock/5e21b704ac7afb37330064db"',
  BASE_API: '"http://localhost:8080"',
  // BASE_API: '"http://192.168.1.20:8080"',
})

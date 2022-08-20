const authResolver = require('./auth')
const productResolver = require('./product')
const orderResolver = require('./order')


const rootResolver = {
  ...authResolver,
  ...productResolver,
  ...orderResolver
}

module.exports = rootResolver
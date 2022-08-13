const authResolver = require('./auth')
const productResolver = require('./product')


const rootResolver = {
  ...authResolver,
  ...productResolver
}

module.exports = rootResolver
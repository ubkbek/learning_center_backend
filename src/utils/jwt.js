const { sign } = require('jsonwebtoken')

module.exports = payload => sign(payload, process.env.SECRET_KEY)
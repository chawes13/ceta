const signature = require('./signature')
const { HttpError } = require('./utils')
const { NODE_ENV } = process.env 

const isVerified = (req, res, next) => {
  if (signature.isVerified(req) || NODE_ENV === 'development') {
    next()
  } else {
    next(new HttpError(401, 'Not Authorized'))
  }
}

module.exports = {
  isVerified
}

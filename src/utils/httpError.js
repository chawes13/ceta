
const error = class HttpError extends Error {
  constructor(status, statusText, response) {
    super()
    this.name = 'HttpError'
    this.status = status
    this.statusText = statusText
    this.response = response
    this.message = `${status} - ${statusText}`
  }
}

module.exports = error

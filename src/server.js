const express = require('express')
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const path = require('path')

const PORT = process.env.PORT || 8080
const app = express()
module.exports = app

if (process.env.NODE_ENV === 'development') require('../secrets')

/*
 * Parse application/x-www-form-urlencoded && application/json
 * Use body-parser's `verify` callback to export a parsed raw body
 * that you need to use to verify the signature
 */

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8')
  }
}

// Configure Middleware
app.use(bodyParser.urlencoded({verify: rawBodyBuffer, extended: true }))
app.use(bodyParser.json({ verify: rawBodyBuffer }))
app.use(volleyball)

app.use('/api', require('./api'))

// Serve the landing page for all requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

// Error Handling
app.use((error, req, res) => {
  // eslint-disable-next-line
  console.error(error)
  res.status(error.status || 500).send(error.message || 'Internal server error')
})

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Keep calm and deploy on ${PORT}`)
})

const express = require('express')
const compress = require('compress')
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
module.exports = app

const {
  PORT = 8080,
  NODE_ENV = 'development'
} = process.env

if (NODE_ENV === 'development') require('../secrets')

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

// Enable gzip compression in production
if (NODE_ENV === 'production') app.use(compress())

app.use('/api', require('./api'))

// Serve the landing page for all requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

// Error Handling
app.use((error, req, res) => {
  console.error(error)
  res.status(error.status || 500).send(error.message || 'Internal server error')
})

app.listen(PORT, () => {
  console.log(`Keep calm and deploy on ${PORT}`)
})

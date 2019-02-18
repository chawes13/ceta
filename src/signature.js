const crypto = require('crypto')
const { SLACK_SIGNING_SECRET } = process.env

/**
 * Verification rules implemented via https://api.slack.com/docs/verifying-requests-from-slack
 * with reference to https://github.com/slackapi/template-slash-command-and-dialogs
*/
function isVerified (req) {
  const signature = req.headers['x-slack-signature']
  const timestamp = req.headers['x-slack-request-timestamp']
  const hmac = crypto.createHmac('sha256', SLACK_SIGNING_SECRET)
  const [version, hash] = signature.split('=')
  
  hmac.update(`${version}:${timestamp}:${req.rawBody}`)
  return hmac.digest('hex') === hash
}

module.exports = { isVerified }

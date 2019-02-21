const router = require('express').Router()
const signature = require('./signature')
const parser = require('./parser')
const trains = require('./trains')
const formatter = require('./formatter')

module.exports = router

/**
 * Returns estimated train times
 * 1. Verifies signature
 * 2. Parses text to break out a user's commands
 * 3. Queries the CTA L Stop API to find the station/stop identifier to use
 * 4. Queries the CTA Train Tracker API to find the train times
 * 5. Formats response to meet message syntax
 * 6. Sends formatted message to slack channel
 */
router.post('/command', async (req, res, next) => {
  try {
    // Reject the request if it is not sent from an authorized Slack workspace
    if (!signature.isVerified(req)) return res.sendStatus(401)
    
    const { text: userInput } = req.body
    
    // Parse the commands based on an agreed structure
    const commands = parser.parseCommand(userInput)
    
    // Validate that a station / stop can be located by the CTA "L" Stop API
    const ids = await trains.getUniqueIdentifier(commands)
    
    // Fetch the times available and filter based on train line (if provided)
    const times = await trains.calculateArrivals(commands, ids)
    
    // Format the message according to the JSON specs provided by the Slack API
    const formattedMsg = formatter.createMessage(userInput, times)
    
    res.json(formattedMsg)
  } catch (e) {
    next(e)
  }
})

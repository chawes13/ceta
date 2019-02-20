const router = require('express').Router()
// const signature = require('./signature')
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
    // if (!signature.isVerified(req)) return res.sendStatus(401)
    
    const { text: userInput } = req.body
    const commands = parser.parseCommand(userInput)
    const ids = await trains.getUniqueIdentifier(commands)
    
    // Respond with a 200 to the Slack app acknowledging receipt of an appropriately formatted command
    // res.sendStatus(200) -- this only needs to be enabled if the CTA APIs are too slow
    
    const times = await trains.calculateArrivals(commands, ids)
    const formattedMsg = formatter.createSlackMessage(userInput, times)
    
    res.json(formattedMsg)
  } catch (e) {
    next(e)
  }
})

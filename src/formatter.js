// Slack message formatting goes here -- refer to ./example-message.json

const { groupBy, flatten, map, mapValues } = require('lodash')
const { set } = require('lodash/fp')
const { format } = require('date-fns')
const { getTrainLineEmoji, trainLines } = require('./config')

const baseMsg = {
  response_type: 'ephemeral',
  text: 'C(E)TA Arrival Estimates',
}

/**
 * 1. Group by line
 * 2. Group by stop
 * 3. Format message
 */
function createSlackMessage (userInput, response) {
  const timesByLine = groupBy(response, 'rt')
  const timesByLineAndDest = mapValues(timesByLine, (vals) => groupBy(vals, 'destNm'))
  
  const header = createSection('C(E)TA Arrival Estimates for: ' + userInput)
  const formattedTimes = map(timesByLineAndDest, (dests, line) => {
    const emoji = getTrainLineEmoji(line)
    const sectionHeader = createSection(`${emoji} *${trainLines[line.toUpperCase()]} Line* ${emoji}`)
    const fields = map(dests, (trains, dest) => {
      return `*${dest}* \n ${trains.map(train => train.timeToArrival).join('\n ')}`
    })
    
    return [
      sectionHeader,
      createSection(fields),
      createDivider(),
    ]
  })
  
  const blocks = [
    header,
    createDivider(),
    ...flatten(formattedTimes),
    createContext(':stopwatch: Estimates generated at ' + format(Date.now(), 'hh:mm:ss'))
  ]
  
  return set('blocks', blocks, baseMsg)
}

// ----- PRIVATE -----

function createSection (textInput, type="mrkdwn") {
  if (Array.isArray(textInput)) return {
    type: 'section',
    fields: textInput.map(text => {
      return {
        type,
        text,
      }
    })
  }
  
  return {
    type: 'section',
    text: {
      type,
      text: textInput,
    }
  }
}

function createDivider () {
  return { type: 'divider' }
}

function createContext (text, type="mrkdwn") {
  return {
    type: 'context',
    elements: [
      {
        type,
        text,
      }
    ]
  }
}

module.exports = { createSlackMessage }

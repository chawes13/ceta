// Slack message formatting goes here -- refer to ./example-message.json

const { groupBy, flatten, map, uniqBy } = require('lodash')
const { set } = require('lodash/fp')
const { format } = require('date-fns')
const { getTrainLineEmoji, ctaTrainTrackerApi } = require('./config')

const baseMsg = {
  response_type: 'ephemeral',
  text: 'C(E)TA Arrival Estimates',
}

/**
 * 1. Group by stop
 * 2. Format message according to Slack's Block Kit API
 */
function createMessage (userInput, response) {
  const trainsByStop = groupBy(response, 'stpId')
  
  const header = createSection('Arrival Estimates for: ' + '"*' + userInput + '*"')
  const formattedTimes = map(trainsByStop, (trains) => {
    const rtEmojis = uniqBy(trains, 'rt').map(train => getTrainLineEmoji(train.rt))
    
    const sectionHeader = createSection(`${rtEmojis.join('/')} *${trains[0].stpDe}*`)
    const fields = trains.map(train => {
      return `${train.timeToArrival} (${ctaTrainTrackerApi.trainLines[train.rt.toUpperCase()]})`
    }).join('\n')
    
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

/*
 * Slack expects a 200 response so format errors accordingly to inform the user
 * what went wrong
 */
function createErrorMessage (error) {
  return {
    ...baseMsg,
    text: 'Error',
    blocks: [ createSection(`:no_entry: ${error.toString() || 'Internal server error'}`) ]
  }
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

module.exports = {
  createMessage,
  createErrorMessage,
}

const axios = require('axios')
const { differenceInMinutes } = require('date-fns')
const { groupBy } = require('lodash')
const { compose, set } = require('lodash/fp')
const { setIf, HttpError } = require('./utils')
const { trainLineCodes } = require('./config')

const {
  CTA_TRAIN_TRACKER_API_URL,
  CTA_TRAIN_TRACKER_API_KEY,
  CTA_TRAIN_STOP_API_URL,
  CTA_TRAIN_STOP_API_TOKEN,
} = process.env

// Returns with a mapid (station) or a stpid (platform), depending on how specific the user's request was
async function getUniqueIdentifier (commands) {
  const { data: stops } = await findStops(commands)
  if (!stops || stops.length === 0) throw new HttpError(400, 'Station not found')
  
  const stopsByStation = groupBy(stops, 'map_id')
  if (Object.keys(stopsByStation).length > 1) throw new HttpError(400, 'Found multiple stations matching criteria')
  
  // If multiple stops / platforms are returned, then only provide the Station Id
  if (stops.length > 1) return { mapid: stops[0].map_id }
  
  return { stpid: stops[0].stop_id }
}

// Returns calculated arrival times, organized by stop
async function calculateArrivals (commands, ids) {
  const { data: trainTackerResults } = await getTrainTimes(commands, ids)
  const times = trainTackerResults.ctatt.eta
  if (!times || times.length === 0) throw new HttpError(500, 'Could not retrieve latest arrival information')
  
  const mappedTimes = times.map(time => {
    if (Number(time.isApp)) return set('timeToArrival', 'DUE', time)
    
    const timeToArrival = differenceInMinutes(time.arrT, time.prdt) + ' minutes'
    return set('timeToArrival', timeToArrival, time)
  })
  
  return mappedTimes
}

// ----- PRIVATE -----

function findStops ({ station, line='', direction='' }) {
  const params = compose(
    set('$where', `UPPER(station_descriptive_name) like '%${station}%%${line}%'`),
    setIf(trainLineCodes[line], trainLineCodes[line], true),
    setIf(!!direction, 'direction_id', direction)
  )({})
  
  return axios.get(CTA_TRAIN_STOP_API_URL, {
    params,
    headers: {
      'x-app-token': CTA_TRAIN_STOP_API_TOKEN
    }
  })
}

function getTrainTimes (commands, ids) {
  const trainLineCode = trainLineCodes[commands.line]
  const params = setIf(trainLineCode, 'rt', trainLineCode)({
    key: CTA_TRAIN_TRACKER_API_KEY,
    outputType: 'JSON',
    ...ids,
  })
  
  // return times.ctatt.eta
  return axios.get(CTA_TRAIN_TRACKER_API_URL, { params })
}

module.exports = {
  calculateArrivals,
  getUniqueIdentifier,
}

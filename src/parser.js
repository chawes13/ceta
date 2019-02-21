
/**
 * Expected format: station // line // direction (N, S)
 * This will allow a user to specify a specific line at stations like Chicago, 
 * which matches 3 separate physical stations (e.g., Chicago (Brown, Purple), 
 * Chicago (Blue), Chicago (Red)).
 * 
 * Example: chicago brown // brown // N
 */
function parseCommand (command) {
  if (!command) throw new Error('Must at least specify a station')
  
  const [station, line, direction] = command.toUpperCase().split('//').map(trim)
  
  return {
    station: station.split(' '), // Allow for multiple keywords (e.g., chicago brown)
    line,
    direction: trimDirection(direction) // CTA API only takes 1 letter arguments
  }
}

// ----- PRIVATE -----

function trim (str='') {
  return str.trim()
}

// If a user has specified the fully qualified direction (e.g., NORTH) return "N"
function trimDirection (direction) {
  if (!direction) return
  if (direction.length === 1) return direction
  
  return direction.slice(0, 1)
}

module.exports = { parseCommand }

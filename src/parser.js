
// Expected format: station line direction (N, S)
function parseCommand (command) {
  if (!command) throw new Error('Must at least specify a station')
  
  const [station, line, direction] = command.toUpperCase().split(' ')
  
  return {
    station,
    line,
    direction: trimDirection(direction)
  }
}

// ----- PRIVATE -----

// If a user has specified the fully qualified direction (e.g., NORTH) return "N"
function trimDirection (direction) {
  if (!direction) return
  if (direction.length === 1) return direction
  
  return direction.slice(0, 1)
}

module.exports = { parseCommand }

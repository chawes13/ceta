const { parseCommand } = require('../src/parser')

describe('Parses slack command correctly', () => {
  test('Returns an error if no command is provided', () => {
    expect(parseCommand).toThrowError
  })
  
  test('Parses command into three separate entries', () => {
    const command = "chicago brown // purple // north"
    const parsed = parseCommand(command)
    expect(parsed).toHaveProperty('station')
    expect(parsed).toHaveProperty('line')
    expect(parsed).toHaveProperty('direction')
  })
  
  test('Parses the first command into an array of uppercase keywords for the station', () => {
    const command = "chicago brown // purple // north"
    expect(parseCommand(command)).toHaveProperty('station', ['CHICAGO', 'BROWN'])
  })
  
  test('Parses the second command into an uppercase string for the line', () => {
    const command = "chicago brown // purple // north"
    expect(parseCommand(command).line).toBe('PURPLE')
  })
  
  test('Parses the third command into an uppercase string for the direction', () => {
    const command = "chicago brown // purple // n"
    expect(parseCommand(command).direction).toBe('N')
  })
  
  test('Only accepts the first letter of the third command', () => {
    const command = "chicago brown // purple // north"
    expect(parseCommand(command).direction).toBe('N')
  })
  
  test('Trims additional spaces provided in commands', () => {
    const command = "   chicago   br    // purple     //     N"
    const parsed = parseCommand(command)
    expect(parsed.line).toBe('PURPLE')
    expect(parsed.direction).toBe('N')
    expect(parsed.station[0]).toBe('CHICAGO')
    expect(parsed.station[1]).toBe('BR')
  })
})

const { createMessage, createErrorMessage } = require('../src/formatter')
const exampleResponse = require('../fixtures/example-response.json')

describe('Formats messages correctly for Slack', () => {
  describe('Create Message', () => {
    test('Creates an ephemeral message', () => {
      const userInput = "chicago br // purple // n"
      const response = {}
      const message = createMessage(userInput, response)
      expect(message.response_type).toBe('ephemeral')
    })
    
    test('Includes a header with the user\'s original input', () => {
      const userInput = "chicago br // purple // n"
      const response = {}
      const message = createMessage(userInput, response)
      expect(message.blocks[0].text.text).toContain(userInput)
    })
    
    test('Creates a message matching Slack\'s Block API kit syntax', () => {
      const userInput = "fullerton // red"
      const response = exampleResponse
      
      const realDateNow = Date.now
      global.Date.now = jest.fn(() => new Date('March 4, 2019 03:24:13'))
      
      const message = createMessage(userInput, response)
      expect(message).toMatchSnapshot('slack-block-api')
      
      // restore mock
      global.Date.now = realDateNow
    })
    
    test('Provides the time that the estimates were generated', () => {
      const userInput = "chicago br // purple // n"
      const response = {}
      
      const realDateNow = Date.now
      global.Date.now = jest.fn(() => new Date('March 4, 2019 03:24:13'))
      
      const message = createMessage(userInput, response)
      expect(message.blocks[message.blocks.length - 1].elements[0].text).toContain('03:24:13')
      
      // restore mock
      global.Date.now = realDateNow
    })
  })
  
  describe('Create Error Message', () => {
    test('Creates an ephemeral message', () => {
      const error = new Error('uh oh')
      const message = createErrorMessage(error)
      expect(message.response_type).toBe('ephemeral')
    })
    
    test('Creates an error message with the error name and message', () => {
      const error = new Error('uh oh')
      const message = createErrorMessage(error)
      expect(message).toHaveProperty('blocks')
      expect(message.blocks[0].text.text).toContain('Error: uh oh')
    })
  })
})

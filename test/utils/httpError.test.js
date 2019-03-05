const { HttpError } = require('../../src/utils')

describe('HTTP Error Class works correctly', () => {
  test('Extends an error', () => {
    const httpError = new HttpError(401, 'Not Authorized')
    expect(httpError).toBeInstanceOf(Error)
  })
  
  test('Prints out a formatted message with status and status text', () => {
    const httpError = new HttpError(401, 'Not Authorized')
    expect(httpError.toString()).toBe('HttpError: 401 - Not Authorized')
  })
})

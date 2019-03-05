const { setIf } = require('../../src/utils')

describe('Set If util works correctly', () => {
  test('Adds a property at the specified path when the condition is true', () => {
    const result = setIf(true, 'test', 'pass', {})
    expect(result).toHaveProperty('test', 'pass')
  })
  
  test('Does not add a property when the condition is false', () => {
    const result = setIf(false, 'test', 'fail', {})
    expect(result).not.toHaveProperty('test')
  })
  
  test('Does not mutate the original object when the condition is true', () => {
    const obj = {}
    const result = setIf(true, 'test', 'pass', obj)
    expect(obj).not.toBe(result)
  })
})

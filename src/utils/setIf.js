/**
 * @name setIf
 * @param {Boolean} condition - True if the path should be set
 * @param {String} path - The key on the object to set
 * @param {Any} value - The value to set at the specified path
 * @param {Object} obj - The object to set
 * @returns {Object|Function} - Returns an object with the path set to the
 * provided value when the condition is met. If the arity of the function is not
 * met, then it will return a curried function that accepts the remaining
 * arguments (useful for composing).
 */

const { curry } = require('lodash')
const { set } = require('lodash/fp')

// Returns a function that will set value at specified path if the condition is met
function setIf(condition, path, value, obj) {
  if (!condition) return obj
  return set(path, value, obj)
}

module.exports = curry(setIf, 4)

// Constants go here

const trainLineCodes = {
  BLUE: 'blue',
  BROWN: 'brn',
  ORANGE: 'o',
  PINK: 'pnk',
  PURPLE: 'p',
  RED: 'red',
}

const trainLines = {
  BLUE: 'Blue',
  BRN: 'Brown',
  O: 'Orange',
  PNK: 'Pink',
  P: 'Purple',
  RED: 'Red',
}

const trainLineEmojis = {
  BLUE: ':large_blue_diamond:',
  BRN: ':bear:',
  O: ':tangerine:',
  PNK: ':cherry_blossom:',
  P: ':imp:',
  RED: ':red_circle:',
}

const getTrainLineEmoji = (line) => trainLineEmojis[line.toUpperCase()] || ''

module.exports = {
  trainLineCodes,
  getTrainLineEmoji,
  trainLines,
}

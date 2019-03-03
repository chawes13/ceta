// Constants go here

const chicagoDataPortalApi = {
  trainLineCodes: {
    RED: 'red',
    BLUE: 'blue',
    GREEN: 'g',
    BROWN: 'brn',
    PURPLE: 'p',
    ORANGE: 'o',
    PINK: 'pnk',
    YELLOW: 'y',
  }
}

const ctaTrainTrackerApi = {
  trainLineCodes: {
    RED: 'Red',
    BLUE: 'Blue',
    BROWN: 'Brn',
    GREEN: 'G',
    ORANGE: 'Org',
    PURPLE: 'P',
    PINK: 'Pink',
    YELLOW: 'Y',
  },
  trainLines: {
    RED: 'Red',
    BLUE: 'Blue',
    BRN: 'Brown',
    G: 'Green',
    ORG: 'Orange',
    P: 'Purple',
    PINK: 'Pink',
    Y: 'Yellow',
  },
  trainLineEmojis: {
    RED: ':red_circle:',
    BLUE: ':large_blue_diamond:',
    BRN: ':bear:',
    G: ':green_apple:',
    ORG: ':tangerine:',
    P: ':imp:',
    PINK: ':cherry_blossom:',
    Y: ':baby_chick:',
  }
}

const getTrainLineEmoji = (line) => {
  return ctaTrainTrackerApi.trainLineEmojis[line.toUpperCase()] || ''
}

module.exports = {
  chicagoDataPortalApi,
  ctaTrainTrackerApi,
  getTrainLineEmoji,
}

function generateShortenCode(shortenCodeLength) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '0123456789'
  const collection = (lowerCaseLetters + upperCaseLetters + numbers).split('')
  
  let shortenCode = ''
  for (i = 0; i < Number(shortenCodeLength); i++) {
    shortenCode += chooseRandomly(collection)
  }

  return shortenCode
}

function chooseRandomly(collection) {
  const index = Math.floor(Math.random() * collection.length)
  return collection[index]
}

module.exports = generateShortenCode
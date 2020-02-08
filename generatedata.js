const firstEntry = {
  "date": 1560470400 + (60 * 60 * 24),
  "Apples": 101,
  "Bannanas": 96,
  "Pineapple": 40
}

const result = [ ]
result.push(firstEntry)

do {
  console.log(result)
  const newEntry = Object.assign({}, result.slice(-1)[0])
  newEntry.date += (60 * 60 * 24)
  const applesChanged = Math.floor(Math.random() * 20) - 19
  const bannanasChanges = Math.floor(Math.random() * 20) - 19
  const pineapplesChange = Math.floor(Math.random() * 20) - 19
  newEntry.Apples += applesChanged
  newEntry.Bannanas += bannanasChanges
  newEntry.Pineapple += pineapplesChange
  result.push(newEntry)
} while (result.length < 7)

console.log(JSON.stringify(result))

const rewire = require("rewire")
const index = rewire("./index.babel.js")

const get = name => index.__get__(name)
const set = (name, value) => {
  let replaced
  beforeEach(() => {
    replaced = index.__get__(name)
    index.__set__(name, value)
  })
  afterEach(() => {
    index.__set__(name, replaced)
  })
  return value
}

describe(`characterIsWhiteSpace`, () => {
  const run = (input, output) => it(
    `returns "${output}" given "${input}"`,
    () => expect(get(`characterIsWhiteSpace`)(input)).toEqual(output)
  )
  run(` `, true)
  run(`\t`, true)
  run(`\r`, true)
  run(`\n`, true)
  run(`G`, false)
  run(`g`, false)
  run(`5`, false)
  run(`$`, false)
  run(`か`, false)
})

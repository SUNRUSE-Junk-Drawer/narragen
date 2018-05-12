const rewire = require("rewire")
const index = rewire("./index")

global.index = index
global.get = name => index.__get__(name)
global.set = (name, valueFactory) => {
  let replaced
  beforeEach(() => {
    replaced = index.__get__(name)
    index.__set__(name, valueFactory())
  })
  afterEach(() => {
    index.__set__(name, replaced)
  })
}

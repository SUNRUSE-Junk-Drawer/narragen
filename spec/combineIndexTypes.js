describe("combineIndexTypes", () => {
  const run = (a, b, result) => it(`combines "${a}" and "${b}" into "${result}"`, () => expect(get("combineIndexTypes")(a, b)).toEqual(result))
  run("none", "none", "none")
  run("forward", "none", "forward")
  run("inverted", "none", "inverted")
  run("both", "none", "both")
  run("none", "forward", "forward")
  run("forward", "forward", "forward")
  run("inverted", "forward", "both")
  run("both", "forward", "both")
  run("none", "inverted", "inverted")
  run("forward", "inverted", "both")
  run("inverted", "inverted", "inverted")
  run("both", "inverted", "both")
  run("none", "both", "both")
  run("forward", "both", "both")
  run("inverted", "both", "both")
  run("both", "both", "both")
})
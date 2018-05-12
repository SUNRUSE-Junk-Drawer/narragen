describe("prettyPrintSet", () => {
  const prettyPrintPath = jasmine.createSpy("prettyPrintPath")
  set("prettyPrintPath", () => prettyPrintPath)
  prettyPrintPath.and.callFake(path => {
    if (path == "Test Path A") return "Test Pretty Printed Path A"
    if (path == "Test Path B") return "Test Pretty Printed Path B"
  })
  let input, output
  beforeEach(() => {
    prettyPrintPath.calls.reset()
    output = get("prettyPrintSet")(input = {
      set: {
        file: "Test Assign File",
        start: 2387,
        end: 3874
      },
      path: "Test Path A",
      to: {
        file: "Test To File",
        start: 4783,
        end: 5563
      },
      value: "Test Path B"
    })
  })
  it("pretty prints two paths", () => expect(prettyPrintPath).toHaveBeenCalledTimes(2))
  it("pretty prints the set path", () => expect(prettyPrintPath).toHaveBeenCalledWith("Test Path A"))
  it("pretty prints the value path", () => expect(prettyPrintPath).toHaveBeenCalledWith("Test Path B"))
  it("returns the pretty-printed statement", () => expect(output).toEqual("set Test Pretty Printed Path A to Test Pretty Printed Path B"))
  it("does not modify the input", () => expect(input).toEqual({
    set: {
      file: "Test Assign File",
      start: 2387,
      end: 3874
    },
    path: "Test Path A",
    to: {
      file: "Test To File",
      start: 4783,
      end: 5563
    },
    value: "Test Path B"
  }))
})
describe("prettyPrintCondition", () => {
  const prettyPrintPath = jasmine.createSpy("prettyPrintPath")
  set("prettyPrintPath", () => prettyPrintPath)
  prettyPrintPath.and.callFake(path => {
    if (path == "Test Path A") return "Test Pretty Printed Path A"
    if (path == "Test Path B") return "Test Pretty Printed Path B"
  })
  beforeEach(() => prettyPrintPath.calls.reset())
  describe("is", () => {
    let input, output
    beforeEach(() => output = get("prettyPrintCondition")(input = {
      when: {
        file: "Test When File",
        start: 823,
        end: 1264
      },
      left: "Test Path A",
      is: {
        file: "Test Is File",
        start: 2387,
        end: 3874
      },
      right: "Test Path B"
    }))
    it("pretty prints two paths", () => expect(prettyPrintPath).toHaveBeenCalledTimes(2))
    it("pretty prints the left path", () => expect(prettyPrintPath).toHaveBeenCalledWith("Test Path A"))
    it("pretty prints the right path", () => expect(prettyPrintPath).toHaveBeenCalledWith("Test Path B"))
    it("returns the pretty-printed statement", () => expect(output).toEqual("Test Pretty Printed Path A is Test Pretty Printed Path B"))
    it("does not modify the input", () => expect(input).toEqual({
      when: {
        file: "Test When File",
        start: 823,
        end: 1264
      },
      left: "Test Path A",
      is: {
        file: "Test Is File",
        start: 2387,
        end: 3874
      },
      right: "Test Path B"
    }))
  })
  describe("is not", () => {
    let input, output
    beforeEach(() => output = get("prettyPrintCondition")(input = {
      when: {
        file: "Test When File",
        start: 823,
        end: 1264
      },
      left: "Test Path A",
      is: {
        file: "Test Is File",
        start: 2387,
        end: 3874
      },
      not: {
        file: "Test Not File",
        start: 4783,
        end: 5563
      },
      right: "Test Path B"
    }))
    it("pretty prints two paths", () => expect(prettyPrintPath).toHaveBeenCalledTimes(2))
    it("pretty prints the left path", () => expect(prettyPrintPath).toHaveBeenCalledWith("Test Path A"))
    it("pretty prints the right path", () => expect(prettyPrintPath).toHaveBeenCalledWith("Test Path B"))
    it("returns the pretty-printed statement", () => expect(output).toEqual("Test Pretty Printed Path A is not Test Pretty Printed Path B"))
    it("does not modify the input", () => expect(input).toEqual({
      when: {
        file: "Test When File",
        start: 823,
        end: 1264
      },
      left: "Test Path A",
      is: {
        file: "Test Is File",
        start: 2387,
        end: 3874
      },
      not: {
        file: "Test Not File",
        start: 4783,
        end: 5563
      },
      right: "Test Path B"
    }))
  })
})
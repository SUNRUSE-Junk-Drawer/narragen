describe("prettyPrintGlobal", () => {
  const prettyPrintInitializer = jasmine.createSpy("prettyPrintInitializer")
  set("prettyPrintInitializer", () => prettyPrintInitializer)
  prettyPrintInitializer.and.callFake(initializer => {
    if (initializer == "Test Initializer A") return "Test Pretty Printed Initializer A"
    if (initializer == "Test Initializer B") return "Test Pretty Printed Initializer B"
    if (initializer == "Test Initializer C") return "Test Pretty Printed Initializer C"
  })
  beforeEach(() => prettyPrintInitializer.calls.reset())
  describe("without a name", () => {
    let input, output
    beforeEach(() => output = get("prettyPrintGlobal")(input = {
      define: {
        file: "Test Define File",
        start: 2387,
        end: 3874
      },
      name: null,
      initializers: []
    }))
    it("does not pretty print any initializers", () => expect(prettyPrintInitializer).not.toHaveBeenCalled())
    it("returns the pretty-printed global", () => expect(output).toEqual("define"))
    it("does not modify the input", () => expect(input).toEqual({
      define: {
        file: "Test Define File",
        start: 2387,
        end: 3874
      },
      name: null,
      initializers: []
    }))
  })
  describe("without setting anything", () => {
    let input, output
    beforeEach(() => output = get("prettyPrintGlobal")(input = {
      define: {
        file: "Test Define File",
        start: 2387,
        end: 3874
      },
      name: {
        file: "Test Name File",
        start: 4783,
        end: 5563,
        token: "TestValue"
      },
      initializers: []
    }))
    it("does not pretty print any initializers", () => expect(prettyPrintInitializer).not.toHaveBeenCalled())
    it("returns the pretty-printed global", () => expect(output).toEqual("define TestValue"))
    it("does not modify the input", () => expect(input).toEqual({
      define: {
        file: "Test Define File",
        start: 2387,
        end: 3874
      },
      name: {
        file: "Test Name File",
        start: 4783,
        end: 5563,
        token: "TestValue"
      },
      initializers: []
    }))
  })
  describe("setting one value", () => {
    let input, output
    beforeEach(() => output = get("prettyPrintGlobal")(input = {
      define: {
        file: "Test Define File",
        start: 2387,
        end: 3874
      },
      name: {
        file: "Test Name File",
        start: 4783,
        end: 5563,
        token: "TestValue"
      },
      initializers: ["Test Initializer A"]
    }))
    it("pretty prints one initializer", () => expect(prettyPrintInitializer).toHaveBeenCalledTimes(1))
    it("pretty prints the first initializer", () => expect(prettyPrintInitializer).toHaveBeenCalledWith("Test Initializer A"))
    it("returns the pretty-printed global", () => expect(output).toEqual(`define TestValue
\tTest Pretty Printed Initializer A`))
    it("does not modify the input", () => expect(input).toEqual({
      define: {
        file: "Test Define File",
        start: 2387,
        end: 3874
      },
      name: {
        file: "Test Name File",
        start: 4783,
        end: 5563,
        token: "TestValue"
      },
      initializers: ["Test Initializer A"]
    }))
  })
  describe("setting two values", () => {
    let input, output
    beforeEach(() => output = get("prettyPrintGlobal")(input = {
      define: {
        file: "Test Define File",
        start: 2387,
        end: 3874
      },
      name: {
        file: "Test Name File",
        start: 4783,
        end: 5563,
        token: "TestValue"
      },
      initializers: ["Test Initializer A", "Test Initializer B"]
    }))
    it("pretty prints two initializers", () => expect(prettyPrintInitializer).toHaveBeenCalledTimes(2))
    it("pretty prints the first initializer", () => expect(prettyPrintInitializer).toHaveBeenCalledWith("Test Initializer A"))
    it("pretty prints the second initializer", () => expect(prettyPrintInitializer).toHaveBeenCalledWith("Test Initializer B"))
    it("returns the pretty-printed global", () => expect(output).toEqual(`define TestValue
\tTest Pretty Printed Initializer A
\tTest Pretty Printed Initializer B`))
    it("does not modify the input", () => expect(input).toEqual({
      define: {
        file: "Test Define File",
        start: 2387,
        end: 3874
      },
      name: {
        file: "Test Name File",
        start: 4783,
        end: 5563,
        token: "TestValue"
      },
      initializers: ["Test Initializer A", "Test Initializer B"]
    }))
  })
  describe("setting three values", () => {
    let input, output
    beforeEach(() => output = get("prettyPrintGlobal")(input = {
      define: {
        file: "Test Define File",
        start: 2387,
        end: 3874
      },
      name: {
        file: "Test Name File",
        start: 4783,
        end: 5563,
        token: "TestValue"
      },
      initializers: ["Test Initializer A", "Test Initializer B", "Test Initializer C"]
    }))
    it("pretty prints three initializers", () => expect(prettyPrintInitializer).toHaveBeenCalledTimes(3))
    it("pretty prints the first initializer", () => expect(prettyPrintInitializer).toHaveBeenCalledWith("Test Initializer A"))
    it("pretty prints the second initializer", () => expect(prettyPrintInitializer).toHaveBeenCalledWith("Test Initializer B"))
    it("pretty prints the third initializer", () => expect(prettyPrintInitializer).toHaveBeenCalledWith("Test Initializer C"))
    it("returns the pretty-printed global", () => expect(output).toEqual(`define TestValue
\tTest Pretty Printed Initializer A
\tTest Pretty Printed Initializer B
\tTest Pretty Printed Initializer C`))
    it("does not modify the input", () => expect(input).toEqual({
      define: {
        file: "Test Define File",
        start: 2387,
        end: 3874
      },
      name: {
        file: "Test Name File",
        start: 4783,
        end: 5563,
        token: "TestValue"
      },
      initializers: ["Test Initializer A", "Test Initializer B", "Test Initializer C"]
    }))
  })
})
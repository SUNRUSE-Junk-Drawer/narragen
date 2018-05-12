describe("prettyPrint", () => {
  it("is exported", () => expect(index.prettyPrint).toBe(get("prettyPrint")))
  const prettyPrintStatement = jasmine.createSpy("prettyPrintStatement")
  set("prettyPrintStatement", () => prettyPrintStatement)
  prettyPrintStatement.and.callFake(statement => {
    if (statement == "Test Statement A") return "Test Pretty Printed Statement A"
    if (statement == "Test Statement B") return "Test Pretty Printed Statement B"
    if (statement == "Test Statement C") return "Test Pretty Printed Statement C"
  })
  beforeEach(() => prettyPrintStatement.calls.reset())
  describe("no statements", () => {
    let input, output
    beforeEach(() => output = get("prettyPrint")(input = []))
    it("does not pretty print any statements", () => expect(prettyPrintStatement).not.toHaveBeenCalled())
    it("returns the pretty printed program", () => expect(output).toEqual(`
`))
    it("does not modify the program", () => expect(input).toEqual([]))
  })
  describe("one statement", () => {
    let input, output
    beforeEach(() => output = get("prettyPrint")(input = ["Test Statement A"]))
    it("pretty prints one statement", () => expect(prettyPrintStatement).toHaveBeenCalledTimes(1))
    it("pretty prints the first statement", () => expect(prettyPrintStatement).toHaveBeenCalledWith("Test Statement A"))
    it("returns the pretty printed program", () => expect(output).toEqual(`Test Pretty Printed Statement A
`))
    it("does not modify the program", () => expect(input).toEqual(["Test Statement A"]))
  })
  describe("two statements", () => {
    let input, output
    beforeEach(() => output = get("prettyPrint")(input = ["Test Statement A", "Test Statement B"]))
    it("pretty prints one statement", () => expect(prettyPrintStatement).toHaveBeenCalledTimes(2))
    it("pretty prints the first statement", () => expect(prettyPrintStatement).toHaveBeenCalledWith("Test Statement A"))
    it("pretty prints the second statement", () => expect(prettyPrintStatement).toHaveBeenCalledWith("Test Statement B"))
    it("returns the pretty printed program", () => expect(output).toEqual(`Test Pretty Printed Statement A

Test Pretty Printed Statement B
`))
    it("does not modify the program", () => expect(input).toEqual(["Test Statement A", "Test Statement B"]))
  })
  describe("three statements", () => {
    let input, output
    beforeEach(() => output = get("prettyPrint")(input = ["Test Statement A", "Test Statement B", "Test Statement C"]))
    it("pretty prints one statement", () => expect(prettyPrintStatement).toHaveBeenCalledTimes(3))
    it("pretty prints the first statement", () => expect(prettyPrintStatement).toHaveBeenCalledWith("Test Statement A"))
    it("pretty prints the second statement", () => expect(prettyPrintStatement).toHaveBeenCalledWith("Test Statement B"))
    it("pretty prints the third statement", () => expect(prettyPrintStatement).toHaveBeenCalledWith("Test Statement C"))
    it("returns the pretty printed program", () => expect(output).toEqual(`Test Pretty Printed Statement A

Test Pretty Printed Statement B

Test Pretty Printed Statement C
`))
    it("does not modify the program", () => expect(input).toEqual(["Test Statement A", "Test Statement B", "Test Statement C"]))
  })
})

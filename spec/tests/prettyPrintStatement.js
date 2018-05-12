describe("prettyPrintStatement", () => {
  const prettyPrintRule = jasmine.createSpy("prettyPrintRule")
  set("prettyPrintRule", () => prettyPrintRule)
  prettyPrintRule.and.returnValue("Test Pretty Printed Rule")
  beforeEach(() => prettyPrintRule.calls.reset())
  const prettyPrintGlobal = jasmine.createSpy("prettyPrintGlobal")
  set("prettyPrintGlobal", () => prettyPrintGlobal)
  prettyPrintGlobal.and.returnValue("Test Pretty Printed Global")
  beforeEach(() => prettyPrintGlobal.calls.reset())
  describe("rule", () => {
    let input, output
    beforeEach(() => output = get("prettyPrintStatement")(input = {
      rule: "Test Rule"
    }))
    it("pretty prints one rule", () => expect(prettyPrintRule).toHaveBeenCalledTimes(1))
    it("pretty prints the rule", () => expect(prettyPrintRule).toHaveBeenCalledWith("Test Rule"))
    it("does not pretty print any globals", () => expect(prettyPrintGlobal).not.toHaveBeenCalled())
    it("returns the pretty printed rule", () => expect(output).toEqual("Test Pretty Printed Rule"))
    it("does not modify the input", () => expect(input).toEqual({
      rule: "Test Rule"
    }))
  })
  describe("rule", () => {
    let input, output
    beforeEach(() => output = get("prettyPrintStatement")(input = {
      global: "Test Global"
    }))
    it("does not pretty print any rules", () => expect(prettyPrintRule).not.toHaveBeenCalled())
    it("pretty prints one global", () => expect(prettyPrintGlobal).toHaveBeenCalledTimes(1))
    it("pretty prints the global", () => expect(prettyPrintGlobal).toHaveBeenCalledWith("Test Global"))
    it("returns the pretty printed global", () => expect(output).toEqual("Test Pretty Printed Global"))
    it("does not modify the input", () => expect(input).toEqual({
      global: "Test Global"
    }))
  })
})

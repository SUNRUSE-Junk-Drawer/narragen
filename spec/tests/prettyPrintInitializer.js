describe("prettyPrintInitializer", () => {
  let input, output
  describe("without a value", () => {
    beforeEach(() => output = get("prettyPrintInitializer")(input = {
      attribute: {
        file: "Test Attribute File",
        start: 2387,
        end: 3874,
        token: "TestAttribute"
      },
      value: null
    }))
    it("returns the pretty-printed initializer", () => expect(output).toEqual("TestAttribute"))
    it("does not modify the input", () => expect(input).toEqual({
      attribute: {
        file: "Test Attribute File",
        start: 2387,
        end: 3874,
        token: "TestAttribute"
      },
      value: null
    }))
  })
  describe("with a value", () => {
    beforeEach(() => output = get("prettyPrintInitializer")(input = {
      attribute: {
        file: "Test Attribute File",
        start: 2387,
        end: 3874,
        token: "TestAttribute"
      },
      value: {
        file: "Test Value File",
        start: 4783,
        end: 5563,
        token: "TestValue"
      }
    }))
    it("returns the pretty-printed initializer", () => expect(output).toEqual("TestAttribute TestValue"))
    it("does not modify the input", () => expect(input).toEqual({
      attribute: {
        file: "Test Attribute File",
        start: 2387,
        end: 3874,
        token: "TestAttribute"
      },
      value: {
        file: "Test Value File",
        start: 4783,
        end: 5563,
        token: "TestValue"
      }
    }))
  })
})

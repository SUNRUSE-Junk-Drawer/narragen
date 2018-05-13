describe("prettyPrintPath", () => {
  describe("without an entity", () => {
    let input, output
    beforeEach(() => output = get("prettyPrintPath")(input = {
      entity: null,
      attributeChain: []
    }))
    it("returns the pretty-printed path", () => expect(output).toEqual(""))
    it("does not modify the input", () => expect(input).toEqual({
      entity: null,
      attributeChain: []
    }))
  })
  describe("without attributes", () => {
    let input, output
    beforeEach(() => output = get("prettyPrintPath")(input = {
      entity: {
        file: "Test Entity File",
        start: 2387,
        end: 3874,
        token: "TestEntityName"
      },
      attributeChain: []
    }))
    it("returns the pretty-printed path", () => expect(output).toEqual("TestEntityName"))
    it("does not modify the input", () => expect(input).toEqual({
      entity: {
        file: "Test Entity File",
        start: 2387,
        end: 3874,
        token: "TestEntityName"
      },
      attributeChain: []
    }))
  })
  describe("with one attribute", () => {
    let input, output
    beforeEach(() => output = get("prettyPrintPath")(input = {
      entity: {
        file: "Test Entity File",
        start: 2387,
        end: 3874,
        token: "TestEntityName"
      },
      attributeChain: [{
        file: "Test Attribute File A",
        start: 4203,
        end: 5324,
        token: "TestAttributeNameA"
      }]
    }))
    it("returns the pretty-printed path", () => expect(output).toEqual("TestEntityName TestAttributeNameA"))
    it("does not modify the input", () => expect(input).toEqual({
      entity: {
        file: "Test Entity File",
        start: 2387,
        end: 3874,
        token: "TestEntityName"
      },
      attributeChain: [{
        file: "Test Attribute File A",
        start: 4203,
        end: 5324,
        token: "TestAttributeNameA"
      }]
    }))
  })
  describe("with two attributes", () => {
    let input, output
    beforeEach(() => output = get("prettyPrintPath")(input = {
      entity: {
        file: "Test Entity File",
        start: 2387,
        end: 3874,
        token: "TestEntityName"
      },
      attributeChain: [{
        file: "Test Attribute File A",
        start: 4203,
        end: 5324,
        token: "TestAttributeNameA"
      }, {
        file: "Test Attribute File B",
        start: 6530,
        end: 7727,
        token: "TestAttributeNameB"
      }]
    }))
    it("returns the pretty-printed path", () => expect(output).toEqual("TestEntityName TestAttributeNameA TestAttributeNameB"))
    it("does not modify the input", () => expect(input).toEqual({
      entity: {
        file: "Test Entity File",
        start: 2387,
        end: 3874,
        token: "TestEntityName"
      },
      attributeChain: [{
        file: "Test Attribute File A",
        start: 4203,
        end: 5324,
        token: "TestAttributeNameA"
      }, {
        file: "Test Attribute File B",
        start: 6530,
        end: 7727,
        token: "TestAttributeNameB"
      }]
    }))
  })
  describe("with three attributes", () => {
    let input, output
    beforeEach(() => output = get("prettyPrintPath")(input = {
      entity: {
        file: "Test Entity File",
        start: 2387,
        end: 3874,
        token: "TestEntityName"
      },
      attributeChain: [{
        file: "Test Attribute File A",
        start: 4203,
        end: 5324,
        token: "TestAttributeNameA"
      }, {
        file: "Test Attribute File B",
        start: 6530,
        end: 7727,
        token: "TestAttributeNameB"
      }, {
        file: "Test Attribute File C",
        start: 9928,
        end: 11242,
        token: "TestAttributeNameC"
      }]
    }))
    it("returns the pretty-printed path", () => expect(output).toEqual("TestEntityName TestAttributeNameA TestAttributeNameB TestAttributeNameC"))
    it("does not modify the input", () => expect(input).toEqual({
      entity: {
        file: "Test Entity File",
        start: 2387,
        end: 3874,
        token: "TestEntityName"
      },
      attributeChain: [{
        file: "Test Attribute File A",
        start: 4203,
        end: 5324,
        token: "TestAttributeNameA"
      }, {
        file: "Test Attribute File B",
        start: 6530,
        end: 7727,
        token: "TestAttributeNameB"
      }, {
        file: "Test Attribute File C",
        start: 9928,
        end: 11242,
        token: "TestAttributeNameC"
      }]
    }))
  })
})

describe("prettyPrintPath", () => {
  it("without an entity", () => expect(get("prettyPrintPath")({
    entity: null,
    attributeChain: []
  })).toEqual(""))
  it("without attributes", () => expect(get("prettyPrintPath")({
    entity: {
      file: "Test Entity File",
      start: 2387,
      end: 3874,
      token: "TestEntityName"
    },
    attributeChain: []
  })).toEqual("TestEntityName"))
  it("with one attribute", () => expect(get("prettyPrintPath")({
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
  })).toEqual("TestEntityName TestAttributeNameA"))
  it("with two attributes", () => expect(get("prettyPrintPath")({
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
  })).toEqual("TestEntityName TestAttributeNameA TestAttributeNameB"))
  it("with three attributes", () => expect(get("prettyPrintPath")({
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
  })).toEqual("TestEntityName TestAttributeNameA TestAttributeNameB TestAttributeNameC"))
})

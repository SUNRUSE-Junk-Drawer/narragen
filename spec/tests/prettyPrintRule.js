describe("prettyPrintRule", () => {
  const prettyPrintCondition = jasmine.createSpy("prettyPrintCondition")
  set("prettyPrintCondition", () => prettyPrintCondition)
  prettyPrintCondition.and.callFake(condition => {
    if (condition == "Test Condition A") return "Test Pretty Printed Condition A"
    if (condition == "Test Condition B") return "Test Pretty Printed Condition B"
    if (condition == "Test Condition C") return "Test Pretty Printed Condition C"
  })
  beforeEach(() => prettyPrintCondition.calls.reset())
  const prettyPrintSet = jasmine.createSpy("prettyPrintSet")
  set("prettyPrintSet", () => prettyPrintSet)
  prettyPrintSet.and.callFake(set => {
    if (set == "Test Set A") return "Test Pretty Printed Set A"
    if (set == "Test Set B") return "Test Pretty Printed Set B"
    if (set == "Test Set C") return "Test Pretty Printed Set C"
  })
  beforeEach(() => prettyPrintSet.calls.reset())
  describe("one condition", () => {
    describe("nothing set", () => {
      let input, output
      beforeEach(() => output = get("prettyPrintRule")(input = {
        conditions: ["Test Condition A"],
        sets: []
      }))
      it("pretty prints one condition", () => expect(prettyPrintCondition).toHaveBeenCalledTimes(1))
      it("pretty prints the first condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition A"))
      it("does not pretty print any sets", () => expect(prettyPrintSet).not.toHaveBeenCalled())
      it("returns the pretty-printed rule", () => expect(output).toEqual(`when Test Pretty Printed Condition A`))
      it("does not modify the input", () => expect(input).toEqual({
        conditions: ["Test Condition A"],
        sets: []
      }))
    })
    describe("one thing set", () => {
      let input, output
      beforeEach(() => output = get("prettyPrintRule")(input = {
        conditions: ["Test Condition A"],
        sets: ["Test Set A"]
      }))
      it("pretty prints one condition", () => expect(prettyPrintCondition).toHaveBeenCalledTimes(1))
      it("pretty prints the first condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition A"))
      it("pretty prints one set", () => expect(prettyPrintSet).toHaveBeenCalledTimes(1))
      it("pretty prints the first set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set A"))
      it("returns the pretty-printed rule", () => expect(output).toEqual(`when Test Pretty Printed Condition A
set Test Pretty Printed Set A`))
      it("does not modify the input", () => expect(input).toEqual({
        conditions: ["Test Condition A"],
        sets: ["Test Set A"]
      }))
    })
    describe("two things set", () => {
      let input, output
      beforeEach(() => output = get("prettyPrintRule")(input = {
        conditions: ["Test Condition A"],
        sets: ["Test Set A", "Test Set B"]
      }))
      it("pretty prints one condition", () => expect(prettyPrintCondition).toHaveBeenCalledTimes(1))
      it("pretty prints the first condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition A"))
      it("pretty prints one set", () => expect(prettyPrintSet).toHaveBeenCalledTimes(2))
      it("pretty prints the first set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set A"))
      it("pretty prints the second set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set B"))
      it("returns the pretty-printed rule", () => expect(output).toEqual(`when Test Pretty Printed Condition A
set Test Pretty Printed Set A
and Test Pretty Printed Set B`))
      it("does not modify the input", () => expect(input).toEqual({
        conditions: ["Test Condition A"],
        sets: ["Test Set A", "Test Set B"]
      }))
    })
    describe("three things set", () => {
      let input, output
      beforeEach(() => output = get("prettyPrintRule")(input = {
        conditions: ["Test Condition A"],
        sets: ["Test Set A", "Test Set B", "Test Set C"]
      }))
      it("pretty prints one condition", () => expect(prettyPrintCondition).toHaveBeenCalledTimes(1))
      it("pretty prints the first condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition A"))
      it("pretty prints one set", () => expect(prettyPrintSet).toHaveBeenCalledTimes(3))
      it("pretty prints the first set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set A"))
      it("pretty prints the second set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set B"))
      it("pretty prints the third set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set C"))
      it("returns the pretty-printed rule", () => expect(output).toEqual(`when Test Pretty Printed Condition A
set Test Pretty Printed Set A
and Test Pretty Printed Set B
and Test Pretty Printed Set C`))
      it("does not modify the input", () => expect(input).toEqual({
        conditions: ["Test Condition A"],
        sets: ["Test Set A", "Test Set B", "Test Set C"]
      }))
    })
  })
  describe("two conditions", () => {
    describe("nothing set", () => {
      let input, output
      beforeEach(() => output = get("prettyPrintRule")(input = {
        conditions: ["Test Condition A", "Test Condition B"],
        sets: []
      }))
      it("pretty prints one condition", () => expect(prettyPrintCondition).toHaveBeenCalledTimes(2))
      it("pretty prints the first condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition A"))
      it("pretty prints the second condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition B"))
      it("does not pretty print any sets", () => expect(prettyPrintSet).not.toHaveBeenCalled())
      it("returns the pretty-printed rule", () => expect(output).toEqual(`when Test Pretty Printed Condition A
and Test Pretty Printed Condition B`))
      it("does not modify the input", () => expect(input).toEqual({
        conditions: ["Test Condition A", "Test Condition B"],
        sets: []
      }))
    })
    describe("one thing set", () => {
      let input, output
      beforeEach(() => output = get("prettyPrintRule")(input = {
        conditions: ["Test Condition A", "Test Condition B"],
        sets: ["Test Set A"]
      }))
      it("pretty prints one condition", () => expect(prettyPrintCondition).toHaveBeenCalledTimes(2))
      it("pretty prints the first condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition A"))
      it("pretty prints the second condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition B"))
      it("pretty prints one set", () => expect(prettyPrintSet).toHaveBeenCalledTimes(1))
      it("pretty prints the first set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set A"))
      it("returns the pretty-printed rule", () => expect(output).toEqual(`when Test Pretty Printed Condition A
and Test Pretty Printed Condition B
set Test Pretty Printed Set A`))
      it("does not modify the input", () => expect(input).toEqual({
        conditions: ["Test Condition A", "Test Condition B"],
        sets: ["Test Set A"]
      }))
    })
    describe("two things set", () => {
      let input, output
      beforeEach(() => output = get("prettyPrintRule")(input = {
        conditions: ["Test Condition A", "Test Condition B"],
        sets: ["Test Set A", "Test Set B"]
      }))
      it("pretty prints one condition", () => expect(prettyPrintCondition).toHaveBeenCalledTimes(2))
      it("pretty prints the first condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition A"))
      it("pretty prints the second condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition B"))
      it("pretty prints one set", () => expect(prettyPrintSet).toHaveBeenCalledTimes(2))
      it("pretty prints the first set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set A"))
      it("pretty prints the second set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set B"))
      it("returns the pretty-printed rule", () => expect(output).toEqual(`when Test Pretty Printed Condition A
and Test Pretty Printed Condition B
set Test Pretty Printed Set A
and Test Pretty Printed Set B`))
      it("does not modify the input", () => expect(input).toEqual({
        conditions: ["Test Condition A", "Test Condition B"],
        sets: ["Test Set A", "Test Set B"]
      }))
    })
    describe("three things set", () => {
      let input, output
      beforeEach(() => output = get("prettyPrintRule")(input = {
        conditions: ["Test Condition A", "Test Condition B"],
        sets: ["Test Set A", "Test Set B", "Test Set C"]
      }))
      it("pretty prints one condition", () => expect(prettyPrintCondition).toHaveBeenCalledTimes(2))
      it("pretty prints the first condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition A"))
      it("pretty prints the second condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition B"))
      it("pretty prints one set", () => expect(prettyPrintSet).toHaveBeenCalledTimes(3))
      it("pretty prints the first set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set A"))
      it("pretty prints the second set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set B"))
      it("pretty prints the third set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set C"))
      it("returns the pretty-printed rule", () => expect(output).toEqual(`when Test Pretty Printed Condition A
and Test Pretty Printed Condition B
set Test Pretty Printed Set A
and Test Pretty Printed Set B
and Test Pretty Printed Set C`))
      it("does not modify the input", () => expect(input).toEqual({
        conditions: ["Test Condition A", "Test Condition B"],
        sets: ["Test Set A", "Test Set B", "Test Set C"]
      }))
    })
  })
  describe("three conditions", () => {
    describe("nothing set", () => {
      let input, output
      beforeEach(() => output = get("prettyPrintRule")(input = {
        conditions: ["Test Condition A", "Test Condition B", "Test Condition C"],
        sets: []
      }))
      it("pretty prints one condition", () => expect(prettyPrintCondition).toHaveBeenCalledTimes(3))
      it("pretty prints the first condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition A"))
      it("pretty prints the second condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition B"))
      it("pretty prints the third condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition C"))
      it("does not pretty print any sets", () => expect(prettyPrintSet).not.toHaveBeenCalled())
      it("returns the pretty-printed rule", () => expect(output).toEqual(`when Test Pretty Printed Condition A
and Test Pretty Printed Condition B
and Test Pretty Printed Condition C`))
      it("does not modify the input", () => expect(input).toEqual({
        conditions: ["Test Condition A", "Test Condition B", "Test Condition C"],
        sets: []
      }))
    })
    describe("one thing set", () => {
      let input, output
      beforeEach(() => output = get("prettyPrintRule")(input = {
        conditions: ["Test Condition A", "Test Condition B", "Test Condition C"],
        sets: ["Test Set A"]
      }))
      it("pretty prints one condition", () => expect(prettyPrintCondition).toHaveBeenCalledTimes(3))
      it("pretty prints the first condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition A"))
      it("pretty prints the second condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition B"))
      it("pretty prints the third condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition C"))
      it("pretty prints one set", () => expect(prettyPrintSet).toHaveBeenCalledTimes(1))
      it("pretty prints the first set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set A"))
      it("returns the pretty-printed rule", () => expect(output).toEqual(`when Test Pretty Printed Condition A
and Test Pretty Printed Condition B
and Test Pretty Printed Condition C
set Test Pretty Printed Set A`))
      it("does not modify the input", () => expect(input).toEqual({
        conditions: ["Test Condition A", "Test Condition B", "Test Condition C"],
        sets: ["Test Set A"]
      }))
    })
    describe("two things set", () => {
      let input, output
      beforeEach(() => output = get("prettyPrintRule")(input = {
        conditions: ["Test Condition A", "Test Condition B", "Test Condition C"],
        sets: ["Test Set A", "Test Set B"]
      }))
      it("pretty prints one condition", () => expect(prettyPrintCondition).toHaveBeenCalledTimes(3))
      it("pretty prints the first condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition A"))
      it("pretty prints the second condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition B"))
      it("pretty prints the third condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition C"))
      it("pretty prints one set", () => expect(prettyPrintSet).toHaveBeenCalledTimes(2))
      it("pretty prints the first set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set A"))
      it("pretty prints the second set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set B"))
      it("returns the pretty-printed rule", () => expect(output).toEqual(`when Test Pretty Printed Condition A
and Test Pretty Printed Condition B
and Test Pretty Printed Condition C
set Test Pretty Printed Set A
and Test Pretty Printed Set B`))
      it("does not modify the input", () => expect(input).toEqual({
        conditions: ["Test Condition A", "Test Condition B", "Test Condition C"],
        sets: ["Test Set A", "Test Set B"]
      }))
    })
    describe("three things set", () => {
      let input, output
      beforeEach(() => output = get("prettyPrintRule")(input = {
        conditions: ["Test Condition A", "Test Condition B", "Test Condition C"],
        sets: ["Test Set A", "Test Set B", "Test Set C"]
      }))
      it("pretty prints one condition", () => expect(prettyPrintCondition).toHaveBeenCalledTimes(3))
      it("pretty prints the first condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition A"))
      it("pretty prints the second condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition B"))
      it("pretty prints the third condition", () => expect(prettyPrintCondition).toHaveBeenCalledWith("Test Condition C"))
      it("pretty prints one set", () => expect(prettyPrintSet).toHaveBeenCalledTimes(3))
      it("pretty prints the first set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set A"))
      it("pretty prints the second set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set B"))
      it("pretty prints the third set", () => expect(prettyPrintSet).toHaveBeenCalledWith("Test Set C"))
      it("returns the pretty-printed rule", () => expect(output).toEqual(`when Test Pretty Printed Condition A
and Test Pretty Printed Condition B
and Test Pretty Printed Condition C
set Test Pretty Printed Set A
and Test Pretty Printed Set B
and Test Pretty Printed Set C`))
      it("does not modify the input", () => expect(input).toEqual({
        conditions: ["Test Condition A", "Test Condition B", "Test Condition C"],
        sets: ["Test Set A", "Test Set B", "Test Set C"]
      }))
    })
  })
})

import { NameSplitterState } from "../name-splitter-state";
import { nameSplitterSyntaxError } from ".";

describe("nameSplitterSyntaxError", () => {
  type NextState = "Test Next State";

  let state: NameSplitterState<NextState>;
  beforeAll(() => {
    state = {
      next: {
        state: "Test Next State",
        onUnscopedName: jasmine.createSpy("onUnscopedName"),
        onRuleScopedName: jasmine.createSpy("onRuleScopedName"),
        onEof: jasmine.createSpy("onEof"),
      },
    };

    nameSplitterSyntaxError(state, "expectedGlobalOrLocal", [
      {
        line: 148,
        column: 137,
        content: "Test Token A Content",
      },
      {
        line: 201,
        column: 24,
        content: "Test Token B Content",
      },
      {
        line: 243,
        column: 50,
        content: "Test Token C Content",
      },
    ]);
  });

  it("does not report any unscoped names", () => {
    expect(state.next.onUnscopedName).not.toHaveBeenCalled();
  });

  it("does not report any rule-scoped names", () => {
    expect(state.next.onRuleScopedName).not.toHaveBeenCalled();
  });

  it("does not report eof", () => {
    expect(state.next.onEof).not.toHaveBeenCalled();
  });
});

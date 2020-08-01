import { NameSplitterState } from "../name-splitter-state";
import { nameSplitterGlobal } from ".";

describe("nameSplitterGlobal", () => {
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

    nameSplitterGlobal(state, 18, 24, 37, 148, "Test Name");
  });

  it("reports one unscoped name", () => {
    expect(state.next.onUnscopedName).toHaveBeenCalledTimes(1);
  });

  it("reports that the declaration name is declared", () => {
    expect(state.next.onUnscopedName).toHaveBeenCalledWith(
      "Test Next State",
      37,
      148,
      "Test Name",
      "globalDeclaration"
    );
  });

  it("does not report any rule-scoped names", () => {
    expect(state.next.onRuleScopedName).not.toHaveBeenCalled();
  });

  it("does not report eof", () => {
    expect(state.next.onEof).not.toHaveBeenCalled();
  });
});

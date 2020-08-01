import { NameSplitterState } from "../name-splitter-state";
import { nameSplitterRuleLocal } from ".";

describe("nameSplitterRuleLocal", () => {
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

    nameSplitterRuleLocal(state, "Test Rule Name", 37, 148, "Test Name");
  });

  it("does not report any unscoped names", () => {
    expect(state.next.onUnscopedName).not.toHaveBeenCalled();
  });

  it("reports one rule-scoped name", () => {
    expect(state.next.onRuleScopedName).toHaveBeenCalledTimes(1);
  });

  it("reports that the local name is declared", () => {
    expect(state.next.onRuleScopedName).toHaveBeenCalledWith(
      "Test Next State",
      "Test Rule Name",
      37,
      148,
      "Test Name",
      "localDeclaration"
    );
  });

  it("does not report eof", () => {
    expect(state.next.onEof).not.toHaveBeenCalled();
  });
});

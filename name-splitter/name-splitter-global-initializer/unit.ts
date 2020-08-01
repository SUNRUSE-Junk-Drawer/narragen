import { NameSplitterState } from "../name-splitter-state";
import { nameSplitterGlobalInitializer } from ".";

describe("nameSplitterGlobalInitializer", () => {
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

    nameSplitterGlobalInitializer(
      state,
      "Test Global Name",
      18,
      24,
      "Test Attribute Name",
      37,
      148,
      "Test Global Name"
    );
  });

  it("reports two unscoped names", () => {
    expect(state.next.onUnscopedName).toHaveBeenCalledTimes(2);
  });

  it("reports that the attribute name is referenced", () => {
    expect(state.next.onUnscopedName).toHaveBeenCalledWith(
      "Test Next State",
      18,
      24,
      "Test Attribute Name",
      "attributeReference"
    );
  });

  it("reports that the global name is referenced", () => {
    expect(state.next.onUnscopedName).toHaveBeenCalledWith(
      "Test Next State",
      37,
      148,
      "Test Global Name",
      "globalReference"
    );
  });

  it("does not report any rule-scoped names", () => {
    expect(state.next.onRuleScopedName).not.toHaveBeenCalled();
  });

  it("does not report eof", () => {
    expect(state.next.onEof).not.toHaveBeenCalled();
  });
});

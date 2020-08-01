import { NameSplitterState } from "../name-splitter-state";
import { nameSplitterEof } from ".";

describe("nameSplitterEof", () => {
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

    nameSplitterEof(state, 37, 148);
  });

  it("does not report any unscoped names", () => {
    expect(state.next.onUnscopedName).not.toHaveBeenCalled();
  });

  it("does not report any rule-scoped names", () => {
    expect(state.next.onRuleScopedName).not.toHaveBeenCalled();
  });

  it("reports one eof", () => {
    expect(state.next.onEof).toHaveBeenCalledTimes(1);
  });

  it("reports the expected eof", () => {
    expect(state.next.onEof).toHaveBeenCalledWith("Test Next State", 37, 148);
  });
});

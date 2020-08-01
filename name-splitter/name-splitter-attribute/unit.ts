import { NameSplitterState } from "../name-splitter-state";
import { nameSplitterAttribute } from ".";

describe("nameSplitterAttribute", () => {
  type NextState = "Test Next State";

  let onUnscopedName: jasmine.Spy;
  let state: NameSplitterState<NextState>;
  beforeAll(() => {
    onUnscopedName = jasmine.createSpy("onUnscopedName");

    state = {
      next: {
        state: "Test Next State",
        onUnscopedName,
        onRuleScopedName: jasmine.createSpy("onRuleScopedName"),
        onEof: jasmine.createSpy("onEof"),
      },
    };

    nameSplitterAttribute(
      state,
      18,
      24,
      37,
      148,
      "Test Attribute Name",
      56,
      24,
      "Test Global Name"
    );
  });

  it("reports two unscoped names", () => {
    expect(state.next.onUnscopedName).toHaveBeenCalledTimes(2);
  });

  it("reports that the attribute name is declared", () => {
    expect(state.next.onUnscopedName).toHaveBeenCalledWith(
      "Test Next State",
      37,
      148,
      "Test Attribute Name",
      "attributeDeclaration"
    );
  });

  it("reports that the global name is referenced", () => {
    expect(state.next.onUnscopedName).toHaveBeenCalledWith(
      "Test Next State",
      56,
      24,
      "Test Global Name",
      "globalReference"
    );
  });

  it("reports that the attribute name is declared before reporting that the global name is referenced", () => {
    expect(onUnscopedName.calls.allArgs()).toEqual([
      [
        jasmine.anything(),
        37,
        jasmine.anything(),
        jasmine.anything(),
        jasmine.anything(),
      ],
      [
        jasmine.anything(),
        56,
        jasmine.anything(),
        jasmine.anything(),
        jasmine.anything(),
      ],
    ]);
  });

  it("does not report any rule-scoped names", () => {
    expect(state.next.onRuleScopedName).not.toHaveBeenCalled();
  });

  it("does not report eof", () => {
    expect(state.next.onEof).not.toHaveBeenCalled();
  });
});

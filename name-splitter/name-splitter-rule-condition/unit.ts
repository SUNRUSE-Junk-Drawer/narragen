import { NameSplitterState } from "../name-splitter-state";
import { nameSplitterRuleCondition } from ".";

describe("nameSplitterRuleCondition", () => {
  type NextState = "Test Next State";

  let order: number[];
  let state: NameSplitterState<NextState>;
  beforeAll(() => {
    order = [];

    state = {
      next: {
        state: "Test Next State",
        onUnscopedName: jasmine
          .createSpy("onUnscopedName")
          .and.callFake((state, line) => {
            state;
            order.push(line);
          }),
        onRuleScopedName: jasmine
          .createSpy("onRuleScopedName")
          .and.callFake((state, ruleName, line) => {
            state;
            ruleName;
            order.push(line);
          }),
        onEof: jasmine.createSpy("onEof"),
      },
    };

    nameSplitterRuleCondition(
      state,
      "Test Rule Name",
      23,
      48,
      "Test Entity A Name",
      37,
      2,
      "Test Attribute A Name",
      42,
      16,
      54,
      12,
      "Test Entity B Name"
    );
  });

  it("reports one unscoped name", () => {
    expect(state.next.onUnscopedName).toHaveBeenCalledTimes(1);
  });

  it("reports that the attribute name is referenced", () => {
    expect(state.next.onUnscopedName).toHaveBeenCalledWith(
      "Test Next State",
      37,
      2,
      "Test Attribute A Name",
      "attributeReference"
    );
  });

  it("reports two rule-scoped names", () => {
    expect(state.next.onRuleScopedName).toHaveBeenCalledTimes(2);
  });

  it("reports that the first entity name is referenced", () => {
    expect(state.next.onRuleScopedName).toHaveBeenCalledWith(
      "Test Next State",
      "Test Rule Name",
      23,
      48,
      "Test Entity A Name",
      "globalOrLocalReference"
    );
  });

  it("reports that the second entity name is referenced", () => {
    expect(state.next.onRuleScopedName).toHaveBeenCalledWith(
      "Test Next State",
      "Test Rule Name",
      54,
      12,
      "Test Entity B Name",
      "globalOrLocalReference"
    );
  });

  it("does not report eof", () => {
    expect(state.next.onEof).not.toHaveBeenCalled();
  });

  it("calls in the expected order", () => {
    expect(order).toEqual([23, 37, 54]);
  });
});

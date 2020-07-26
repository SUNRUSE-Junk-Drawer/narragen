import { ClassifierState } from "../classifier-state";
import { classifierEof } from ".";

describe("classifierToken", () => {
  type TestNextState = "Test Next State";

  let state: ClassifierState<TestNextState>;

  beforeAll(() => {
    state = {
      next: {
        state: "Test Next State",
        onGlobal: jasmine.createSpy("onGlobal"),
        onAttribute: jasmine.createSpy("onAttribute"),
        onRule: jasmine.createSpy("onRule"),
        onWhen: jasmine.createSpy("onWhen"),
        onIs: jasmine.createSpy("onIs"),
        onCreate: jasmine.createSpy("onCreate"),
        onName: jasmine.createSpy("onName"),
        onEof: jasmine.createSpy("onEof"),
      },
    };

    classifierEof(state, 37, 148);
  });

  it('does not report any "global" tokens', () => {
    expect(state.next.onGlobal).not.toHaveBeenCalled();
  });

  it('does not report any "attribute" tokens', () => {
    expect(state.next.onAttribute).not.toHaveBeenCalled();
  });

  it('does not report any "rule" tokens', () => {
    expect(state.next.onRule).not.toHaveBeenCalled();
  });

  it('does not report any "when" tokens', () => {
    expect(state.next.onWhen).not.toHaveBeenCalled();
  });

  it('does not report any "is" tokens', () => {
    expect(state.next.onIs).not.toHaveBeenCalled();
  });

  it('does not report any "create" tokens', () => {
    expect(state.next.onIs).not.toHaveBeenCalled();
  });

  it("does not report any name tokens", () => {
    expect(state.next.onName).not.toHaveBeenCalled();
  });

  it("reports eof once", () => {
    expect(state.next.onEof).toHaveBeenCalledTimes(1);
  });

  it("reports the expected eof", () => {
    expect(state.next.onEof).toHaveBeenCalledWith("Test Next State", 37, 148);
  });
});

import { TokenizerState } from "../tokenizer-state";
import { tokenizerEof } from ".";

describe("tokenizerEof", () => {
  type TestNextState = "Test Next State";

  describe("when between tokens", () => {
    let state: TokenizerState<TestNextState>;

    beforeAll(() => {
      state = {
        line: 44,
        column: 27,
        current: { type: "betweenTokens" },
        next: {
          state: "Test Next State",
          onComment: jasmine.createSpy("onComment"),
          onToken: jasmine.createSpy("onToken"),
          onEof: jasmine.createSpy("onEof"),
        },
      };

      tokenizerEof(state);
    });

    it("does not report a comment", () => {
      expect(state.next.onComment).not.toHaveBeenCalled();
    });

    it("does not report a token", () => {
      expect(state.next.onToken).not.toHaveBeenCalled();
    });

    it("reports eof once", () => {
      expect(state.next.onEof).toHaveBeenCalledTimes(1);
    });

    it("reports eof with the next state", () => {
      expect(state.next.onEof).toHaveBeenCalledWith(
        "Test Next State",
        jasmine.anything(),
        jasmine.anything()
      );
    });

    it("reports eof with the line number", () => {
      expect(state.next.onEof).toHaveBeenCalledWith(
        jasmine.anything(),
        44,
        jasmine.anything()
      );
    });

    it("reports eof with the column number", () => {
      expect(state.next.onEof).toHaveBeenCalledWith(
        jasmine.anything(),
        jasmine.anything(),
        27
      );
    });
  });

  describe("when a line comment has been started", () => {
    let state: TokenizerState<TestNextState>;

    beforeAll(() => {
      state = {
        line: 44,
        column: 27,
        current: {
          type: "lineComment",
          content: "Test Started Line Comment",
          line: 20,
          column: 15,
        },
        next: {
          state: "Test Next State",
          onComment: jasmine.createSpy("onComment"),
          onToken: jasmine.createSpy("onToken"),
          onEof: jasmine.createSpy("onEof"),
        },
      };

      tokenizerEof(state);
    });

    it("reports one comment", () => {
      expect(state.next.onComment).toHaveBeenCalledTimes(1);
    });

    it("reports a comment with the next state", () => {
      expect(state.next.onComment).toHaveBeenCalledWith(
        "Test Next State",
        jasmine.anything(),
        jasmine.anything(),
        jasmine.anything()
      );
    });

    it("reports a comment with the line number", () => {
      expect(state.next.onComment).toHaveBeenCalledWith(
        jasmine.anything(),
        20,
        jasmine.anything(),
        jasmine.anything()
      );
    });

    it("reports a comment with the column number", () => {
      expect(state.next.onComment).toHaveBeenCalledWith(
        jasmine.anything(),
        jasmine.anything(),
        15,
        jasmine.anything()
      );
    });

    it("reports the accumulated comment", () => {
      expect(state.next.onComment).toHaveBeenCalledWith(
        jasmine.anything(),
        jasmine.anything(),
        jasmine.anything(),
        "Test Started Line Comment"
      );
    });

    it("does not report a token", () => {
      expect(state.next.onToken).not.toHaveBeenCalled();
    });

    it("reports eof once", () => {
      expect(state.next.onEof).toHaveBeenCalledTimes(1);
    });

    it("reports eof with the next state", () => {
      expect(state.next.onEof).toHaveBeenCalledWith(
        "Test Next State",
        jasmine.anything(),
        jasmine.anything()
      );
    });

    it("reports eof with the line number", () => {
      expect(state.next.onEof).toHaveBeenCalledWith(
        jasmine.anything(),
        44,
        jasmine.anything()
      );
    });

    it("reports eof with the column number", () => {
      expect(state.next.onEof).toHaveBeenCalledWith(
        jasmine.anything(),
        jasmine.anything(),
        27
      );
    });

    it("reports a comment before reporting eof", () => {
      expect(state.next.onComment).toHaveBeenCalledBefore(state.next.onEof);
    });
  });

  describe("when a token has been started", () => {
    let state: TokenizerState<TestNextState>;

    beforeAll(() => {
      state = {
        line: 44,
        column: 27,
        current: {
          type: "token",
          content: "teststartedtoken",
          line: 20,
          column: 15,
        },
        next: {
          state: "Test Next State",
          onComment: jasmine.createSpy("onComment"),
          onToken: jasmine.createSpy("onToken"),
          onEof: jasmine.createSpy("onEof"),
        },
      };

      tokenizerEof(state);
    });

    it("does not report a comment", () => {
      expect(state.next.onComment).not.toHaveBeenCalled();
    });

    it("reports one token", () => {
      expect(state.next.onToken).toHaveBeenCalledTimes(1);
    });

    it("reports a token with the next state", () => {
      expect(state.next.onToken).toHaveBeenCalledWith(
        "Test Next State",
        jasmine.anything(),
        jasmine.anything(),
        jasmine.anything()
      );
    });

    it("reports a token with the line number", () => {
      expect(state.next.onToken).toHaveBeenCalledWith(
        jasmine.anything(),
        20,
        jasmine.anything(),
        jasmine.anything()
      );
    });

    it("reports a token with the column number", () => {
      expect(state.next.onToken).toHaveBeenCalledWith(
        jasmine.anything(),
        jasmine.anything(),
        15,
        jasmine.anything()
      );
    });

    it("reports the accumulated token", () => {
      expect(state.next.onToken).toHaveBeenCalledWith(
        jasmine.anything(),
        jasmine.anything(),
        jasmine.anything(),
        "teststartedtoken"
      );
    });

    it("reports eof once", () => {
      expect(state.next.onEof).toHaveBeenCalledTimes(1);
    });

    it("reports eof with the next state", () => {
      expect(state.next.onEof).toHaveBeenCalledWith(
        "Test Next State",
        jasmine.anything(),
        jasmine.anything()
      );
    });

    it("reports eof with the line number", () => {
      expect(state.next.onEof).toHaveBeenCalledWith(
        jasmine.anything(),
        44,
        jasmine.anything()
      );
    });

    it("reports eof with the column number", () => {
      expect(state.next.onEof).toHaveBeenCalledWith(
        jasmine.anything(),
        jasmine.anything(),
        27
      );
    });

    it("reports a token before reporting eof", () => {
      expect(state.next.onToken).toHaveBeenCalledBefore(state.next.onEof);
    });
  });
});

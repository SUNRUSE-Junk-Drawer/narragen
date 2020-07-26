import { TokenizerState } from "../tokenizer-state";
import { tokenizerCharacter } from ".";

describe("tokenizerCharacter", () => {
  type TestNextState = "Test Next State";

  describe("white space", () => {
    for (const character of [
      {
        character: " ",
        continuedComment: "Test Line Comment ",
      },
      {
        character: "\t",
        continuedComment: "Test Line Comment\t",
      },
      {
        character: "\r",
        continuedComment: "Test Line Comment\r",
      },
    ]) {
      describe(JSON.stringify(character), () => {
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

            tokenizerCharacter(state, character.character);
          });

          it("does not report a comment", () => {
            expect(state.next.onComment).not.toHaveBeenCalled();
          });

          it("does not report a token", () => {
            expect(state.next.onToken).not.toHaveBeenCalled();
          });

          it("does not report eof", () => {
            expect(state.next.onEof).not.toHaveBeenCalled();
          });

          it("does not update the current state", () => {
            expect(state.current).toEqual({ type: "betweenTokens" });
          });

          it("does not increment the line", () => {
            expect(state.line).toEqual(44);
          });

          it("increments the column", () => {
            expect(state.column).toEqual(28);
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
                content: "Test Line Comment",
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

            tokenizerCharacter(state, character.character);
          });

          it("does not report a comment", () => {
            expect(state.next.onComment).not.toHaveBeenCalled();
          });

          it("does not report a token", () => {
            expect(state.next.onToken).not.toHaveBeenCalled();
          });

          it("does not report eof", () => {
            expect(state.next.onEof).not.toHaveBeenCalled();
          });

          it("appends the character to the line comment", () => {
            expect(state.current).toEqual({
              type: "lineComment",
              content: character.continuedComment,
              line: 20,
              column: 15,
            });
          });

          it("does not increment the line", () => {
            expect(state.line).toEqual(44);
          });

          it("increments the column", () => {
            expect(state.column).toEqual(28);
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
                content: "teSTSTartEDtoKEN",
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

            tokenizerCharacter(state, character.character);
          });

          it("does not report a comment", () => {
            expect(state.next.onComment).not.toHaveBeenCalled();
          });

          it("reports one token", () => {
            expect(state.next.onToken).toHaveBeenCalledTimes(1);
          });

          it("reports with the next state", () => {
            expect(state.next.onToken).toHaveBeenCalledWith(
              "Test Next State",
              jasmine.anything(),
              jasmine.anything(),
              jasmine.anything()
            );
          });

          it("reports the line on which the token started", () => {
            expect(state.next.onToken).toHaveBeenCalledWith(
              jasmine.anything(),
              20,
              jasmine.anything(),
              jasmine.anything()
            );
          });

          it("reports the column on which the token started", () => {
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
              "teSTSTartEDtoKEN"
            );
          });

          it("does not report eof", () => {
            expect(state.next.onEof).not.toHaveBeenCalled();
          });

          it("resets the accumulated token to null", () => {
            expect(state.current).toEqual({ type: "betweenTokens" });
          });

          it("does not increment the line", () => {
            expect(state.line).toEqual(44);
          });

          it("increments the column", () => {
            expect(state.column).toEqual(28);
          });
        });
      });
    }

    describe("\\n", () => {
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

          tokenizerCharacter(state, "\n");
        });

        it("does not report a comment", () => {
          expect(state.next.onComment).not.toHaveBeenCalled();
        });

        it("does not report a token", () => {
          expect(state.next.onToken).not.toHaveBeenCalled();
        });

        it("does not report eof", () => {
          expect(state.next.onEof).not.toHaveBeenCalled();
        });

        it("does not update the current state", () => {
          expect(state.current).toEqual({ type: "betweenTokens" });
        });

        it("increments the line", () => {
          expect(state.line).toEqual(45);
        });

        it("resets the column", () => {
          expect(state.column).toEqual(1);
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
              content: "Test Line Comment",
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

          tokenizerCharacter(state, "\n");
        });

        it("reports one comment", () => {
          expect(state.next.onComment).toHaveBeenCalledTimes(1);
        });

        it("reports with the next state", () => {
          expect(state.next.onComment).toHaveBeenCalledWith(
            "Test Next State",
            jasmine.anything(),
            jasmine.anything(),
            jasmine.anything()
          );
        });

        it("reports the line on which the line comment started", () => {
          expect(state.next.onComment).toHaveBeenCalledWith(
            jasmine.anything(),
            20,
            jasmine.anything(),
            jasmine.anything()
          );
        });

        it("reports the column on which the line comment started", () => {
          expect(state.next.onComment).toHaveBeenCalledWith(
            jasmine.anything(),
            jasmine.anything(),
            15,
            jasmine.anything()
          );
        });

        it("reports the accumulated token", () => {
          expect(state.next.onComment).toHaveBeenCalledWith(
            jasmine.anything(),
            jasmine.anything(),
            jasmine.anything(),
            "Test Line Comment"
          );
        });

        it("does not report a token", () => {
          expect(state.next.onToken).not.toHaveBeenCalled();
        });

        it("does not report eof", () => {
          expect(state.next.onEof).not.toHaveBeenCalled();
        });

        it("resets the current state", () => {
          expect(state.current).toEqual({ type: "betweenTokens" });
        });

        it("increment the line", () => {
          expect(state.line).toEqual(45);
        });

        it("resets the column", () => {
          expect(state.column).toEqual(1);
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
              content: "teSTSTartEDtoKEN",
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

          tokenizerCharacter(state, "\n");
        });

        it("does not report a comment", () => {
          expect(state.next.onComment).not.toHaveBeenCalled();
        });

        it("reports one token", () => {
          expect(state.next.onToken).toHaveBeenCalledTimes(1);
        });

        it("reports with the next state", () => {
          expect(state.next.onToken).toHaveBeenCalledWith(
            "Test Next State",
            jasmine.anything(),
            jasmine.anything(),
            jasmine.anything()
          );
        });

        it("reports the line on which the token started", () => {
          expect(state.next.onToken).toHaveBeenCalledWith(
            jasmine.anything(),
            20,
            jasmine.anything(),
            jasmine.anything()
          );
        });

        it("reports the column on which the token started", () => {
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
            "teSTSTartEDtoKEN"
          );
        });

        it("does not report eof", () => {
          expect(state.next.onEof).not.toHaveBeenCalled();
        });

        it("resets the current state", () => {
          expect(state.current).toEqual({ type: "betweenTokens" });
        });

        it("increment the line", () => {
          expect(state.line).toEqual(45);
        });

        it("resets the column", () => {
          expect(state.column).toEqual(1);
        });
      });
    });
  });

  describe("non-white space", () => {
    describe("#", () => {
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

          tokenizerCharacter(state, "#");
        });

        it("does not report a comment", () => {
          expect(state.next.onComment).not.toHaveBeenCalled();
        });

        it("does not report a token", () => {
          expect(state.next.onToken).not.toHaveBeenCalled();
        });

        it("does not report eof", () => {
          expect(state.next.onEof).not.toHaveBeenCalled();
        });

        it("starts accumulating a new line comment", () => {
          expect(state.current).toEqual({
            type: "lineComment",
            column: 27,
            line: 44,
            content: "#",
          });
        });

        it("does not increment the line", () => {
          expect(state.line).toEqual(44);
        });

        it("increments the column", () => {
          expect(state.column).toEqual(28);
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
              content: "Test Line Comment",
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

          tokenizerCharacter(state, "#");
        });

        it("does not report a comment", () => {
          expect(state.next.onComment).not.toHaveBeenCalled();
        });

        it("does not report a token", () => {
          expect(state.next.onToken).not.toHaveBeenCalled();
        });

        it("does not report eof", () => {
          expect(state.next.onEof).not.toHaveBeenCalled();
        });

        it("appends the character to the line comment", () => {
          expect(state.current).toEqual({
            type: "lineComment",
            content: "Test Line Comment#",
            line: 20,
            column: 15,
          });
        });

        it("does not increment the line", () => {
          expect(state.line).toEqual(44);
        });

        it("increments the column", () => {
          expect(state.column).toEqual(28);
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
              content: "teSTSTartEDtoKEN",
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

          tokenizerCharacter(state, "#");
        });

        it("does not report a comment", () => {
          expect(state.next.onComment).not.toHaveBeenCalled();
        });

        it("reports one token", () => {
          expect(state.next.onToken).toHaveBeenCalledTimes(1);
        });

        it("reports with the next state", () => {
          expect(state.next.onToken).toHaveBeenCalledWith(
            "Test Next State",
            jasmine.anything(),
            jasmine.anything(),
            jasmine.anything()
          );
        });

        it("reports the line on which the token started", () => {
          expect(state.next.onToken).toHaveBeenCalledWith(
            jasmine.anything(),
            20,
            jasmine.anything(),
            jasmine.anything()
          );
        });

        it("reports the column on which the token started", () => {
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
            "teSTSTartEDtoKEN"
          );
        });

        it("does not report eof", () => {
          expect(state.next.onEof).not.toHaveBeenCalled();
        });

        it("starts accumulating a new line comment", () => {
          expect(state.current).toEqual({
            type: "lineComment",
            column: 27,
            line: 44,
            content: "#",
          });
        });

        it("does not increment the line", () => {
          expect(state.line).toEqual(44);
        });

        it("increments the column", () => {
          expect(state.column).toEqual(28);
        });
      });
    });

    for (const character of [
      {
        character: "e",
        continuedToken: "teSTSTartEDtoKENe",
        continuedComment: "Test Line Commente",
      },
      {
        character: "E",
        continuedToken: "teSTSTartEDtoKENE",
        continuedComment: "Test Line CommentE",
      },
      {
        character: "-",
        continuedToken: "teSTSTartEDtoKEN-",
        continuedComment: "Test Line Comment-",
      },
      {
        character: "_",
        continuedToken: "teSTSTartEDtoKEN_",
        continuedComment: "Test Line Comment_",
      },
      {
        character: "5",
        continuedToken: "teSTSTartEDtoKEN5",
        continuedComment: "Test Line Comment5",
      },
      {
        character: "0",
        continuedToken: "teSTSTartEDtoKEN0",
        continuedComment: "Test Line Comment0",
      },
    ]) {
      describe(character.character, () => {
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

            tokenizerCharacter(state, character.character);
          });

          it("does not report a comment", () => {
            expect(state.next.onComment).not.toHaveBeenCalled();
          });

          it("does not report a token", () => {
            expect(state.next.onToken).not.toHaveBeenCalled();
          });

          it("does not report eof", () => {
            expect(state.next.onEof).not.toHaveBeenCalled();
          });

          it("starts accumulating a new token", () => {
            expect(state.current).toEqual({
              type: "token",
              column: 27,
              line: 44,
              content: character.character,
            });
          });

          it("does not increment the line", () => {
            expect(state.line).toEqual(44);
          });

          it("increments the column", () => {
            expect(state.column).toEqual(28);
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
                content: "Test Line Comment",
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

            tokenizerCharacter(state, character.character);
          });

          it("does not report a comment", () => {
            expect(state.next.onComment).not.toHaveBeenCalled();
          });

          it("does not report a token", () => {
            expect(state.next.onToken).not.toHaveBeenCalled();
          });

          it("does not report eof", () => {
            expect(state.next.onEof).not.toHaveBeenCalled();
          });

          it("appends the character to the line comment", () => {
            expect(state.current).toEqual({
              type: "lineComment",
              content: character.continuedComment,
              line: 20,
              column: 15,
            });
          });

          it("does not increment the line", () => {
            expect(state.line).toEqual(44);
          });

          it("increments the column", () => {
            expect(state.column).toEqual(28);
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
                content: "teSTSTartEDtoKEN",
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

            tokenizerCharacter(state, character.character);
          });

          it("does not report a comment", () => {
            expect(state.next.onComment).not.toHaveBeenCalled();
          });

          it("does not report a token", () => {
            expect(state.next.onToken).not.toHaveBeenCalled();
          });

          it("does not report eof", () => {
            expect(state.next.onEof).not.toHaveBeenCalled();
          });

          it("appends the character to the appended token", () => {
            expect(state.current).toEqual({
              type: "token",
              line: 20,
              column: 15,
              content: character.continuedToken,
            });
          });

          it("does not increment the line", () => {
            expect(state.line).toEqual(44);
          });

          it("increments the column", () => {
            expect(state.column).toEqual(28);
          });
        });
      });
    }
  });
});

import { StatementParserCurrentState } from "../statement-parser-current-state";
import { StatementParserState } from "../statement-parser-state";
import { statementParserToken } from ".";

describe("statementParserToken", () => {
  type NextState = "Test Next State";
  const nextState: NextState = "Test Next State";
  const line = 37;
  const column = 148;
  const name = "testname";

  const when = (
    description: string,
    current: StatementParserCurrentState,
    onGlobal: (state: () => StatementParserState<NextState>) => void,
    onAttribute: (state: () => StatementParserState<NextState>) => void,
    onRule: (state: () => StatementParserState<NextState>) => void,
    onWhen: (state: () => StatementParserState<NextState>) => void,
    onIs: (state: () => StatementParserState<NextState>) => void,
    onName: (state: () => StatementParserState<NextState>) => void
  ): void => {
    describe(description, () => {
      const given = (
        token: string,
        assertionCallback: (
          state: () => StatementParserState<NextState>
        ) => void
      ) => {
        describe(token, () => {
          let state: undefined | StatementParserState<NextState>;
          beforeAll(() => {
            state = {
              current: JSON.parse(JSON.stringify(current)),
              next: {
                state: nextState,
                onGlobal: jasmine.createSpy("onGlobal"),
                onGlobalInitializer: jasmine.createSpy("onGlobalInitializer"),
                onAttribute: jasmine.createSpy("onAttribute"),
                onRule: jasmine.createSpy("onRule"),
                onRuleLocal: jasmine.createSpy("onRuleLocal"),
                onRuleCondition: jasmine.createSpy("onRuleCondition"),
                onRuleConditionWithAttribute: jasmine.createSpy(
                  "onRuleConditionWithAttribute"
                ),
                onSyntaxError: jasmine.createSpy("onSyntaxError"),
                onEof: jasmine.createSpy("onEof"),
              },
            };

            statementParserToken(state, line, column, token);
          });

          assertionCallback(() => state as StatementParserState<NextState>);

          it("does not report eof", () => {
            expect(
              (state as StatementParserState<NextState>).next.onEof
            ).not.toHaveBeenCalled();
          });
        });
      };

      given("global", onGlobal);
      given("attribute", onAttribute);
      given("rule", onRule);
      given("when", onWhen);
      given("is", onIs);
      given(name, onName);
    });
  };

  when(
    "initial",
    { type: "initial" },
    (state) => {
      it("expects a name for the global", () => {
        expect(state().current).toEqual({
          type: "globalExpectingName",
          globalLine: line,
          globalColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects a name for the attribute", () => {
        expect(state().current).toEqual({
          type: "attributeExpectingName",
          attributeLine: line,
          attributeColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects a name for the rule", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingName",
          ruleLine: line,
          ruleColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedStatement",
          tokens: [
            {
              line,
              column,
              content: "when",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedStatement",
          tokens: [
            {
              line,
              column,
              content: "is",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedStatement",
          tokens: [
            {
              line,
              column,
              content: name,
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    }
  );

  when(
    "expecting the name of a global",
    {
      type: "globalExpectingName",
      globalLine: 20,
      globalColumn: 15,
    },
    (state) => {
      it("expects a name for the global", () => {
        expect(state().current).toEqual({
          type: "globalExpectingName",
          globalLine: line,
          globalColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "global",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the attribute", () => {
        expect(state().current).toEqual({
          type: "attributeExpectingName",
          attributeLine: line,
          attributeColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "global",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the rule", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingName",
          ruleLine: line,
          ruleColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "global",
            },
          ]
        );
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedStatement",
          tokens: [
            {
              line,
              column,
              content: "when",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "global",
            },
          ]
        );
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedStatement",
          tokens: [
            {
              line,
              column,
              content: "is",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "global",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects an attribute for the first initializer", () => {
        expect(state().current).toEqual({
          type: "globalExpectingAttribute",
          name,
        });
      });

      it("reports one global", () => {
        expect(state().next.onGlobal).toHaveBeenCalledTimes(1);
      });

      it("reports the expected global", () => {
        expect(state().next.onGlobal).toHaveBeenCalledWith(
          "Test Next State",
          20,
          15,
          line,
          column,
          name
        );
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    }
  );

  when(
    "expecting the attribute of a global's initializer",
    {
      type: "globalExpectingAttribute",
      name: "Test Name",
    },
    (state) => {
      it("expects a name for the global", () => {
        expect(state().current).toEqual({
          type: "globalExpectingName",
          globalLine: line,
          globalColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects a name for the attribute", () => {
        expect(state().current).toEqual({
          type: "attributeExpectingName",
          attributeLine: line,
          attributeColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects a name for the rule", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingName",
          ruleLine: line,
          ruleColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedStatement",
          tokens: [
            {
              line,
              column,
              content: "when",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedStatement",
          tokens: [
            {
              line,
              column,
              content: "is",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects a value for the global initializer", () => {
        expect(state().current).toEqual({
          type: "globalExpectingInitializer",
          name: "Test Name",
          attributeLine: line,
          attributeColumn: column,
          attribute: name,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    }
  );

  when(
    "expecting the value of a global's initializer",
    {
      type: "globalExpectingInitializer",
      name: "Test Name",
      attributeLine: 20,
      attributeColumn: 15,
      attribute: "Test Attribute",
    },
    (state) => {
      it("expects a name for the global", () => {
        expect(state().current).toEqual({
          type: "globalExpectingName",
          globalLine: line,
          globalColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedGlobal",
          [
            {
              line: 20,
              column: 15,
              content: "Test Attribute",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the attribute", () => {
        expect(state().current).toEqual({
          type: "attributeExpectingName",
          attributeLine: line,
          attributeColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedGlobal",
          [
            {
              line: 20,
              column: 15,
              content: "Test Attribute",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the rule", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingName",
          ruleLine: line,
          ruleColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedGlobal",
          [
            {
              line: 20,
              column: 15,
              content: "Test Attribute",
            },
          ]
        );
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedStatement",
          tokens: [
            {
              line,
              column,
              content: "when",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedGlobal",
          [
            {
              line: 20,
              column: 15,
              content: "Test Attribute",
            },
          ]
        );
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedStatement",
          tokens: [
            {
              line,
              column,
              content: "is",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedGlobal",
          [
            {
              line: 20,
              column: 15,
              content: "Test Attribute",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects an attribute for the next initializer", () => {
        expect(state().current).toEqual({
          type: "globalExpectingAttribute",
          name: "Test Name",
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("reports one global initializer", () => {
        expect(state().next.onGlobalInitializer).toHaveBeenCalledTimes(1);
      });

      it("reports the expected global initializer", () => {
        expect(state().next.onGlobalInitializer).toHaveBeenCalledWith(
          "Test Next State",
          "Test Name",
          20,
          15,
          "Test Attribute",
          line,
          column,
          name
        );
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    }
  );

  when(
    "expecting the name of an attribute",
    {
      type: "attributeExpectingName",
      attributeLine: 20,
      attributeColumn: 15,
    },
    (state) => {
      it("expects a name for the global", () => {
        expect(state().current).toEqual({
          type: "globalExpectingName",
          globalLine: line,
          globalColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "attribute",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the attribute", () => {
        expect(state().current).toEqual({
          type: "attributeExpectingName",
          attributeLine: line,
          attributeColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "attribute",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the rule", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingName",
          ruleLine: line,
          ruleColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "attribute",
            },
          ]
        );
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedStatement",
          tokens: [
            {
              line,
              column,
              content: "when",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "attribute",
            },
          ]
        );
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedStatement",
          tokens: [
            {
              line,
              column,
              content: "is",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "attribute",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects an initializer for the attribute", () => {
        expect(state().current).toEqual({
          type: "attributeExpectingInitializer",
          attributeLine: 20,
          attributeColumn: 15,
          nameLine: line,
          nameColumn: column,
          name,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    }
  );

  when(
    "expecting the initializer of an attribute",
    {
      type: "attributeExpectingInitializer",
      attributeLine: 20,
      attributeColumn: 15,
      nameLine: 37,
      nameColumn: 6,
      name: "Test Name",
    },
    (state) => {
      it("expects a name for the global", () => {
        expect(state().current).toEqual({
          type: "globalExpectingName",
          globalLine: line,
          globalColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "attribute",
            },
            {
              line: 37,
              column: 6,
              content: "Test Name",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the attribute", () => {
        expect(state().current).toEqual({
          type: "attributeExpectingName",
          attributeLine: line,
          attributeColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "attribute",
            },
            {
              line: 37,
              column: 6,
              content: "Test Name",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the rule", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingName",
          ruleLine: line,
          ruleColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "attribute",
            },
            {
              line: 37,
              column: 6,
              content: "Test Name",
            },
          ]
        );
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedStatement",
          tokens: [
            {
              line,
              column,
              content: "when",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "attribute",
            },
            {
              line: 37,
              column: 6,
              content: "Test Name",
            },
          ]
        );
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedStatement",
          tokens: [
            {
              line,
              column,
              content: "is",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "attribute",
            },
            {
              line: 37,
              column: 6,
              content: "Test Name",
            },
          ]
        );
      });
    },
    (state) => {
      it("resets to the initial state", () => {
        expect(state().current).toEqual({
          type: "initial",
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("reports one attribute", () => {
        expect(state().next.onAttribute).toHaveBeenCalledTimes(1);
      });

      it("reports the expected attribute", () => {
        expect(state().next.onAttribute).toHaveBeenCalledWith(
          "Test Next State",
          20,
          15,
          37,
          6,
          "Test Name",
          line,
          column,
          name
        );
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    }
  );

  when(
    "expecting the name of a rule",
    {
      type: "ruleExpectingName",
      ruleLine: 20,
      ruleColumn: 15,
    },
    (state) => {
      it("expects a name for the global", () => {
        expect(state().current).toEqual({
          type: "globalExpectingName",
          globalLine: line,
          globalColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "rule",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the attribute", () => {
        expect(state().current).toEqual({
          type: "attributeExpectingName",
          attributeLine: line,
          attributeColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "rule",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the rule", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingName",
          ruleLine: line,
          ruleColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "rule",
            },
          ]
        );
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedStatement",
          tokens: [
            {
              line,
              column,
              content: "when",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "rule",
            },
          ]
        );
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedStatement",
          tokens: [
            {
              line,
              column,
              content: "is",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedName",
          [
            {
              line: 20,
              column: 15,
              content: "rule",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the first local", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingLocal",
          name,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("reports one rule", () => {
        expect(state().next.onRule).toHaveBeenCalledTimes(1);
      });

      it("reports the expected rule", () => {
        expect(state().next.onRule).toHaveBeenCalledWith(
          "Test Next State",
          20,
          15,
          line,
          column,
          name
        );
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    }
  );

  when(
    "expecting the name of a rule's local",
    {
      type: "ruleExpectingLocal",
      name: "Test Name",
    },
    (state) => {
      it("expects a name for the global", () => {
        expect(state().current).toEqual({
          type: "globalExpectingName",
          globalLine: line,
          globalColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects a name for the attribute", () => {
        expect(state().current).toEqual({
          type: "attributeExpectingName",
          attributeLine: line,
          attributeColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects a name for the rule", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingName",
          ruleLine: line,
          ruleColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects the first entity of the condition", () => {
        expect(state().current).toEqual({
          type: "ruleConditionExpectingEntityA",
          name: "Test Name",
          whenLine: line,
          whenColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedStatement",
          tokens: [
            {
              line,
              column,
              content: "is",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects a name for the next local", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingLocal",
          name: "Test Name",
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("reports one rule local", () => {
        expect(state().next.onRuleLocal).toHaveBeenCalledTimes(1);
      });

      it("reports the expected rule local", () => {
        expect(state().next.onRuleLocal).toHaveBeenCalledWith(
          "Test Next State",
          "Test Name",
          line,
          column,
          name
        );
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    }
  );

  when(
    "expecting a rule condition's first entity",
    {
      type: "ruleConditionExpectingEntityA",
      name: "Test Name",
      whenLine: 4,
      whenColumn: 19,
    },
    (state) => {
      it("expects a name for the global", () => {
        expect(state().current).toEqual({
          type: "globalExpectingName",
          globalLine: line,
          globalColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects a name for the attribute", () => {
        expect(state().current).toEqual({
          type: "attributeExpectingName",
          attributeLine: line,
          attributeColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects a name for the rule", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingName",
          ruleLine: line,
          ruleColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedLocal",
          tokens: [
            {
              line,
              column,
              content: "when",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedLocal",
          tokens: [
            {
              line,
              column,
              content: "is",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects an attribute for the named local", () => {
        expect(state().current).toEqual({
          type: "ruleConditionExpectingAttributeA",
          name: "Test Name",
          entityALine: line,
          entityAColumn: column,
          entityA: name,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    }
  );

  when(
    "expecting a rule condition's first attribute",
    {
      type: "ruleConditionExpectingAttributeA",
      name: "Test Name",
      entityALine: 20,
      entityAColumn: 15,
      entityA: "Test Entity A",
    },
    (state) => {
      it("expects a name for the global", () => {
        expect(state().current).toEqual({
          type: "globalExpectingName",
          globalLine: line,
          globalColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedAttribute",
          [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the attribute", () => {
        expect(state().current).toEqual({
          type: "attributeExpectingName",
          attributeLine: line,
          attributeColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedAttribute",
          [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the rule", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingName",
          ruleLine: line,
          ruleColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedAttribute",
          [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
          ]
        );
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedAttribute",
          tokens: [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line,
              column,
              content: "when",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedAttribute",
          tokens: [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line,
              column,
              content: "is",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it('expects "is"', () => {
        expect(state().current).toEqual({
          type: "ruleConditionExpectingIs",
          name: "Test Name",
          entityALine: 20,
          entityAColumn: 15,
          entityA: "Test Entity A",
          attributeALine: line,
          attributeAColumn: column,
          attributeA: name,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    }
  );

  when(
    'expecting the rule condition\'s "is"',
    {
      type: "ruleConditionExpectingIs",
      name: "Test Name",
      entityALine: 20,
      entityAColumn: 15,
      entityA: "Test Entity A",
      attributeALine: 36,
      attributeAColumn: 7,
      attributeA: "Test Attribute A",
    },
    (state) => {
      it("expects a name for the global", () => {
        expect(state().current).toEqual({
          type: "globalExpectingName",
          globalLine: line,
          globalColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedIs",
          [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the attribute", () => {
        expect(state().current).toEqual({
          type: "attributeExpectingName",
          attributeLine: line,
          attributeColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedIs",
          [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the rule", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingName",
          ruleLine: line,
          ruleColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedIs",
          [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
          ]
        );
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedIs",
          tokens: [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
            {
              line,
              column,
              content: "when",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects a global or local to compare to", () => {
        expect(state().current).toEqual({
          type: "ruleConditionExpectingEntityB",
          name: "Test Name",
          entityALine: 20,
          entityAColumn: 15,
          entityA: "Test Entity A",
          attributeALine: 36,
          attributeAColumn: 7,
          attributeA: "Test Attribute A",
          isLine: line,
          isColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedIs",
          tokens: [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
            {
              line,
              column,
              content: name,
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    }
  );

  when(
    "expecting a rule condition's second entity",
    {
      type: "ruleConditionExpectingEntityB",
      name: "Test Name",
      entityALine: 20,
      entityAColumn: 15,
      entityA: "Test Entity A",
      attributeALine: 36,
      attributeAColumn: 7,
      attributeA: "Test Attribute A",
      isLine: 43,
      isColumn: 72,
    },
    (state) => {
      it("expects a name for the global", () => {
        expect(state().current).toEqual({
          type: "globalExpectingName",
          globalLine: line,
          globalColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedAttribute",
          [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
            {
              line: 43,
              column: 72,
              content: "is",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the attribute", () => {
        expect(state().current).toEqual({
          type: "attributeExpectingName",
          attributeLine: line,
          attributeColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedAttribute",
          [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
            {
              line: 43,
              column: 72,
              content: "is",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the rule", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingName",
          ruleLine: line,
          ruleColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedAttribute",
          [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
            {
              line: 43,
              column: 72,
              content: "is",
            },
          ]
        );
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedAttribute",
          tokens: [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
            {
              line: 43,
              column: 72,
              content: "is",
            },
            {
              line,
              column,
              content: "when",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedAttribute",
          tokens: [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
            {
              line: 43,
              column: 72,
              content: "is",
            },
            {
              line,
              column,
              content: "is",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects the second entity's attribute, or the start of the next condition", () => {
        expect(state().current).toEqual({
          type: "ruleConditionExpectingAttributeBOrEntityC",
          name: "Test Name",
          entityALine: 20,
          entityAColumn: 15,
          entityA: "Test Entity A",
          attributeALine: 36,
          attributeAColumn: 7,
          attributeA: "Test Attribute A",
          isLine: 43,
          isColumn: 72,
          entityBLine: line,
          entityBColumn: column,
          entityB: name,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    }
  );

  when(
    "expecting a rule condition's second attribute or following entity",
    {
      type: "ruleConditionExpectingAttributeBOrEntityC",
      name: "Test Name",
      entityALine: 20,
      entityAColumn: 15,
      entityA: "Test Entity A",
      attributeALine: 36,
      attributeAColumn: 7,
      attributeA: "Test Attribute A",
      isLine: 43,
      isColumn: 72,
      entityBLine: 48,
      entityBColumn: 3,
      entityB: "Test Entity B",
    },
    (state) => {
      it("expects a name for the global", () => {
        expect(state().current).toEqual({
          type: "globalExpectingName",
          globalLine: line,
          globalColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("reports one rule condition", () => {
        expect(state().next.onRuleCondition).toHaveBeenCalledTimes(1);
      });

      it("reports the expected rule condition", () => {
        expect(state().next.onRuleCondition).toHaveBeenCalledWith(
          "Test Next State",
          "Test Name",
          20,
          15,
          "Test Entity A",
          36,
          7,
          "Test Attribute A",
          43,
          72,
          48,
          3,
          "Test Entity B"
        );
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects a name for the attribute", () => {
        expect(state().current).toEqual({
          type: "attributeExpectingName",
          attributeLine: line,
          attributeColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("reports one rule condition", () => {
        expect(state().next.onRuleCondition).toHaveBeenCalledTimes(1);
      });

      it("reports the expected rule condition", () => {
        expect(state().next.onRuleCondition).toHaveBeenCalledWith(
          "Test Next State",
          "Test Name",
          20,
          15,
          "Test Entity A",
          36,
          7,
          "Test Attribute A",
          43,
          72,
          48,
          3,
          "Test Entity B"
        );
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects a name for the rule", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingName",
          ruleLine: line,
          ruleColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("reports one rule condition", () => {
        expect(state().next.onRuleCondition).toHaveBeenCalledTimes(1);
      });

      it("reports the expected rule condition", () => {
        expect(state().next.onRuleCondition).toHaveBeenCalledWith(
          "Test Next State",
          "Test Name",
          20,
          15,
          "Test Entity A",
          36,
          7,
          "Test Attribute A",
          43,
          72,
          48,
          3,
          "Test Entity B"
        );
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedAttributeOrEntity",
          tokens: [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
            {
              line: 43,
              column: 72,
              content: "is",
            },
            {
              line: 48,
              column: 3,
              content: "Test Entity B",
            },
            {
              line,
              column,
              content: "when",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedAttributeOrEntity",
          tokens: [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
            {
              line: 43,
              column: 72,
              content: "is",
            },
            {
              line: 48,
              column: 3,
              content: "Test Entity B",
            },
            {
              line,
              column,
              content: "is",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects the second entity's attribute, or the start of the next condition", () => {
        expect(state().current).toEqual({
          type: "ruleConditionExpectingEntityCOrAttributeC",
          name: "Test Name",
          entityALine: 20,
          entityAColumn: 15,
          entityA: "Test Entity A",
          attributeALine: 36,
          attributeAColumn: 7,
          attributeA: "Test Attribute A",
          isLine: 43,
          isColumn: 72,
          entityBLine: 48,
          entityBColumn: 3,
          entityB: "Test Entity B",
          attributeBOrEntityCLine: line,
          attributeBOrEntityCColumn: column,
          attributeBOrEntityC: name,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    }
  );

  when(
    "expecting a rule condition's following entity or attribute",
    {
      type: "ruleConditionExpectingEntityCOrAttributeC",
      name: "Test Name",
      entityALine: 20,
      entityAColumn: 15,
      entityA: "Test Entity A",
      attributeALine: 36,
      attributeAColumn: 7,
      attributeA: "Test Attribute A",
      isLine: 43,
      isColumn: 72,
      entityBLine: 48,
      entityBColumn: 3,
      entityB: "Test Entity B",
      attributeBOrEntityCLine: 56,
      attributeBOrEntityCColumn: 11,
      attributeBOrEntityC: "Test Attribute B Or Entity C",
    },
    (state) => {
      it("expects a name for the global", () => {
        expect(state().current).toEqual({
          type: "globalExpectingName",
          globalLine: line,
          globalColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("reports one rule condition with an attribute", () => {
        expect(state().next.onRuleConditionWithAttribute).toHaveBeenCalledTimes(
          1
        );
      });

      it("reports the expected rule condition with an attribute", () => {
        expect(state().next.onRuleConditionWithAttribute).toHaveBeenCalledWith(
          "Test Next State",
          "Test Name",
          20,
          15,
          "Test Entity A",
          36,
          7,
          "Test Attribute A",
          43,
          72,
          48,
          3,
          "Test Entity B",
          56,
          11,
          "Test Attribute B Or Entity C"
        );
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects a name for the attribute", () => {
        expect(state().current).toEqual({
          type: "attributeExpectingName",
          attributeLine: line,
          attributeColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("reports one rule condition with an attribute", () => {
        expect(state().next.onRuleConditionWithAttribute).toHaveBeenCalledTimes(
          1
        );
      });

      it("reports the expected rule condition with an attribute", () => {
        expect(state().next.onRuleConditionWithAttribute).toHaveBeenCalledWith(
          "Test Next State",
          "Test Name",
          20,
          15,
          "Test Entity A",
          36,
          7,
          "Test Attribute A",
          43,
          72,
          48,
          3,
          "Test Entity B",
          56,
          11,
          "Test Attribute B Or Entity C"
        );
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("expects a name for the rule", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingName",
          ruleLine: line,
          ruleColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("reports one rule condition with an attribute", () => {
        expect(state().next.onRuleConditionWithAttribute).toHaveBeenCalledTimes(
          1
        );
      });

      it("reports the expected rule condition with an attribute", () => {
        expect(state().next.onRuleConditionWithAttribute).toHaveBeenCalledWith(
          "Test Next State",
          "Test Name",
          20,
          15,
          "Test Entity A",
          36,
          7,
          "Test Attribute A",
          43,
          72,
          48,
          3,
          "Test Entity B",
          56,
          11,
          "Test Attribute B Or Entity C"
        );
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedAttributeOrEntity",
          tokens: [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
            {
              line: 43,
              column: 72,
              content: "is",
            },
            {
              line: 48,
              column: 3,
              content: "Test Entity B",
            },
            {
              line: 56,
              column: 11,
              content: "Test Attribute B Or Entity C",
            },
            {
              line,
              column,
              content: "when",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedAttributeOrEntity",
          tokens: [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
            {
              line: 43,
              column: 72,
              content: "is",
            },
            {
              line: 48,
              column: 3,
              content: "Test Entity B",
            },
            {
              line: 56,
              column: 11,
              content: "Test Attribute B Or Entity C",
            },
            {
              line,
              column,
              content: "is",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it('expects the following condition\'s attribute, or its "is"', () => {
        expect(state().current).toEqual({
          type: "ruleConditionExpectingAttributeCOrIs",
          name: "Test Name",
          entityALine: 20,
          entityAColumn: 15,
          entityA: "Test Entity A",
          attributeALine: 36,
          attributeAColumn: 7,
          attributeA: "Test Attribute A",
          isLine: 43,
          isColumn: 72,
          entityBLine: 48,
          entityBColumn: 3,
          entityB: "Test Entity B",
          attributeBOrEntityCLine: 56,
          attributeBOrEntityCColumn: 11,
          attributeBOrEntityC: "Test Attribute B Or Entity C",
          entityCOrAttributeCLine: line,
          entityCOrAttributeCColumn: column,
          entityCOrAttributeC: name,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    }
  );

  when(
    'expecting a rule condition\'s following attribute or "is"',
    {
      type: "ruleConditionExpectingAttributeCOrIs",
      name: "Test Name",
      entityALine: 20,
      entityAColumn: 15,
      entityA: "Test Entity A",
      attributeALine: 36,
      attributeAColumn: 7,
      attributeA: "Test Attribute A",
      isLine: 43,
      isColumn: 72,
      entityBLine: 48,
      entityBColumn: 3,
      entityB: "Test Entity B",
      attributeBOrEntityCLine: 56,
      attributeBOrEntityCColumn: 11,
      attributeBOrEntityC: "Test Attribute B Or Entity C",
      entityCOrAttributeCLine: 64,
      entityCOrAttributeCColumn: 24,
      entityCOrAttributeC: "Test Entity C Or Attribute C",
    },
    (state) => {
      it("expects a name for the global", () => {
        expect(state().current).toEqual({
          type: "globalExpectingName",
          globalLine: line,
          globalColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedAttributeOrIs",
          [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
            {
              line: 43,
              column: 72,
              content: "is",
            },
            {
              line: 48,
              column: 3,
              content: "Test Entity B",
            },
            {
              line: 56,
              column: 11,
              content: "Test Attribute B Or Entity C",
            },
            {
              line: 64,
              column: 24,
              content: "Test Entity C Or Attribute C",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the attribute", () => {
        expect(state().current).toEqual({
          type: "attributeExpectingName",
          attributeLine: line,
          attributeColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedAttributeOrIs",
          [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
            {
              line: 43,
              column: 72,
              content: "is",
            },
            {
              line: 48,
              column: 3,
              content: "Test Entity B",
            },
            {
              line: 56,
              column: 11,
              content: "Test Attribute B Or Entity C",
            },
            {
              line: 64,
              column: 24,
              content: "Test Entity C Or Attribute C",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the rule", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingName",
          ruleLine: line,
          ruleColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedAttributeOrIs",
          [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
            {
              line: 43,
              column: 72,
              content: "is",
            },
            {
              line: 48,
              column: 3,
              content: "Test Entity B",
            },
            {
              line: 56,
              column: 11,
              content: "Test Attribute B Or Entity C",
            },
            {
              line: 64,
              column: 24,
              content: "Test Entity C Or Attribute C",
            },
          ]
        );
      });
    },
    (state) => {
      it("waits for the next statement", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedAttributeOrIs",
          tokens: [
            {
              line: 20,
              column: 15,
              content: "Test Entity A",
            },
            {
              line: 36,
              column: 7,
              content: "Test Attribute A",
            },
            {
              line: 43,
              column: 72,
              content: "is",
            },
            {
              line: 48,
              column: 3,
              content: "Test Entity B",
            },
            {
              line: 56,
              column: 11,
              content: "Test Attribute B Or Entity C",
            },
            {
              line: 64,
              column: 24,
              content: "Test Entity C Or Attribute C",
            },
            {
              line,
              column,
              content: "when",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("continues onto the next condition", () => {
        expect(state().current).toEqual({
          type: "ruleConditionExpectingEntityB",
          name: "Test Name",
          entityALine: 56,
          entityAColumn: 11,
          entityA: "Test Attribute B Or Entity C",
          attributeALine: 64,
          attributeAColumn: 24,
          attributeA: "Test Entity C Or Attribute C",
          isLine: line,
          isColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("reports one rule condition", () => {
        expect(state().next.onRuleCondition).toHaveBeenCalledTimes(1);
      });

      it("reports the expected rule condition", () => {
        expect(state().next.onRuleCondition).toHaveBeenCalledWith(
          "Test Next State",
          "Test Name",
          20,
          15,
          "Test Entity A",
          36,
          7,
          "Test Attribute A",
          43,
          72,
          48,
          3,
          "Test Entity B"
        );
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("continues onto the next condition", () => {
        expect(state().current).toEqual({
          type: "ruleConditionExpectingIs",
          name: "Test Name",
          entityALine: 64,
          entityAColumn: 24,
          entityA: "Test Entity C Or Attribute C",
          attributeALine: line,
          attributeAColumn: column,
          attributeA: name,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("reports one rule condition with an attribute", () => {
        expect(state().next.onRuleConditionWithAttribute).toHaveBeenCalledTimes(
          1
        );
      });

      it("reports the expected rule condition with an attribute", () => {
        expect(state().next.onRuleConditionWithAttribute).toHaveBeenCalledWith(
          "Test Next State",
          "Test Name",
          20,
          15,
          "Test Entity A",
          36,
          7,
          "Test Attribute A",
          43,
          72,
          48,
          3,
          "Test Entity B",
          56,
          11,
          "Test Attribute B Or Entity C"
        );
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    }
  );

  when(
    "skipping until the next statement",
    {
      type: "skippingUntilNextStatement",
      syntaxErrorType: "expectedGlobal",
      tokens: [
        {
          line: 20,
          column: 15,
          content: "Test Content A",
        },
        {
          line: 23,
          column: 17,
          content: "Test Content B",
        },
        {
          line: 27,
          column: 5,
          content: "Test Content C",
        },
      ],
    },
    (state) => {
      it("expects a name for the global", () => {
        expect(state().current).toEqual({
          type: "globalExpectingName",
          globalLine: line,
          globalColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedGlobal",
          [
            {
              line: 20,
              column: 15,
              content: "Test Content A",
            },
            {
              line: 23,
              column: 17,
              content: "Test Content B",
            },
            {
              line: 27,
              column: 5,
              content: "Test Content C",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the attribute", () => {
        expect(state().current).toEqual({
          type: "attributeExpectingName",
          attributeLine: line,
          attributeColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedGlobal",
          [
            {
              line: 20,
              column: 15,
              content: "Test Content A",
            },
            {
              line: 23,
              column: 17,
              content: "Test Content B",
            },
            {
              line: 27,
              column: 5,
              content: "Test Content C",
            },
          ]
        );
      });
    },
    (state) => {
      it("expects a name for the rule", () => {
        expect(state().current).toEqual({
          type: "ruleExpectingName",
          ruleLine: line,
          ruleColumn: column,
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global's initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("reports one syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledTimes(1);
      });

      it("reports the expected syntax error", () => {
        expect(state().next.onSyntaxError).toHaveBeenCalledWith(
          "Test Next State",
          "expectedGlobal",
          [
            {
              line: 20,
              column: 15,
              content: "Test Content A",
            },
            {
              line: 23,
              column: 17,
              content: "Test Content B",
            },
            {
              line: 27,
              column: 5,
              content: "Test Content C",
            },
          ]
        );
      });
    },
    (state) => {
      it("appends the token", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedGlobal",
          tokens: [
            {
              line: 20,
              column: 15,
              content: "Test Content A",
            },
            {
              line: 23,
              column: 17,
              content: "Test Content B",
            },
            {
              line: 27,
              column: 5,
              content: "Test Content C",
            },
            {
              line,
              column,
              content: "when",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("appends the token", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedGlobal",
          tokens: [
            {
              line: 20,
              column: 15,
              content: "Test Content A",
            },
            {
              line: 23,
              column: 17,
              content: "Test Content B",
            },
            {
              line: 27,
              column: 5,
              content: "Test Content C",
            },
            {
              line,
              column,
              content: "is",
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    },
    (state) => {
      it("appends the token", () => {
        expect(state().current).toEqual({
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedGlobal",
          tokens: [
            {
              line: 20,
              column: 15,
              content: "Test Content A",
            },
            {
              line: 23,
              column: 17,
              content: "Test Content B",
            },
            {
              line: 27,
              column: 5,
              content: "Test Content C",
            },
            {
              line,
              column,
              content: name,
            },
          ],
        });
      });

      it("does not report a global", () => {
        expect(state().next.onGlobal).not.toHaveBeenCalled();
      });

      it("does not report a global initializer", () => {
        expect(state().next.onGlobalInitializer).not.toHaveBeenCalled();
      });

      it("does not report an attribute", () => {
        expect(state().next.onAttribute).not.toHaveBeenCalled();
      });

      it("does not report a rule", () => {
        expect(state().next.onRule).not.toHaveBeenCalled();
      });

      it("does not report a rule local", () => {
        expect(state().next.onRuleLocal).not.toHaveBeenCalled();
      });

      it("does not report a rule condition", () => {
        expect(state().next.onRuleCondition).not.toHaveBeenCalled();
      });

      it("does not report a rule condition with an attribute", () => {
        expect(
          state().next.onRuleConditionWithAttribute
        ).not.toHaveBeenCalled();
      });

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    }
  );
});

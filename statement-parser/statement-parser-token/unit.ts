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

      it("reports the expected global initializer", () => {
        expect(state().next.onRuleLocal).toHaveBeenCalledWith(
          "Test Next State",
          "Test Name",
          line,
          column,
          name
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

      it("does not report a syntax error", () => {
        expect(state().next.onSyntaxError).not.toHaveBeenCalled();
      });
    }
  );
});

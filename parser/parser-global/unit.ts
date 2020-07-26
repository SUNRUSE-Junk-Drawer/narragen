import { ParserCurrentState } from "../parser-current-state";
import { ParserState } from "../parser-state";
import { parserGlobal } from ".";

describe("parserGlobal", () => {
  type NextState = "Test Next State";
  const nextState: NextState = "Test Next State";
  const line = 37;
  const column = 148;

  const when = (
    description: string,
    current: ParserCurrentState,
    assertionCallback: (state: () => ParserState<NextState>) => void
  ): void => {
    describe(description, () => {
      let state: undefined | ParserState<NextState>;
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

        parserGlobal(state, line, column);
      });

      assertionCallback(() => state as ParserState<NextState>);

      it("does not report eof", () => {
        expect(
          (state as ParserState<NextState>).next.onEof
        ).not.toHaveBeenCalled();
      });
    });
  };

  when("initial", { type: "initial" }, (state) => {
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
      expect(state().next.onRuleConditionWithAttribute).not.toHaveBeenCalled();
    });

    it("does not report a syntax error", () => {
      expect(state().next.onSyntaxError).not.toHaveBeenCalled();
    });
  });

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
    }
  );
});

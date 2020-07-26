import { ParserState } from "../parser-state";

export const parserSet = <TNextState>(
  state: ParserState<TNextState>,
  line: number,
  column: number
): void => {
  switch (state.current.type) {
    case "initial":
      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedStatement",
        tokens: [
          {
            line,
            column,
            content: "set",
          },
        ],
      };
      break;

    case "globalExpectingName":
      state.next.onSyntaxError(state.next.state, "expectedName", [
        {
          line: state.current.globalLine,
          column: state.current.globalColumn,
          content: "global",
        },
      ]);

      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedStatement",
        tokens: [
          {
            line,
            column,
            content: "set",
          },
        ],
      };
      break;

    case "globalExpectingAttribute":
      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedStatement",
        tokens: [
          {
            line,
            column,
            content: "set",
          },
        ],
      };
      break;

    case "globalExpectingInitializer":
      state.next.onSyntaxError(state.next.state, "expectedGlobal", [
        {
          line: state.current.attributeLine,
          column: state.current.attributeColumn,
          content: state.current.attribute,
        },
      ]);

      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedStatement",
        tokens: [
          {
            line,
            column,
            content: "set",
          },
        ],
      };
      break;

    case "attributeExpectingName":
      state.next.onSyntaxError(state.next.state, "expectedName", [
        {
          line: state.current.attributeLine,
          column: state.current.attributeColumn,
          content: "attribute",
        },
      ]);

      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedStatement",
        tokens: [
          {
            line,
            column,
            content: "set",
          },
        ],
      };
      break;

    case "attributeExpectingInitializer":
      state.next.onSyntaxError(state.next.state, "expectedName", [
        {
          line: state.current.attributeLine,
          column: state.current.attributeColumn,
          content: "attribute",
        },
        {
          line: state.current.nameLine,
          column: state.current.nameColumn,
          content: state.current.name,
        },
      ]);

      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedStatement",
        tokens: [
          {
            line,
            column,
            content: "set",
          },
        ],
      };
      break;

    case "ruleExpectingName":
      state.next.onSyntaxError(state.next.state, "expectedName", [
        {
          line: state.current.ruleLine,
          column: state.current.ruleColumn,
          content: "rule",
        },
      ]);

      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedStatement",
        tokens: [
          {
            line,
            column,
            content: "set",
          },
        ],
      };
      break;

    case "ruleExpectingLocal":
      state.current = {
        type: "ruleSetExpectingEntityA",
        name: state.current.name,
        setLine: line,
        setColumn: column,
      };
      break;

    case "ruleConditionExpectingEntityA":
      // todo: blame the "when" instead and carry on

      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedLocal",
        tokens: [
          {
            line,
            column,
            content: "set",
          },
        ],
      };
      break;

    case "ruleConditionExpectingAttributeA":
      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedAttribute",
        tokens: [
          {
            line: state.current.entityALine,
            column: state.current.entityAColumn,
            content: state.current.entityA,
          },
          {
            line,
            column,
            content: "set",
          },
        ],
      };

      // todo: carry on
      break;

    case "ruleConditionExpectingIs":
      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedIs",
        tokens: [
          {
            line: state.current.entityALine,
            column: state.current.entityAColumn,
            content: state.current.entityA,
          },
          {
            line: state.current.attributeALine,
            column: state.current.attributeAColumn,
            content: state.current.attributeA,
          },
          {
            line,
            column,
            content: "set",
          },
        ],
      };

      // todo: carry on
      break;

    case "ruleConditionExpectingEntityB":
      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedAttribute",
        tokens: [
          {
            line: state.current.entityALine,
            column: state.current.entityAColumn,
            content: state.current.entityA,
          },
          {
            line: state.current.attributeALine,
            column: state.current.attributeAColumn,
            content: state.current.attributeA,
          },
          {
            line: state.current.isLine,
            column: state.current.isColumn,
            content: "is",
          },
          {
            line,
            column,
            content: "set",
          },
        ],
      };

      // todo: carry on
      break;

    case "ruleConditionExpectingAttributeBOrEntityC":
      state.next.onRuleCondition(
        state.next.state,
        state.current.name,
        state.current.entityALine,
        state.current.entityAColumn,
        state.current.entityA,
        state.current.attributeALine,
        state.current.attributeAColumn,
        state.current.attributeA,
        state.current.isLine,
        state.current.isColumn,
        state.current.entityBLine,
        state.current.entityBColumn,
        state.current.entityB
      );

      state.current = {
        type: "ruleSetExpectingEntityA",
        name: state.current.name,
        setLine: line,
        setColumn: column,
      };
      break;

    case "ruleConditionExpectingEntityCOrAttributeC":
      state.next.onRuleConditionWithAttribute(
        state.next.state,
        state.current.name,
        state.current.entityALine,
        state.current.entityAColumn,
        state.current.entityA,
        state.current.attributeALine,
        state.current.attributeAColumn,
        state.current.attributeA,
        state.current.isLine,
        state.current.isColumn,
        state.current.entityBLine,
        state.current.entityBColumn,
        state.current.entityB,
        state.current.attributeBOrEntityCLine,
        state.current.attributeBOrEntityCColumn,
        state.current.attributeBOrEntityC
      );

      state.current = {
        type: "ruleSetExpectingEntityA",
        name: state.current.name,
        setLine: line,
        setColumn: column,
      };
      break;

    case "ruleConditionExpectingAttributeCOrIs":
      state.next.onRuleConditionWithAttribute(
        state.next.state,
        state.current.name,
        state.current.entityALine,
        state.current.entityAColumn,
        state.current.entityA,
        state.current.attributeALine,
        state.current.attributeAColumn,
        state.current.attributeA,
        state.current.isLine,
        state.current.isColumn,
        state.current.entityBLine,
        state.current.entityBColumn,
        state.current.entityB,
        state.current.attributeBOrEntityCLine,
        state.current.attributeBOrEntityCColumn,
        state.current.attributeBOrEntityC
      );

      // todo: report the syntax error and carry on

      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedAttributeOrIs",
        tokens: [
          {
            line: state.current.entityCOrAttributeCLine,
            column: state.current.entityCOrAttributeCColumn,
            content: state.current.entityCOrAttributeC,
          },
          {
            line,
            column,
            content: "set",
          },
        ],
      };
      break;

    case "ruleExpectingCreate":
      state.current = {
        type: "ruleSetExpectingEntityA",
        name: state.current.name,
        setLine: line,
        setColumn: column,
      };
      break;

    case "ruleSetExpectingEntityA":
      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedLocal",
        tokens: [
          {
            line,
            column,
            content: "set",
          },
        ],
      };
      break;

    case "ruleSetExpectingAttributeA":
      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedAttribute",
        tokens: [
          {
            line: state.current.entityALine,
            column: state.current.entityAColumn,
            content: state.current.entityA,
          },
          {
            line,
            column,
            content: "set",
          },
        ],
      };
      break;

    case "ruleSetExpectingTo":
      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedTo",
        tokens: [
          {
            line: state.current.entityALine,
            column: state.current.entityAColumn,
            content: state.current.entityA,
          },
          {
            line: state.current.attributeALine,
            column: state.current.attributeAColumn,
            content: state.current.attributeA,
          },
          {
            line,
            column,
            content: "set",
          },
        ],
      };
      break;

    case "ruleSetExpectingEntityB":
      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedAttribute",
        tokens: [
          {
            line: state.current.entityALine,
            column: state.current.entityAColumn,
            content: state.current.entityA,
          },
          {
            line: state.current.attributeALine,
            column: state.current.attributeAColumn,
            content: state.current.attributeA,
          },
          {
            line: state.current.toLine,
            column: state.current.toColumn,
            content: "to",
          },
          {
            line,
            column,
            content: "set",
          },
        ],
      };
      break;

    case "ruleSetExpectingAttributeBOrEntityC":
      state.next.onRuleSet(
        state.next.state,
        state.current.name,
        state.current.entityALine,
        state.current.entityAColumn,
        state.current.entityA,
        state.current.attributeALine,
        state.current.attributeAColumn,
        state.current.attributeA,
        state.current.toLine,
        state.current.toColumn,
        state.current.entityBLine,
        state.current.entityBColumn,
        state.current.entityB
      );

      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedAttributeOrEntity",
        tokens: [
          {
            line,
            column,
            content: "set",
          },
        ],
      };
      break;

    case "ruleSetExpectingEntityCOrAttributeC":
      state.next.onRuleSetWithAttribute(
        state.next.state,
        state.current.name,
        state.current.entityALine,
        state.current.entityAColumn,
        state.current.entityA,
        state.current.attributeALine,
        state.current.attributeAColumn,
        state.current.attributeA,
        state.current.toLine,
        state.current.toColumn,
        state.current.entityBLine,
        state.current.entityBColumn,
        state.current.entityB,
        state.current.attributeBOrEntityCLine,
        state.current.attributeBOrEntityCColumn,
        state.current.attributeBOrEntityC
      );

      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedAttributeOrEntity",
        tokens: [
          {
            line,
            column,
            content: "set",
          },
        ],
      };
      break;

    case "ruleSetExpectingAttributeCOrTo":
      state.next.onRuleSetWithAttribute(
        state.next.state,
        state.current.name,
        state.current.entityALine,
        state.current.entityAColumn,
        state.current.entityA,
        state.current.attributeALine,
        state.current.attributeAColumn,
        state.current.attributeA,
        state.current.toLine,
        state.current.toColumn,
        state.current.entityBLine,
        state.current.entityBColumn,
        state.current.entityB,
        state.current.attributeBOrEntityCLine,
        state.current.attributeBOrEntityCColumn,
        state.current.attributeBOrEntityC
      );

      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedAttributeOrTo",
        tokens: [
          {
            line: state.current.entityCOrAttributeCLine,
            column: state.current.entityCOrAttributeCColumn,
            content: state.current.entityCOrAttributeC,
          },
          {
            line,
            column,
            content: "set",
          },
        ],
      };
      break;

    case "skippingUntilNextStatement":
      state.current.tokens.push({
        line,
        column,
        content: "set",
      });
      break;
  }
};

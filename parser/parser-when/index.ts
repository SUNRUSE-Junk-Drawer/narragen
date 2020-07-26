import { ParserState } from "../parser-state";

export const parserWhen = <TNextState>(
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
            content: "when",
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
            content: "when",
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
            content: "when",
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
            content: "when",
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
            content: "when",
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
            content: "when",
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
            content: "when",
          },
        ],
      };
      break;

    case "ruleExpectingLocal":
      state.current = {
        type: "ruleConditionExpectingEntityA",
        name: state.current.name,
        whenLine: line,
        whenColumn: column,
      };
      break;

    case "ruleConditionExpectingEntityA":
      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedLocal",
        tokens: [
          {
            line,
            column,
            content: "when",
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
            content: "when",
          },
        ],
      };
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
            content: "when",
          },
        ],
      };
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
            content: "when",
          },
        ],
      };
      break;

    case "ruleConditionExpectingAttributeBOrEntityC":
      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedAttributeOrEntity",
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
            line: state.current.entityBLine,
            column: state.current.entityBColumn,
            content: state.current.entityB,
          },
          {
            line,
            column,
            content: "when",
          },
        ],
      };
      break;

    case "ruleConditionExpectingEntityCOrAttributeC":
      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedAttributeOrEntity",
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
            line: state.current.entityBLine,
            column: state.current.entityBColumn,
            content: state.current.entityB,
          },
          {
            line: state.current.attributeBOrEntityCLine,
            column: state.current.attributeBOrEntityCColumn,
            content: state.current.attributeBOrEntityC,
          },
          {
            line,
            column,
            content: "when",
          },
        ],
      };
      break;

    case "ruleConditionExpectingAttributeCOrIs":
      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedAttributeOrIs",
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
            line: state.current.entityBLine,
            column: state.current.entityBColumn,
            content: state.current.entityB,
          },
          {
            line: state.current.attributeBOrEntityCLine,
            column: state.current.attributeBOrEntityCColumn,
            content: state.current.attributeBOrEntityC,
          },
          {
            line: state.current.entityCOrAttributeCLine,
            column: state.current.entityCOrAttributeCColumn,
            content: state.current.entityCOrAttributeC,
          },
          {
            line,
            column,
            content: "when",
          },
        ],
      };
      break;

    case "ruleExpectingCreate":
      state.current = {
        type: "skippingUntilNextStatement",
        syntaxErrorType: "expectedName",
        tokens: [
          {
            line,
            column,
            content: "when",
          },
        ],
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
              content: "when",
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
              content: "when",
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
              content: "when",
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
              content: "when",
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
          type: "ruleExpectingCreate",
          name: state.current.name,
        };

        state.current = {
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedAttributeOrTo",
          tokens: [
            {
              line,
              column,
              content: "when",
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
              content: "when",
            },
          ],
        };
        break;

      case "ruleSetExpectingAttributeCOrTo":
        state.current = {
          type: "skippingUntilNextStatement",
          syntaxErrorType: "expectedAttributeOrTo",
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
              line: state.current.entityBLine,
              column: state.current.entityBColumn,
              content: state.current.entityB,
            },
            {
              line: state.current.attributeBOrEntityCLine,
              column: state.current.attributeBOrEntityCColumn,
              content: state.current.attributeBOrEntityC,
            },
            {
              line: state.current.entityCOrAttributeCLine,
              column: state.current.entityCOrAttributeCColumn,
              content: state.current.entityCOrAttributeC,
            },
            {
              line,
              column,
              content: "when",
            },
          ],
        };
        break;

    case "skippingUntilNextStatement":
      state.current.tokens.push({
        line,
        column,
        content: "when",
      });
      break;
  }
};

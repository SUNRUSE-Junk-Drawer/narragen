import { StatementParserState } from "../statement-parser-state";

export const statementParserToken = <TNextState>(
  state: StatementParserState<TNextState>,
  line: number,
  column: number,
  content: string
): void => {
  switch (state.current.type) {
    case "initial":
      switch (content) {
        case "global":
          state.current = {
            type: "globalExpectingName",
            globalLine: line,
            globalColumn: column,
          };
          break;

        case "attribute":
          state.current = {
            type: "attributeExpectingName",
            attributeLine: line,
            attributeColumn: column,
          };
          break;

        case "rule":
          state.current = {
            type: "ruleExpectingName",
            ruleLine: line,
            ruleColumn: column,
          };
          break;

        case "when":
        case "is":
        default:
          state.current = {
            type: "skippingUntilNextStatement",
            syntaxErrorType: "expectedStatement",
            tokens: [
              {
                line,
                column,
                content,
              },
            ],
          };
          break;
      }
      break;

    case "globalExpectingName":
      switch (content) {
        case "global":
          state.next.onSyntaxError(state.next.state, "expectedName", [
            {
              line: state.current.globalLine,
              column: state.current.globalColumn,
              content: "global",
            },
          ]);
          state.current = {
            type: "globalExpectingName",
            globalLine: line,
            globalColumn: column,
          };
          break;

        case "attribute":
          state.next.onSyntaxError(state.next.state, "expectedName", [
            {
              line: state.current.globalLine,
              column: state.current.globalColumn,
              content: "global",
            },
          ]);
          state.current = {
            type: "attributeExpectingName",
            attributeLine: line,
            attributeColumn: column,
          };
          break;

        case "rule":
          state.next.onSyntaxError(state.next.state, "expectedName", [
            {
              line: state.current.globalLine,
              column: state.current.globalColumn,
              content: "global",
            },
          ]);
          state.current = {
            type: "ruleExpectingName",
            ruleLine: line,
            ruleColumn: column,
          };
          break;

        case "when":
        case "is":
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
                content,
              },
            ],
          };
          break;

        default:
          state.next.onGlobal(
            state.next.state,
            state.current.globalLine,
            state.current.globalColumn,
            line,
            column,
            content
          );
          state.current = {
            type: "globalExpectingAttribute",
            name: content,
          };
          break;
      }
      break;

    case "globalExpectingAttribute":
      switch (content) {
        case "global":
          state.current = {
            type: "globalExpectingName",
            globalLine: line,
            globalColumn: column,
          };
          break;

        case "attribute":
          state.current = {
            type: "attributeExpectingName",
            attributeLine: line,
            attributeColumn: column,
          };
          break;

        case "rule":
          state.current = {
            type: "ruleExpectingName",
            ruleLine: line,
            ruleColumn: column,
          };
          break;

        case "when":
        case "is":
          state.current = {
            type: "skippingUntilNextStatement",
            syntaxErrorType: "expectedStatement",
            tokens: [
              {
                line,
                column,
                content,
              },
            ],
          };
          break;

        default:
          state.current = {
            type: "globalExpectingInitializer",
            name: state.current.name,
            attributeLine: line,
            attributeColumn: column,
            attribute: content,
          };
          break;
      }
      break;

    case "globalExpectingInitializer":
      switch (content) {
        case "global":
          state.next.onSyntaxError(state.next.state, "expectedGlobal", [
            {
              line: state.current.attributeLine,
              column: state.current.attributeColumn,
              content: state.current.attribute,
            },
          ]);
          state.current = {
            type: "globalExpectingName",
            globalLine: line,
            globalColumn: column,
          };
          break;

        case "attribute":
          state.next.onSyntaxError(state.next.state, "expectedGlobal", [
            {
              line: state.current.attributeLine,
              column: state.current.attributeColumn,
              content: state.current.attribute,
            },
          ]);
          state.current = {
            type: "attributeExpectingName",
            attributeLine: line,
            attributeColumn: column,
          };
          break;

        case "rule":
          state.next.onSyntaxError(state.next.state, "expectedGlobal", [
            {
              line: state.current.attributeLine,
              column: state.current.attributeColumn,
              content: state.current.attribute,
            },
          ]);
          state.current = {
            type: "ruleExpectingName",
            ruleLine: line,
            ruleColumn: column,
          };
          break;

        case "when":
        case "is":
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
                content,
              },
            ],
          };
          break;

        default:
          state.next.onGlobalInitializer(
            state.next.state,
            state.current.name,
            state.current.attributeLine,
            state.current.attributeColumn,
            state.current.attribute,
            line,
            column,
            content
          );
          state.current = {
            type: "globalExpectingAttribute",
            name: state.current.name,
          };
          break;
      }
      break;

    case "attributeExpectingName":
      switch (content) {
        case "global":
          state.next.onSyntaxError(state.next.state, "expectedName", [
            {
              line: state.current.attributeLine,
              column: state.current.attributeColumn,
              content: "attribute",
            },
          ]);
          state.current = {
            type: "globalExpectingName",
            globalLine: line,
            globalColumn: column,
          };
          break;

        case "attribute":
          state.next.onSyntaxError(state.next.state, "expectedName", [
            {
              line: state.current.attributeLine,
              column: state.current.attributeColumn,
              content: "attribute",
            },
          ]);
          state.current = {
            type: "attributeExpectingName",
            attributeLine: line,
            attributeColumn: column,
          };
          break;

        case "rule":
          state.next.onSyntaxError(state.next.state, "expectedName", [
            {
              line: state.current.attributeLine,
              column: state.current.attributeColumn,
              content: "attribute",
            },
          ]);
          state.current = {
            type: "ruleExpectingName",
            ruleLine: line,
            ruleColumn: column,
          };
          break;

        case "when":
        case "is":
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
                content,
              },
            ],
          };
          break;

        default:
          state.current = {
            type: "attributeExpectingInitializer",
            attributeLine: state.current.attributeLine,
            attributeColumn: state.current.attributeColumn,
            nameLine: line,
            nameColumn: column,
            name: content,
          };
          break;
      }
      break;

    case "attributeExpectingInitializer":
      switch (content) {
        case "global":
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
            type: "globalExpectingName",
            globalLine: line,
            globalColumn: column,
          };
          break;

        case "attribute":
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
            type: "attributeExpectingName",
            attributeLine: line,
            attributeColumn: column,
          };
          break;

        case "rule":
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
            type: "ruleExpectingName",
            ruleLine: line,
            ruleColumn: column,
          };
          break;

        case "when":
        case "is":
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
                content,
              },
            ],
          };
          break;

        default:
          state.next.onAttribute(
            state.next.state,
            state.current.attributeLine,
            state.current.attributeColumn,
            state.current.nameLine,
            state.current.nameColumn,
            state.current.name,
            line,
            column,
            content
          );
          state.current = {
            type: "initial",
          };
          break;
      }
      break;

    case "ruleExpectingName":
      switch (content) {
        case "global":
          state.next.onSyntaxError(state.next.state, "expectedName", [
            {
              line: state.current.ruleLine,
              column: state.current.ruleColumn,
              content: "rule",
            },
          ]);
          state.current = {
            type: "globalExpectingName",
            globalLine: line,
            globalColumn: column,
          };
          break;

        case "attribute":
          state.next.onSyntaxError(state.next.state, "expectedName", [
            {
              line: state.current.ruleLine,
              column: state.current.ruleColumn,
              content: "rule",
            },
          ]);
          state.current = {
            type: "attributeExpectingName",
            attributeLine: line,
            attributeColumn: column,
          };
          break;

        case "rule":
          state.next.onSyntaxError(state.next.state, "expectedName", [
            {
              line: state.current.ruleLine,
              column: state.current.ruleColumn,
              content: "rule",
            },
          ]);
          state.current = {
            type: "ruleExpectingName",
            ruleLine: line,
            ruleColumn: column,
          };
          break;

        case "when":
        case "is":
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
                content,
              },
            ],
          };
          break;

        default:
          state.next.onRule(
            state.next.state,
            state.current.ruleLine,
            state.current.ruleColumn,
            line,
            column,
            content
          );
          state.current = {
            type: "ruleExpectingLocal",
            name: content,
          };
          break;
      }
      break;

    case "ruleExpectingLocal":
      switch (content) {
        case "global":
          state.current = {
            type: "globalExpectingName",
            globalLine: line,
            globalColumn: column,
          };
          break;

        case "attribute":
          state.current = {
            type: "attributeExpectingName",
            attributeLine: line,
            attributeColumn: column,
          };
          break;

        case "rule":
          state.current = {
            type: "ruleExpectingName",
            ruleLine: line,
            ruleColumn: column,
          };
          break;

        case "when":
          state.current = {
            type: "ruleConditionExpectingEntityA",
            name: state.current.name,
            whenLine: line,
            whenColumn: column,
          };
          break;

        case "is":
          state.current = {
            type: "skippingUntilNextStatement",
            syntaxErrorType: "expectedStatement",
            tokens: [
              {
                line,
                column,
                content,
              },
            ],
          };
          break;

        default:
          state.next.onRuleLocal(
            state.next.state,
            state.current.name,
            line,
            column,
            content
          );
          break;
      }
      break;

    case "ruleConditionExpectingEntityA":
      switch (content) {
        case "global":
          state.current = {
            type: "globalExpectingName",
            globalLine: line,
            globalColumn: column,
          };
          break;

        case "attribute":
          state.current = {
            type: "attributeExpectingName",
            attributeLine: line,
            attributeColumn: column,
          };
          break;

        case "rule":
          state.current = {
            type: "ruleExpectingName",
            ruleLine: line,
            ruleColumn: column,
          };
          break;

        case "when":
        case "is":
          state.current = {
            type: "skippingUntilNextStatement",
            syntaxErrorType: "expectedLocal",
            tokens: [
              {
                line,
                column,
                content,
              },
            ],
          };
          break;

        default:
          state.current = {
            type: "ruleConditionExpectingAttributeA",
            name: state.current.name,
            entityALine: line,
            entityAColumn: column,
            entityA: content,
          };
          break;
      }
      break;

    case "ruleConditionExpectingAttributeA":
      switch (content) {
        case "global":
          state.next.onSyntaxError(state.next.state, "expectedAttribute", [
            {
              line: state.current.entityALine,
              column: state.current.entityAColumn,
              content: state.current.entityA,
            },
          ]);
          state.current = {
            type: "globalExpectingName",
            globalLine: line,
            globalColumn: column,
          };
          break;

        case "attribute":
          state.next.onSyntaxError(state.next.state, "expectedAttribute", [
            {
              line: state.current.entityALine,
              column: state.current.entityAColumn,
              content: state.current.entityA,
            },
          ]);
          state.current = {
            type: "attributeExpectingName",
            attributeLine: line,
            attributeColumn: column,
          };
          break;

        case "rule":
          state.next.onSyntaxError(state.next.state, "expectedAttribute", [
            {
              line: state.current.entityALine,
              column: state.current.entityAColumn,
              content: state.current.entityA,
            },
          ]);
          state.current = {
            type: "ruleExpectingName",
            ruleLine: line,
            ruleColumn: column,
          };
          break;

        case "when":
        case "is":
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
                content,
              },
            ],
          };
          break;

        default:
          state.current = {
            type: "ruleConditionExpectingIs",
            name: state.current.name,
            entityALine: state.current.entityALine,
            entityAColumn: state.current.entityAColumn,
            entityA: state.current.entityA,
            attributeALine: line,
            attributeAColumn: column,
            attributeA: content,
          };
          break;
      }
      break;

    case "ruleConditionExpectingIs":
      switch (content) {
        case "global":
          state.next.onSyntaxError(state.next.state, "expectedIs", [
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
          ]);
          state.current = {
            type: "globalExpectingName",
            globalLine: line,
            globalColumn: column,
          };
          break;

        case "attribute":
          state.next.onSyntaxError(state.next.state, "expectedIs", [
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
          ]);
          state.current = {
            type: "attributeExpectingName",
            attributeLine: line,
            attributeColumn: column,
          };
          break;

        case "rule":
          state.next.onSyntaxError(state.next.state, "expectedIs", [
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
          ]);
          state.current = {
            type: "ruleExpectingName",
            ruleLine: line,
            ruleColumn: column,
          };
          break;

        case "when":
        default:
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
                content,
              },
            ],
          };
          break;

        case "is":
          state.current = {
            type: "ruleConditionExpectingEntityB",
            name: state.current.name,
            entityALine: state.current.entityALine,
            entityAColumn: state.current.entityAColumn,
            entityA: state.current.entityA,
            attributeALine: state.current.attributeALine,
            attributeAColumn: state.current.attributeAColumn,
            attributeA: state.current.attributeA,
            isLine: line,
            isColumn: column,
          };
          break;
      }
      break;

    case "ruleConditionExpectingEntityB":
      switch (content) {
        case "global":
          state.next.onSyntaxError(state.next.state, "expectedAttribute", [
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
          ]);
          state.current = {
            type: "globalExpectingName",
            globalLine: line,
            globalColumn: column,
          };
          break;

        case "attribute":
          state.next.onSyntaxError(state.next.state, "expectedAttribute", [
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
          ]);
          state.current = {
            type: "attributeExpectingName",
            attributeLine: line,
            attributeColumn: column,
          };
          break;

        case "rule":
          state.next.onSyntaxError(state.next.state, "expectedAttribute", [
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
          ]);
          state.current = {
            type: "ruleExpectingName",
            ruleLine: line,
            ruleColumn: column,
          };
          break;

        case "when":
        case "is":
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
                content,
              },
            ],
          };
          break;

        default:
          state.current = {
            type: "ruleConditionExpectingAttributeBOrEntityC",
            name: state.current.name,
            entityALine: state.current.entityALine,
            entityAColumn: state.current.entityAColumn,
            entityA: state.current.entityA,
            attributeALine: state.current.attributeALine,
            attributeAColumn: state.current.attributeAColumn,
            attributeA: state.current.attributeA,
            isLine: state.current.isLine,
            isColumn: state.current.isColumn,
            entityBLine: line,
            entityBColumn: column,
            entityB: content,
          };
          break;
      }
      break;

    case "ruleConditionExpectingAttributeBOrEntityC":
      switch (content) {
        case "global":
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
            type: "globalExpectingName",
            globalLine: line,
            globalColumn: column,
          };
          break;

        case "attribute":
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
            type: "attributeExpectingName",
            attributeLine: line,
            attributeColumn: column,
          };
          break;

        case "rule":
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
            type: "ruleExpectingName",
            ruleLine: line,
            ruleColumn: column,
          };
          break;

        case "when":
        case "is":
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
                content,
              },
            ],
          };
          break;

        default:
          state.current = {
            type: "ruleConditionExpectingEntityCOrAttributeC",
            name: state.current.name,
            entityALine: state.current.entityALine,
            entityAColumn: state.current.entityAColumn,
            entityA: state.current.entityA,
            attributeALine: state.current.attributeALine,
            attributeAColumn: state.current.attributeAColumn,
            attributeA: state.current.attributeA,
            isLine: state.current.isLine,
            isColumn: state.current.isColumn,
            entityBLine: state.current.entityBLine,
            entityBColumn: state.current.entityBColumn,
            entityB: state.current.entityB,
            attributeBOrEntityCLine: line,
            attributeBOrEntityCColumn: column,
            attributeBOrEntityC: content,
          };
          break;
      }
      break;

    case "ruleConditionExpectingEntityCOrAttributeC":
      switch (content) {
        case "global":
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
            type: "globalExpectingName",
            globalLine: line,
            globalColumn: column,
          };
          break;

        case "attribute":
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
            type: "attributeExpectingName",
            attributeLine: line,
            attributeColumn: column,
          };
          break;

        case "rule":
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
            type: "ruleExpectingName",
            ruleLine: line,
            ruleColumn: column,
          };
          break;

        case "when":
        case "is":
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
                content,
              },
            ],
          };
          break;

        default:
          state.current = {
            type: "ruleConditionExpectingAttributeCOrIs",
            name: state.current.name,
            entityALine: state.current.entityALine,
            entityAColumn: state.current.entityAColumn,
            entityA: state.current.entityA,
            attributeALine: state.current.attributeALine,
            attributeAColumn: state.current.attributeAColumn,
            attributeA: state.current.attributeA,
            isLine: state.current.isLine,
            isColumn: state.current.isColumn,
            entityBLine: state.current.entityBLine,
            entityBColumn: state.current.entityBColumn,
            entityB: state.current.entityB,
            attributeBOrEntityCLine: state.current.attributeBOrEntityCLine,
            attributeBOrEntityCColumn: state.current.attributeBOrEntityCColumn,
            attributeBOrEntityC: state.current.attributeBOrEntityC,
            entityCOrAttributeCLine: line,
            entityCOrAttributeCColumn: column,
            entityCOrAttributeC: content,
          };
          break;
      }
      break;

    case "ruleConditionExpectingAttributeCOrIs":
      switch (content) {
        case "global":
          state.next.onSyntaxError(state.next.state, "expectedAttributeOrIs", [
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
          ]);
          state.current = {
            type: "globalExpectingName",
            globalLine: line,
            globalColumn: column,
          };
          break;

        case "attribute":
          state.next.onSyntaxError(state.next.state, "expectedAttributeOrIs", [
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
          ]);
          state.current = {
            type: "attributeExpectingName",
            attributeLine: line,
            attributeColumn: column,
          };
          break;

        case "rule":
          state.next.onSyntaxError(state.next.state, "expectedAttributeOrIs", [
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
          ]);
          state.current = {
            type: "ruleExpectingName",
            ruleLine: line,
            ruleColumn: column,
          };
          break;

        case "when":
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
                content,
              },
            ],
          };
          break;

        case "is":
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
            type: "ruleConditionExpectingEntityB",
            name: state.current.name,
            entityALine: state.current.attributeBOrEntityCLine,
            entityAColumn: state.current.attributeBOrEntityCColumn,
            entityA: state.current.attributeBOrEntityC,
            attributeALine: state.current.entityCOrAttributeCLine,
            attributeAColumn: state.current.entityCOrAttributeCColumn,
            attributeA: state.current.entityCOrAttributeC,
            isLine: line,
            isColumn: column,
          };
          break;

        default:
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
            type: "ruleConditionExpectingIs",
            name: state.current.name,
            entityALine: state.current.entityCOrAttributeCLine,
            entityAColumn: state.current.entityCOrAttributeCColumn,
            entityA: state.current.entityCOrAttributeC,
            attributeALine: line,
            attributeAColumn: column,
            attributeA: content,
          };
          break;
      }
      break;

    case "skippingUntilNextStatement":
      switch (content) {
        case "global":
          state.next.onSyntaxError(
            state.next.state,
            state.current.syntaxErrorType,
            state.current.tokens
          );
          state.current = {
            type: "globalExpectingName",
            globalLine: line,
            globalColumn: column,
          };
          break;

        case "attribute":
          state.next.onSyntaxError(
            state.next.state,
            state.current.syntaxErrorType,
            state.current.tokens
          );
          state.current = {
            type: "attributeExpectingName",
            attributeLine: line,
            attributeColumn: column,
          };
          break;

        case "rule":
          state.next.onSyntaxError(
            state.next.state,
            state.current.syntaxErrorType,
            state.current.tokens
          );
          state.current = {
            type: "ruleExpectingName",
            ruleLine: line,
            ruleColumn: column,
          };
          break;

        case "when":
        case "is":
        default:
          state.current.tokens.push({
            line,
            column,
            content,
          });
          break;
      }
      break;
  }
};

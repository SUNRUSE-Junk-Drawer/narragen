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

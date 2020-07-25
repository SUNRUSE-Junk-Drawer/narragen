import { StatementParserState } from "../statement-parser-state";

export const statementParserEof = <TNextState>(
  state: StatementParserState<TNextState>,
  line: number,
  column: number
): void => {
  switch (state.current.type) {
    case "initial":
      break;

    case "globalExpectingName":
      state.next.onSyntaxError(state.next.state, "expectedName", [
        {
          line: state.current.globalLine,
          column: state.current.globalColumn,
          content: "global",
        },
      ]);
      break;

    case "globalExpectingAttribute":
      break;

    case "globalExpectingInitializer":
      state.next.onSyntaxError(state.next.state, "expectedGlobal", [
        {
          line: state.current.attributeLine,
          column: state.current.attributeColumn,
          content: state.current.attribute,
        },
      ]);
      break;

    case "attributeExpectingName":
      state.next.onSyntaxError(state.next.state, "expectedName", [
        {
          line: state.current.attributeLine,
          column: state.current.attributeColumn,
          content: "attribute",
        },
      ]);
      break;

    case "attributeExpectingInitializer":
      state.next.onSyntaxError(state.next.state, "expectedGlobal", [
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
      break;

    case "ruleExpectingName":
      state.next.onSyntaxError(state.next.state, "expectedName", [
        {
          line: state.current.ruleLine,
          column: state.current.ruleColumn,
          content: "rule",
        },
      ]);
      break;

    case "ruleExpectingLocal":
      break;

    case "skippingUntilNextStatement":
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
  }

  state.next.onEof(state.next.state, line, column);
};

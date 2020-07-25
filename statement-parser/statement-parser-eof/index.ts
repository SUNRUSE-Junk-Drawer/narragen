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

    case "ruleConditionExpectingEntityA":
      state.next.onSyntaxError(state.next.state, "expectedLocal", [
        {
          line: state.current.whenLine,
          column: state.current.whenColumn,
          content: "when",
        },
      ]);
      break;

    case "ruleConditionExpectingAttributeA":
      state.next.onSyntaxError(state.next.state, "expectedAttribute", [
        {
          line: state.current.entityALine,
          column: state.current.entityAColumn,
          content: state.current.entityA,
        },
      ]);
      break;

    case "ruleConditionExpectingIs":
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
      break;

    case "ruleConditionExpectingEntityB":
      state.next.onSyntaxError(state.next.state, "expectedGlobalOrLocal", [
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
      break;

    case "ruleConditionExpectingAttributeCOrIs":
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

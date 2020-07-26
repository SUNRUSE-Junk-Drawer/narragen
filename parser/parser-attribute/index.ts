import { ParserState } from "../parser-state";

export const parserAttribute = <TNextState>(
  state: ParserState<TNextState>,
  line: number,
  column: number
): void => {
  switch (state.current.type) {
    case "initial":
      state.current = {
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
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
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
      };
      break;

    case "globalExpectingAttribute":
      state.current = {
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
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
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
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
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
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
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
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
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
      };
      break;

    case "ruleExpectingLocal":
      state.current = {
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
      };
      break;

    case "ruleConditionExpectingEntityA":
      state.current = {
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
      };
      break;

    case "ruleConditionExpectingAttributeA":
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

      state.current = {
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
      };
      break;

    case "ruleConditionExpectingEntityB":
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
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
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
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
      };
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

      state.current = {
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
      };
      break;

    case "ruleExpectingCreate":
      state.current = {
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
      };
      break;

    case "ruleSetExpectingEntityA":
      state.current = {
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
      };
      break;

    case "ruleSetExpectingAttributeA":
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

    case "ruleSetExpectingTo":
      state.next.onSyntaxError(state.next.state, "expectedTo", [
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

    case "ruleSetExpectingEntityB":
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
          line: state.current.toLine,
          column: state.current.toColumn,
          content: "to",
        },
      ]);

      state.current = {
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
      };
      break;

    case "ruleSetExpectingAttributeBOrEntityC":
      state.next.onRuleCondition(
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
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
      };
      break;

    case "ruleSetExpectingEntityCOrAttributeC":
      state.next.onRuleConditionWithAttribute(
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
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
      };
      break;

    case "ruleSetExpectingAttributeCOrTo":
      state.next.onSyntaxError(state.next.state, "expectedAttributeOrTo", [
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
      ]);

      state.current = {
        type: "attributeExpectingName",
        attributeLine: line,
        attributeColumn: column,
      };
      break;

    case "skippingUntilNextStatement":
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
  }
};

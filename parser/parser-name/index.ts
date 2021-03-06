import { ParserState } from "../parser-state";

export const parserName = <TNextState>(
  state: ParserState<TNextState>,
  line: number,
  column: number,
  content: string
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
            content,
          },
        ],
      };
      break;

    case "globalExpectingName":
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

    case "globalExpectingAttribute":
      state.current = {
        type: "globalExpectingInitializer",
        name: state.current.name,
        attributeLine: line,
        attributeColumn: column,
        attribute: content,
      };
      break;

    case "globalExpectingInitializer":
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

    case "attributeExpectingName":
      state.current = {
        type: "attributeExpectingInitializer",
        attributeLine: state.current.attributeLine,
        attributeColumn: state.current.attributeColumn,
        nameLine: line,
        nameColumn: column,
        name: content,
      };
      break;

    case "attributeExpectingInitializer":
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

    case "ruleExpectingName":
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

    case "ruleExpectingLocal":
      state.next.onRuleLocal(
        state.next.state,
        state.current.name,
        line,
        column,
        content
      );
      break;

    case "ruleConditionExpectingEntityA":
      state.current = {
        type: "ruleConditionExpectingAttributeA",
        name: state.current.name,
        entityALine: line,
        entityAColumn: column,
        entityA: content,
      };
      break;

    case "ruleConditionExpectingAttributeA":
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
            content,
          },
        ],
      };
      break;

    case "ruleConditionExpectingEntityB":
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

    case "ruleConditionExpectingAttributeBOrEntityC":
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

    case "ruleConditionExpectingEntityCOrAttributeC":
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

    case "ruleExpectingCreate":
      state.next.onRuleCreate(
        state.next.state,
        state.current.name,
        line,
        column,
        content
      );
      break;

    case "ruleSetExpectingEntityA":
      state.current = {
        type: "ruleSetExpectingAttributeA",
        name: state.current.name,
        entityALine: line,
        entityAColumn: column,
        entityA: content,
      };
      break;

    case "ruleSetExpectingAttributeA":
      state.current = {
        type: "ruleSetExpectingTo",
        name: state.current.name,
        entityALine: state.current.entityALine,
        entityAColumn: state.current.entityAColumn,
        entityA: state.current.entityA,
        attributeALine: line,
        attributeAColumn: column,
        attributeA: content,
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
            content,
          },
        ],
      };
      break;

    case "ruleSetExpectingEntityB":
      state.current = {
        type: "ruleSetExpectingAttributeBOrEntityC",
        name: state.current.name,
        entityALine: state.current.entityALine,
        entityAColumn: state.current.entityAColumn,
        entityA: state.current.entityA,
        attributeALine: state.current.attributeALine,
        attributeAColumn: state.current.attributeAColumn,
        attributeA: state.current.attributeA,
        toLine: state.current.toLine,
        toColumn: state.current.toColumn,
        entityBLine: line,
        entityBColumn: column,
        entityB: content,
      };
      break;

    case "ruleSetExpectingAttributeBOrEntityC":
      state.current = {
        type: "ruleSetExpectingEntityCOrAttributeC",
        name: state.current.name,
        entityALine: state.current.entityALine,
        entityAColumn: state.current.entityAColumn,
        entityA: state.current.entityA,
        attributeALine: state.current.attributeALine,
        attributeAColumn: state.current.attributeAColumn,
        attributeA: state.current.attributeA,
        toLine: state.current.toLine,
        toColumn: state.current.toColumn,
        entityBLine: state.current.entityBLine,
        entityBColumn: state.current.entityBColumn,
        entityB: state.current.entityB,
        attributeBOrEntityCLine: line,
        attributeBOrEntityCColumn: column,
        attributeBOrEntityC: content,
      };
      break;

    case "ruleSetExpectingEntityCOrAttributeC":
      state.current = {
        type: "ruleSetExpectingAttributeCOrTo",
        name: state.current.name,
        entityALine: state.current.entityALine,
        entityAColumn: state.current.entityAColumn,
        entityA: state.current.entityA,
        attributeALine: state.current.attributeALine,
        attributeAColumn: state.current.attributeAColumn,
        attributeA: state.current.attributeA,
        toLine: state.current.toLine,
        toColumn: state.current.toColumn,
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
        type: "ruleSetExpectingTo",
        name: state.current.name,
        entityALine: state.current.entityCOrAttributeCLine,
        entityAColumn: state.current.entityCOrAttributeCColumn,
        entityA: state.current.entityCOrAttributeC,
        attributeALine: line,
        attributeAColumn: column,
        attributeA: content,
      };
      break;

    case "skippingUntilNextStatement":
      state.current.tokens.push({
        line,
        column,
        content,
      });
      break;
  }
};

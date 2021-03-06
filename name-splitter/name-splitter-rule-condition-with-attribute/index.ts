import { NameSplitterState } from "../name-splitter-state";

export const nameSplitterRuleConditionWithAttribute = <TNextState>(
  state: NameSplitterState<TNextState>,
  name: string,
  entityALine: number,
  entityAColumn: number,
  entityA: string,
  attributeALine: number,
  attributeAColumn: number,
  attributeA: string,
  isLine: number,
  isColumn: number,
  entityBLine: number,
  entityBColumn: number,
  entityB: string,
  attributeBLine: number,
  attributeBColumn: number,
  attributeB: string
): void => {
  isLine;
  isColumn;

  state.next.onRuleScopedName(
    state.next.state,
    name,
    entityALine,
    entityAColumn,
    entityA,
    "globalOrLocalReference"
  );

  state.next.onUnscopedName(
    state.next.state,
    attributeALine,
    attributeAColumn,
    attributeA,
    "attributeReference"
  );

  state.next.onRuleScopedName(
    state.next.state,
    name,
    entityBLine,
    entityBColumn,
    entityB,
    "globalOrLocalReference"
  );

  state.next.onUnscopedName(
    state.next.state,
    attributeBLine,
    attributeBColumn,
    attributeB,
    "attributeReference"
  );
};

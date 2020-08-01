import { NameSplitterState } from "../name-splitter-state";

export const nameSplitterRuleCondition = <TNextState>(
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
  entityB: string
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
};

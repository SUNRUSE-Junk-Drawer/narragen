import { NameSplitterState } from "../name-splitter-state";

export const nameSplitterRuleCreate = <TNextState>(
  state: NameSplitterState<TNextState>,
  name: string,
  createLine: number,
  createColumn: number,
  create: string
): void => {
  state.next.onRuleScopedName(
    state.next.state,
    name,
    createLine,
    createColumn,
    create,
    "createDeclaration"
  );
};

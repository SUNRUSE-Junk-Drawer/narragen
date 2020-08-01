import { NameSplitterState } from "../name-splitter-state";

export const nameSplitterRule = <TNextState>(
  state: NameSplitterState<TNextState>,
  ruleLine: number,
  ruleColumn: number,
  nameLine: number,
  nameColumn: number,
  name: string
): void => {
  ruleLine;
  ruleColumn;

  state.next.onUnscopedName(
    state.next.state,
    nameLine,
    nameColumn,
    name,
    "ruleDeclaration"
  );
};

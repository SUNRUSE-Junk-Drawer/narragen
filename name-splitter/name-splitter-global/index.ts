import { NameSplitterState } from "../name-splitter-state";

export const nameSplitterGlobal = <TNextState>(
  state: NameSplitterState<TNextState>,
  globalLine: number,
  globalColumn: number,
  nameLine: number,
  nameColumn: number,
  name: string
): void => {
  globalLine;
  globalColumn;

  state.next.onUnscopedName(
    state.next.state,
    nameLine,
    nameColumn,
    name,
    "globalDeclaration"
  );
};

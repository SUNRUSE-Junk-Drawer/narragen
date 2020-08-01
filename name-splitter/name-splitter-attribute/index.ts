import { NameSplitterState } from "../name-splitter-state";

export const nameSplitterAttribute = <TNextState>(
  state: NameSplitterState<TNextState>,
  attributeLine: number,
  attributeColumn: number,
  nameLine: number,
  nameColumn: number,
  name: string,
  initializerLine: number,
  initializerColumn: number,
  initializer: string
): void => {
  attributeLine;
  attributeColumn;

  state.next.onUnscopedName(
    state.next.state,
    nameLine,
    nameColumn,
    name,
    "attributeDeclaration"
  );

  state.next.onUnscopedName(
    state.next.state,
    initializerLine,
    initializerColumn,
    initializer,
    "globalReference"
  );
};

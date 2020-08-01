import { NameSplitterState } from "../name-splitter-state";

export const nameSplitterGlobalInitializer = <TNextState>(
  state: NameSplitterState<TNextState>,
  name: string,
  attributeLine: number,
  attributeColumn: number,
  attribute: string,
  globalLine: number,
  globalColumn: number,
  global: string
): void => {
  name;

  state.next.onUnscopedName(
    state.next.state,
    attributeLine,
    attributeColumn,
    attribute,
    "attributeReference"
  );

  state.next.onUnscopedName(
    state.next.state,
    globalLine,
    globalColumn,
    global,
    "globalReference"
  );
};

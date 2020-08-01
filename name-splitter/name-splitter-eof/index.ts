import { NameSplitterState } from "../name-splitter-state";

export const nameSplitterEof = <TNextState>(
  state: NameSplitterState<TNextState>,
  line: number,
  column: number
): void => {
  state.next.onEof(state.next.state, line, column);
};

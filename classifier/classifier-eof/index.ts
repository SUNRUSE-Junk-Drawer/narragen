import { ClassifierState } from "../classifier-state";

export const classifierEof = <TNextState>(
  state: ClassifierState<TNextState>,
  line: number,
  column: number
): void => {
  state.next.onEof(state.next.state, line, column);
};

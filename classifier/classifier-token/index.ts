import { ClassifierState } from "../classifier-state";

export const classifierToken = <TNextState>(
  state: ClassifierState<TNextState>,
  line: number,
  column: number,
  content: string
): void => {
  switch (content.toLowerCase()) {
    case "global":
      state.next.onGlobal(state.next.state, line, column);
      break;

    case "attribute":
      state.next.onAttribute(state.next.state, line, column);
      break;

    case "rule":
      state.next.onRule(state.next.state, line, column);
      break;

    case "when":
      state.next.onWhen(state.next.state, line, column);
      break;

    case "is":
      state.next.onIs(state.next.state, line, column);
      break;

    case "create":
      state.next.onCreate(state.next.state, line, column);
      break;

    default:
      state.next.onName(state.next.state, line, column, content);
      break;
  }
};

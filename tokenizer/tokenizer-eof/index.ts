import { TokenizerState } from "../tokenizer-state";

export const tokenizerEof = <TNextState>(
  state: TokenizerState<TNextState>
): void => {
  switch (state.current.type) {
    case "lineComment":
      state.next.onComment(
        state.next.state,
        state.current.line,
        state.current.column,
        state.current.content
      );
      break;
    case "token":
      state.next.onToken(
        state.next.state,
        state.current.line,
        state.current.column,
        state.current.content
      );
      break;
  }

  state.next.onEof(state.next.state, state.line, state.column);
};

import { TokenizerState } from "../tokenizer-state";

export const tokenizerCharacter = <TNextState>(
  state: TokenizerState<TNextState>,
  character: string
): void => {
  switch (state.current.type) {
    case "betweenTokens":
      if (character === "#") {
        state.current = {
          type: "lineComment",
          line: state.line,
          column: state.column,
          content: "#",
        };
      } else if (/\S/.test(character)) {
        state.current = {
          type: "token",
          line: state.line,
          column: state.column,
          content: character,
        };
      }
      break;

    case "lineComment":
      if (character === "\n") {
        state.next.onComment(
          state.next.state,
          state.current.line,
          state.current.column,
          state.current.content
        );
        state.current = {
          type: "betweenTokens",
        };
      } else {
        state.current.content += character;
      }
      break;

    case "token":
      if (character === "#") {
        state.next.onToken(
          state.next.state,
          state.current.line,
          state.current.column,
          state.current.content
        );
        state.current = {
          type: "lineComment",
          line: state.line,
          column: state.column,
          content: "#",
        };
      } else if (/\s/.test(character)) {
        state.next.onToken(
          state.next.state,
          state.current.line,
          state.current.column,
          state.current.content
        );
        state.current = {
          type: "betweenTokens",
        };
      } else {
        state.current.content += character;
      }
      break;
  }

  if (character === "\n") {
    state.line++;
    state.column = 1;
  } else {
    state.column++;
  }
};

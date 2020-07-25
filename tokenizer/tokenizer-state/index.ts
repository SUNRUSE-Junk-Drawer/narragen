import { TokenizerCurrentState } from "../tokenizer-current-state";

export type TokenizerState<TNextState> = {
  line: number;
  column: number;
  current: TokenizerCurrentState;
  readonly next: {
    readonly state: TNextState;
    readonly onComment: (
      state: TNextState,
      line: number,
      column: number,
      content: string
    ) => void;
    readonly onToken: (
      state: TNextState,
      line: number,
      column: number,
      content: string
    ) => void;
    readonly onEof: (state: TNextState, line: number, column: number) => void;
  };
};

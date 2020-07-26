export type ClassifierState<TNextState> = {
  readonly next: {
    readonly state: TNextState;
    readonly onGlobal: (
      state: TNextState,
      line: number,
      column: number
    ) => void;
    readonly onAttribute: (
      state: TNextState,
      line: number,
      column: number
    ) => void;
    readonly onRule: (state: TNextState, line: number, column: number) => void;
    readonly onWhen: (state: TNextState, line: number, column: number) => void;
    readonly onIs: (state: TNextState, line: number, column: number) => void;
    readonly onCreate: (
      state: TNextState,
      line: number,
      column: number
    ) => void;
    readonly onName: (
      state: TNextState,
      line: number,
      column: number,
      content: string
    ) => void;
    readonly onEof: (state: TNextState, line: number, column: number) => void;
  };
};

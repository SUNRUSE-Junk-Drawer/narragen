export type TokenizerCurrentState =
  | { readonly type: "betweenTokens" }
  | {
      readonly type: "lineComment";
      readonly line: number;
      readonly column: number;
      content: string;
    }
  | {
      readonly type: "token";
      readonly line: number;
      readonly column: number;
      content: string;
    };

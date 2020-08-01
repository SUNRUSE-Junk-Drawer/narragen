import { UnscopedNameType } from "../unscoped-name-type";
import { RuleScopedNameType } from "../rule-scoped-name-type";

export type NameSplitterState<TNextState> = {
  readonly next: {
    readonly state: TNextState;
    readonly onUnscopedName: (
      state: TNextState,
      line: number,
      column: number,
      name: string,
      type: UnscopedNameType
    ) => void;
    readonly onRuleScopedName: (
      state: TNextState,
      ruleName: string,
      line: number,
      column: number,
      name: string,
      type: RuleScopedNameType
    ) => void;
    readonly onEof: (state: TNextState, line: number, column: number) => void;
  };
};

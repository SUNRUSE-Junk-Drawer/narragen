import { StatementParserCurrentState } from "../statement-parser-current-state";
import { StatementParserSyntaxErrorType } from "../statement-parser-syntax-error-type";
import { StatementParserSyntaxErrorToken } from "../statement-parser-syntax-error-token";

export type StatementParserState<TNextState> = {
  current: StatementParserCurrentState;
  readonly next: {
    readonly state: TNextState;
    readonly onGlobal: (
      state: TNextState,
      globalLine: number,
      globalColumn: number,
      nameLine: number,
      nameColumn: number,
      name: string
    ) => void;
    readonly onGlobalInitializer: (
      state: TNextState,
      name: string,
      attributeLine: number,
      attributeColumn: number,
      attribute: string,
      globalLine: number,
      globalColumn: number,
      global: string
    ) => void;
    readonly onAttribute: (
      state: TNextState,
      attributeLine: number,
      attributeColumn: number,
      nameLine: number,
      nameColumn: number,
      name: string,
      initializerLine: number,
      initializerColumn: number,
      initializer: string
    ) => void;
    readonly onRule: (
      state: TNextState,
      ruleLine: number,
      ruleColumn: number,
      nameLine: number,
      nameColumn: number,
      name: string
    ) => void;
    readonly onRuleLocal: (
      state: TNextState,
      name: string,
      localLine: number,
      localColumn: number,
      local: string
    ) => void;
    readonly onRuleCondition: (
      state: TNextState,
      name: string,
      entityALine: number,
      entityAColumn: number,
      entityA: string,
      attributeALine: number,
      attributeAColumn: number,
      attributeA: string,
      isLine: number,
      isColumn: number,
      entityBLine: number,
      entityBColumn: number,
      entityB: string
    ) => void;
    readonly onRuleConditionWithAttribute: (
      state: TNextState,
      name: string,
      entityALine: number,
      entityAColumn: number,
      entityA: string,
      attributeALine: number,
      attributeAColumn: number,
      attributeA: string,
      isLine: number,
      isColumn: number,
      entityBLine: number,
      entityBColumn: number,
      entityB: string,
      attributeBLine: number,
      attributeBColumn: number,
      attributeB: string
    ) => void;
    readonly onSyntaxError: (
      state: TNextState,
      type: StatementParserSyntaxErrorType,
      tokens: ReadonlyArray<StatementParserSyntaxErrorToken>
    ) => void;
    readonly onEof: (state: TNextState, line: number, column: number) => void;
  };
};

import { NameSplitterState } from "../name-splitter-state";
import { ParserSyntaxErrorType } from "../../parser/parser-syntax-error-type";
import { ParserSyntaxErrorToken } from "../../parser/parser-syntax-error-token";

export const nameSplitterSyntaxError = <TNextState>(
  state: NameSplitterState<TNextState>,
  type: ParserSyntaxErrorType,
  tokens: ReadonlyArray<ParserSyntaxErrorToken>
): void => {
  state;
  type;
  tokens;
};

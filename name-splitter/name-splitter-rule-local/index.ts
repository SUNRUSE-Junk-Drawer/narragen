import { NameSplitterState } from "../name-splitter-state";

export const nameSplitterRuleLocal = <TNextState>(
  state: NameSplitterState<TNextState>,
  name: string,
  localLine: number,
  localColumn: number,
  local: string
): void => {
  state.next.onRuleScopedName(
    state.next.state,
    name,
    localLine,
    localColumn,
    local,
    "localDeclaration"
  );
};

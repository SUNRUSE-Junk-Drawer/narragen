export type StatementParserSyntaxErrorType =
  | "expectedStatement"
  | "expectedName"
  | "expectedGlobal"
  | "expectedLocal"
  | "expectedAttribute"
  | "expectedIs"
  | "expectedAttributeOrEntity"
  | "expectedGlobalOrLocal"
  | "expectedAttributeOrIs";

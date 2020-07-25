export type StatementParserSyntaxErrorToken = {
  readonly line: number;
  readonly column: number;
  readonly content: string;
};

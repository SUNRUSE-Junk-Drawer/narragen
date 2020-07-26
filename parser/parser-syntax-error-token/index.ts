export type ParserSyntaxErrorToken = {
  readonly line: number;
  readonly column: number;
  readonly content: string;
};

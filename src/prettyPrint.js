export const prettyPrint = program => program
  .map(statement => prettyPrintStatement(statement))
  .join("\n\n") +
  "\n"
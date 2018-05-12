const prettyPrintStatement = statement => statement.global ?
  prettyPrintGlobal(statement.global) :
  prettyPrintRule(statement.rule)

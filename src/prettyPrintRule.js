const prettyPrintRule = rule => `when ${rule.conditions
  .map(condition => prettyPrintCondition(condition))
  .join("\nand ")}` +
  (rule.sets.length ? "\nset " : "") +
  `${rule.sets.map(set => prettyPrintSet(set)).join("\nand ")}`
const prettyPrintCondition = condition => prettyPrintPath(condition.left) +
  (condition.not ? " is not " : " is ") +
  prettyPrintPath(condition.right)
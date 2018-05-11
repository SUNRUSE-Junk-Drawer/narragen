const prettyPrintSet = set => "set " +
  prettyPrintPath(set.path) +
  " to " +
  prettyPrintPath(set.value)
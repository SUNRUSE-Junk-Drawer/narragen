const prettyPrintInitializer = initalizer => initalizer.attribute.token +
  (initalizer.value ? ` ${initalizer.value.token}` : "")
const prettyPrintGlobal = global => "define" +
  (global.name ? ` ${global.name.token}` : "") +
  global.initializers
    .map(initializer => `\n\t${prettyPrintInitializer(initializer)}`).join("")
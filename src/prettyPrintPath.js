const prettyPrintPath = path => (path.entity ? path.entity.token : "") +
  path.attributeChain.map(attribute => ` ${attribute.token}`).join("")

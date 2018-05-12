const combineIndexTypes = (a, b) => {
  switch (a) {
    case "both": return "both"
    case "forward":
      switch (b) {
        case "both":
        case "inverted":
          return "both"
      }
      return "forward"
    case "inverted":
      switch (b) {
        case "both":
        case "forward":
          return "both"
      }
      return "inverted"
  }
  return b
}

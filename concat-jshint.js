import glob from "glob"
import concat from "concat"

glob("src/**.js", (err, matches) => {
  if (err) throw err
  concat(matches, "dist/jshint.js")
})
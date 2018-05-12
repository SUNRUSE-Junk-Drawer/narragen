import { readdir, readFile, stat, writeFile } from "fs"
import { join, resolve } from "path"
import { transform } from "@babel/core"
import { JSHINT } from "jshint"

const concatenateAndHint = (root, writeTo, done) => {
  console.log("File(s) changed, reading...")

  let remainingPaths = 0
  let source = []
  const addPath = path => {
    remainingPaths++
    stat(path, (err, stats) => {
      if (err) {
        console.error(err)
      } else {
        if (stats.isFile() && path.endsWith(".js")) {
          readFile(path, { encoding: "utf8" }, (err, data) => {
            if (err) {
              console.error(err)
            } else {
              source.push(data)
              finishedPath()
            }
          })
        } else if (stats.isDirectory()) {
          readdir(path, (err, files) => {
            if (err) {
              console.error(err)
            } else {
              files.forEach(file => addPath(join(path, file)))
              finishedPath()
            }
          })
        } else {
          finishedPath()
        }
      }
    })
  }

  const finishedPath = () => {
    remainingPaths--
    if (remainingPaths) return
    const concatenated = source.join("")
    console.log("Reading JSHint configuration...")
    readFile(".jshintrc", { encoding: "utf8" }, (err, jshintConfig) => {
      if (err) {
        console.error(err)
      } else {
        console.log("Running JSHint...")
        JSHINT(concatenated, JSON.parse(jshintConfig))
        const hintErrors = JSHINT.data().errors
        if (hintErrors) {
          console.error(hintErrors)
        } else {
          console.log("Reading Babel configuration...")
          readFile(".babelrc", { encoding: "utf8" }, (err, babelConfig) => {
            if (err) {
              console.error(err)
            } else {
              console.log("Running Babel...")
              let transformed
              try {
                transformed = transform(concatenated, JSON.parse(babelConfig)).code
              } catch (e) {
                console.error(e)
                return
              }
              console.log("Writing...")
              writeFile(writeTo, transformed, err => {
                if (err) {
                  console.error(err)
                } else {
                  done()
                }
              })
            }
          })
        }
      }
    })
  }

  addPath(root)
}

import decache from "decache"
import Jasmine from "jasmine"

const run = () => {
  let remaining = 3
  const done = () => {
    remaining--
    if (remaining) return
    // Workaround for https://github.com/jasmine/jasmine-npm/issues/30.
    decache(resolve("dist/tests.js"))
    decache(resolve("dist/helpers.js"))
    console.log("Running Jasmine tests...")
    const jasmine = new Jasmine()
    jasmine.loadConfigFile("spec/support/jasmine.json")
    jasmine.onComplete(passed => { })
    jasmine.execute()
  }
  console.log("File changed, processing files...")
  concatenateAndHint("src", "dist/index.js", done)
  concatenateAndHint("spec/tests", "dist/tests.js", done)
  concatenateAndHint("spec/helpers", "dist/helpers.js", done)
}

import { watch } from "chokidar"
import mkdirp from "mkdirp"

mkdirp("dist", (err) => {
  if (err) throw err

  const watcher = watch(".", {
    ignored: ["node_modules", "dist", ".nyc_output", ".git"],
    persistent: true
  }).on("ready", () => {
    watcher
      .on("add", run)
      .on("change", run)
      .on("unlink", run)

    run()
  })
})
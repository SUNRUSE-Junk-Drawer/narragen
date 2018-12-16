const start = (state, onNewFile, onCharacter, onEndOfFile, onEnd) => ({
  state,
  onNewFile,
  onCharacter,
  onEndOfFile,
  onEnd,
  numberOfOpenFiles: 0,
  noFurtherFiles: false
})

const newFile = (parser, metadata) => {
  if (parser.noFurtherFiles) {
    throw new Error(`"newFile" called after "noFurtherFiles"`)
  }
  parser.numberOfOpenFiles++
  return {
    parser,
    state: parser.onNewFile(parser.state, metadata),
    endOfFile: false
  }
}

const character = (file, character) => {
  if (file.endOfFile) {
    throw new Error(`"character" called after "endOfFile"`)
  }
  file.parser.onCharacter(file.state, character)
}

const endOfFile = file => {
  if (file.endOfFile) {
    throw new Error(`"endOfFile" called after "endOfFile"`)
  }
  file.parser.numberOfOpenFiles--
  file.endOfFile = true
  file.parser.onEndOfFile(file.state)
  if (file.parser.numberOfOpenFiles || !file.parser.noFurtherFiles) {
    return
  }
  file.parser.onEnd(file.parser.state)
}

const noFurtherFiles = parser => {
  if (parser.noFurtherFiles) {
    throw new Error(`"noFurtherFiles" called after "noFurtherFiles"`)
  }
  parser.noFurtherFiles = true
  if (parser.numberOfOpenFiles) {
    return
  }
  parser.onEnd(parser.state)
}

describe(`parser`, () => {
  const onNewFile = jasmine.createSpy(`onNewFile`)
  onNewFile.and.returnValue(`Test File State`)
  const onCharacter = jasmine.createSpy(`onCharacter`)
  const onEndOfFile = jasmine.createSpy(`onEndOfFile`)
  const onEnd = jasmine.createSpy(`onEnd`)
  let onEndOfFileCalledBeforeOnEnd = false
  onEnd.and.callFake(() => onEndOfFileCalledBeforeOnEnd = !!onEndOfFile.calls.count())
  afterEach(() => {
    onNewFile.calls.reset()
    onCharacter.calls.reset()
    onEndOfFile.calls.reset()
    onEnd.calls.reset()
    onEndOfFileCalledBeforeOnEnd = false
  })
  describe(`start`, () => {
    let parser
    beforeEach(() => parser = get(`start`)(`Test Parser State`, onNewFile, onCharacter, onEndOfFile, onEnd))
    it(`includes the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
    it(`includes the onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
    it(`does not call the onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
    it(`includes the onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
    it(`does not call the onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
    it(`includes the onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
    it(`does not call the onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
    it(`includes the onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
    it(`does not call the onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
    it(`includes numberOfOpenFiles 0`, () => expect(parser.numberOfOpenFiles).toEqual(0))
    it(`includes noFurtherFiles false`, () => expect(parser.noFurtherFiles).toBe(false))
  })
  describe(`newFile`, () => {
    let parser
    beforeEach(() => parser = {
      state: `Test Parser State`,
      onNewFile,
      onCharacter,
      onEndOfFile,
      onEnd
    })
    describe(`when the parser is expecting further files`, () => {
      beforeEach(() => parser.noFurtherFiles = false)
      describe(`when the parser has no open files`, () => {
        let file
        beforeEach(() => {
          parser.numberOfOpenFiles = 0
          file = get(`newFile`)(parser, `Test File Metadata`)
        })
        it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
        it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
        it(`calls the parser's onNewFile callback once`, () => expect(onNewFile).toHaveBeenCalledTimes(1))
        it(`calls the parser's onNewFile callback with the parser's state`, () => expect(onNewFile).toHaveBeenCalledWith(`Test Parser State`, jasmine.anything()))
        it(`calls the parser's onNewFile callback with the file's metadata`, () => expect(onNewFile).toHaveBeenCalledWith(jasmine.anything(), `Test File Metadata`))
        it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
        it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
        it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
        it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
        it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
        it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
        it(`increments the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(1))
        it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(false))
        it(`returns the returned file state`, () => expect(file.state).toEqual(`Test File State`))
        it(`returns the parser`, () => expect(file.parser).toBe(parser))
        it(`includes endOfFile false`, () => expect(file.endOfFile).toBe(false))
      })
      describe(`when the parser has one open file`, () => {
        let file
        beforeEach(() => {
          parser.numberOfOpenFiles = 1
          file = get(`newFile`)(parser, `Test File Metadata`)
        })
        it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
        it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
        it(`calls the parser's onNewFile callback once`, () => expect(onNewFile).toHaveBeenCalledTimes(1))
        it(`calls the parser's onNewFile callback with the parser's state`, () => expect(onNewFile).toHaveBeenCalledWith(`Test Parser State`, jasmine.anything()))
        it(`calls the parser's onNewFile callback with the file's metadata`, () => expect(onNewFile).toHaveBeenCalledWith(jasmine.anything(), `Test File Metadata`))
        it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
        it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
        it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
        it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
        it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
        it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
        it(`increments the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(2))
        it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(false))
        it(`returns the returned file state`, () => expect(file.state).toEqual(`Test File State`))
        it(`returns the parser`, () => expect(file.parser).toBe(parser))
        it(`includes endOfFile false`, () => expect(file.endOfFile).toBe(false))
      })
      describe(`when the parser has many open files`, () => {
        let file
        beforeEach(() => {
          parser.numberOfOpenFiles = 3
          file = get(`newFile`)(parser, `Test File Metadata`)
        })
        it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
        it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
        it(`calls the parser's onNewFile callback once`, () => expect(onNewFile).toHaveBeenCalledTimes(1))
        it(`calls the parser's onNewFile callback with the parser's state`, () => expect(onNewFile).toHaveBeenCalledWith(`Test Parser State`, jasmine.anything()))
        it(`calls the parser's onNewFile callback with the file's metadata`, () => expect(onNewFile).toHaveBeenCalledWith(jasmine.anything(), `Test File Metadata`))
        it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
        it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
        it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
        it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
        it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
        it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
        it(`increments the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(4))
        it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(false))
        it(`returns the returned file state`, () => expect(file.state).toEqual(`Test File State`))
        it(`returns the parser`, () => expect(file.parser).toBe(parser))
        it(`includes endOfFile false`, () => expect(file.endOfFile).toBe(false))
      })
    })
    describe(`when the parser is not expecting further files`, () => {
      beforeEach(() => parser.noFurtherFiles = true)
      describe(`when the parser has no open files`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 0)
        it(`throws an error`, () => expect(() => get(`newFile`)(parser, `Test File Metadata`)).toThrowError(`"newFile" called after "noFurtherFiles"`))
        describe(`then`, () => {
          beforeEach(() => {
            try {
              get(`newFile`)(parser, `Test File Metadata`)
            }
            catch (e) { }
          })
          it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
          it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
          it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
          it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
          it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
          it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
          it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
          it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
          it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
          it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(0))
          it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(true))
        })
      })
      describe(`when the parser has one open file`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 1)
        it(`throws an error`, () => expect(() => get(`newFile`)(parser, `Test File Metadata`)).toThrowError(`"newFile" called after "noFurtherFiles"`))
        describe(`then`, () => {
          beforeEach(() => {
            try {
              get(`newFile`)(parser, `Test File Metadata`)
            }
            catch (e) { }
          })
          it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
          it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
          it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
          it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
          it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
          it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
          it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
          it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
          it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
          it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(1))
          it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(true))
        })
      })
      describe(`when the parser has many open files`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 3)
        it(`throws an error`, () => expect(() => get(`newFile`)(parser, `Test File Metadata`)).toThrowError(`"newFile" called after "noFurtherFiles"`))
        describe(`then`, () => {
          beforeEach(() => {
            try {
              get(`newFile`)(parser, `Test File Metadata`)
            }
            catch (e) { }
          })
          it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
          it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
          it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
          it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
          it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
          it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
          it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
          it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
          it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
          it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(3))
          it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(true))
        })
      })
    })
  })
  describe(`character`, () => {
    let parser, file
    beforeEach(() => {
      parser = {
        state: `Test Parser State`,
        onNewFile,
        onCharacter,
        onEndOfFile,
        onEnd
      }
      file = {
        parser,
        state: `Test File State`
      }
    })
    describe(`when the parser is expecting further files`, () => {
      beforeEach(() => parser.noFurtherFiles = false)
      describe(`when the parser has no open files`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 0)
        describe(`when the file is closed`, () => {
          beforeEach(() => file.endOfFile = true)
          it(`throws an error`, () => expect(() => get(`character`)(file, `Test Character`)).toThrowError(`"character" called after "endOfFile"`))
          describe(`then`, () => {
            beforeEach(() => {
              try {
                get(`character`)(file, `Test Character`)
              } catch (e) { }
            })
            it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
            it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
            it(`does not change the file's endOfFile`, () => expect(file.endOfFile).toBe(true))
            it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
            it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
            it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
            it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
            it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
            it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
            it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
            it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
            it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
            it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(0))
            it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(false))
          })
        })
      })
      describe(`when the parser has one open file`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 1)
        describe(`when the file is open`, () => {
          beforeEach(() => {
            file.endOfFile = false
            get(`character`)(file, `Test Character`)
          })
          it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
          it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
          it(`does not change the file's endOfFile`, () => expect(file.endOfFile).toBe(false))
          it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
          it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
          it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
          it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
          it(`calls the parser's onCharacter callback once`, () => expect(onCharacter).toHaveBeenCalledTimes(1))
          it(`calls the parser's onCharacter callback with the file's state`, () => expect(onCharacter).toHaveBeenCalledWith(`Test File State`, jasmine.anything()))
          it(`calls the parser's onCharacter callback with the character`, () => expect(onCharacter).toHaveBeenCalledWith(jasmine.anything(), `Test Character`))
          it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
          it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
          it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
          it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
          it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(1))
          it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(false))
        })
        describe(`when the file is closed`, () => {
          beforeEach(() => file.endOfFile = true)
          it(`throws an error`, () => expect(() => get(`character`)(file, `Test Character`)).toThrowError(`"character" called after "endOfFile"`))
          describe(`then`, () => {
            beforeEach(() => {
              try {
                get(`character`)(file, `Test Character`)
              } catch (e) { }
            })
            it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
            it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
            it(`does not change the file's endOfFile`, () => expect(file.endOfFile).toBe(true))
            it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
            it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
            it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
            it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
            it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
            it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
            it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
            it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
            it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
            it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(1))
            it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(false))
          })
        })
      })
      describe(`when the parser has many open files`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 3)
        describe(`when the file is open`, () => {
          beforeEach(() => {
            file.endOfFile = false
            get(`character`)(file, `Test Character`)
          })
          it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
          it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
          it(`does not change the file's endOfFile`, () => expect(file.endOfFile).toBe(false))
          it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
          it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
          it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
          it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
          it(`calls the parser's onCharacter callback once`, () => expect(onCharacter).toHaveBeenCalledTimes(1))
          it(`calls the parser's onCharacter callback with the file's state`, () => expect(onCharacter).toHaveBeenCalledWith(`Test File State`, jasmine.anything()))
          it(`calls the parser's onCharacter callback with the character`, () => expect(onCharacter).toHaveBeenCalledWith(jasmine.anything(), `Test Character`))
          it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
          it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
          it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
          it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
          it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(3))
          it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(false))
        })
        describe(`when the file is closed`, () => {
          beforeEach(() => file.endOfFile = true)
          it(`throws an error`, () => expect(() => get(`character`)(file, `Test Character`)).toThrowError(`"character" called after "endOfFile"`))
          describe(`then`, () => {
            beforeEach(() => {
              try {
                get(`character`)(file, `Test Character`)
              } catch (e) { }
            })
            it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
            it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
            it(`does not change the file's endOfFile`, () => expect(file.endOfFile).toBe(true))
            it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
            it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
            it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
            it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
            it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
            it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
            it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
            it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
            it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
            it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(3))
            it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(false))
          })
        })
      })
    })
    describe(`when the parser is not expecting further files`, () => {
      beforeEach(() => parser.noFurtherFiles = true)
      describe(`when the parser has no open files`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 0)
        describe(`when the file is closed`, () => {
          beforeEach(() => file.endOfFile = true)
          it(`throws an error`, () => expect(() => get(`character`)(file, `Test Character`)).toThrowError(`"character" called after "endOfFile"`))
          describe(`then`, () => {
            beforeEach(() => {
              try {
                get(`character`)(file, `Test Character`)
              } catch (e) { }
            })
            it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
            it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
            it(`does not change the file's endOfFile`, () => expect(file.endOfFile).toBe(true))
            it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
            it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
            it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
            it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
            it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
            it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
            it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
            it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
            it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
            it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(0))
            it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(true))
          })
        })
      })
      describe(`when the parser has one open file`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 1)
        describe(`when the file is open`, () => {
          beforeEach(() => {
            file.endOfFile = false
            get(`character`)(file, `Test Character`)
          })
          it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
          it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
          it(`does not change the file's endOfFile`, () => expect(file.endOfFile).toBe(false))
          it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
          it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
          it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
          it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
          it(`calls the parser's onCharacter callback once`, () => expect(onCharacter).toHaveBeenCalledTimes(1))
          it(`calls the parser's onCharacter callback with the file's state`, () => expect(onCharacter).toHaveBeenCalledWith(`Test File State`, jasmine.anything()))
          it(`calls the parser's onCharacter callback with the character`, () => expect(onCharacter).toHaveBeenCalledWith(jasmine.anything(), `Test Character`))
          it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
          it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
          it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
          it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
          it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(1))
          it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(true))
        })
        describe(`when the file is closed`, () => {
          beforeEach(() => file.endOfFile = true)
          it(`throws an error`, () => expect(() => get(`character`)(file, `Test Character`)).toThrowError(`"character" called after "endOfFile"`))
          describe(`then`, () => {
            beforeEach(() => {
              try {
                get(`character`)(file, `Test Character`)
              } catch (e) { }
            })
            it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
            it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
            it(`does not change the file's endOfFile`, () => expect(file.endOfFile).toBe(true))
            it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
            it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
            it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
            it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
            it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
            it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
            it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
            it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
            it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
            it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(1))
            it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(true))
          })
        })
      })
      describe(`when the parser has many open files`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 3)
        describe(`when the file is open`, () => {
          beforeEach(() => {
            file.endOfFile = false
            get(`character`)(file, `Test Character`)
          })
          it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
          it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
          it(`does not change the file's endOfFile`, () => expect(file.endOfFile).toBe(false))
          it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
          it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
          it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
          it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
          it(`calls the parser's onCharacter callback once`, () => expect(onCharacter).toHaveBeenCalledTimes(1))
          it(`calls the parser's onCharacter callback with the file's state`, () => expect(onCharacter).toHaveBeenCalledWith(`Test File State`, jasmine.anything()))
          it(`calls the parser's onCharacter callback with the character`, () => expect(onCharacter).toHaveBeenCalledWith(jasmine.anything(), `Test Character`))
          it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
          it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
          it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
          it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
          it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(3))
          it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(true))
        })
        describe(`when the file is closed`, () => {
          beforeEach(() => file.endOfFile = true)
          it(`throws an error`, () => expect(() => get(`character`)(file, `Test Character`)).toThrowError(`"character" called after "endOfFile"`))
          describe(`then`, () => {
            beforeEach(() => {
              try {
                get(`character`)(file, `Test Character`)
              } catch (e) { }
            })
            it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
            it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
            it(`does not change the file's endOfFile`, () => expect(file.endOfFile).toBe(true))
            it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
            it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
            it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
            it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
            it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
            it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
            it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
            it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
            it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
            it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(3))
            it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(true))
          })
        })
      })
    })
  })
  describe(`endOfFile`, () => {
    let parser, file
    beforeEach(() => {
      parser = {
        state: `Test Parser State`,
        onNewFile,
        onCharacter,
        onEndOfFile,
        onEnd
      }
      file = {
        parser,
        state: `Test File State`
      }
    })
    describe(`when the parser is expecting further files`, () => {
      beforeEach(() => parser.noFurtherFiles = false)
      describe(`when the parser has no open files`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 0)
        describe(`when the file is closed`, () => {
          beforeEach(() => file.endOfFile = true)
          it(`throws an error`, () => expect(() => get(`endOfFile`)(file)).toThrowError(`"endOfFile" called after "endOfFile"`))
          describe(`then`, () => {
            beforeEach(() => {
              try {
                get(`endOfFile`)(file)
              } catch (e) { }
            })
            it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
            it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
            it(`does not change the file's endOfFile`, () => expect(file.endOfFile).toBe(true))
            it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
            it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
            it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
            it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
            it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
            it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
            it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
            it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
            it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
            it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(0))
            it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(false))
          })
        })
      })
      describe(`when the parser has one open file`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 1)
        describe(`when the file is open`, () => {
          beforeEach(() => {
            file.endOfFile = false
            get(`endOfFile`)(file)
          })
          it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
          it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
          it(`changes the file's endOfFile to true`, () => expect(file.endOfFile).toBe(true))
          it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
          it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
          it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
          it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
          it(`does not call the parser's onCharacter callback`, () => expect(parser.onCharacter).not.toHaveBeenCalled())
          it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
          it(`calls the parser's onEndOfFile callback once`, () => expect(onEndOfFile).toHaveBeenCalledTimes(1))
          it(`calls the parser's onEndOfFile callback with the file's state`, () => expect(onEndOfFile).toHaveBeenCalledWith(`Test File State`))
          it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
          it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
          it(`decrements the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(0))
          it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(false))
        })
        describe(`when the file is closed`, () => {
          beforeEach(() => file.endOfFile = true)
          it(`throws an error`, () => expect(() => get(`endOfFile`)(file)).toThrowError(`"endOfFile" called after "endOfFile"`))
          describe(`then`, () => {
            beforeEach(() => {
              try {
                get(`endOfFile`)(file)
              } catch (e) { }
            })
            it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
            it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
            it(`does not change the file's endOfFile`, () => expect(file.endOfFile).toBe(true))
            it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
            it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
            it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
            it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
            it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
            it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
            it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
            it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
            it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
            it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(1))
            it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(false))
          })
        })
      })
      describe(`when the parser has many open files`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 3)
        describe(`when the file is open`, () => {
          beforeEach(() => {
            file.endOfFile = false
            get(`endOfFile`)(file)
          })
          it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
          it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
          it(`changes the file's endOfFile to true`, () => expect(file.endOfFile).toBe(true))
          it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
          it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
          it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
          it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
          it(`does not call the parser's onCharacter callback`, () => expect(parser.onCharacter).not.toHaveBeenCalled())
          it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
          it(`calls the parser's onEndOfFile callback once`, () => expect(onEndOfFile).toHaveBeenCalledTimes(1))
          it(`calls the parser's onEndOfFile callback with the file's state`, () => expect(onEndOfFile).toHaveBeenCalledWith(`Test File State`))
          it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
          it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
          it(`decrements the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(2))
          it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(false))
        })
        describe(`when the file is closed`, () => {
          beforeEach(() => file.endOfFile = true)
          it(`throws an error`, () => expect(() => get(`endOfFile`)(file)).toThrowError(`"endOfFile" called after "endOfFile"`))
          describe(`then`, () => {
            beforeEach(() => {
              try {
                get(`endOfFile`)(file)
              } catch (e) { }
            })
            it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
            it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
            it(`does not change the file's endOfFile`, () => expect(file.endOfFile).toBe(true))
            it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
            it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
            it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
            it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
            it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
            it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
            it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
            it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
            it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
            it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(3))
            it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(false))
          })
        })
      })
    })
    describe(`when the parser is not expecting further files`, () => {
      beforeEach(() => parser.noFurtherFiles = true)
      describe(`when the parser has no open files`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 0)
        describe(`when the file is closed`, () => {
          beforeEach(() => file.endOfFile = true)
          it(`throws an error`, () => expect(() => get(`endOfFile`)(file)).toThrowError(`"endOfFile" called after "endOfFile"`))
          describe(`then`, () => {
            beforeEach(() => {
              try {
                get(`endOfFile`)(file)
              } catch (e) { }
            })
            it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
            it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
            it(`does not change the file's endOfFile`, () => expect(file.endOfFile).toBe(true))
            it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
            it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
            it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
            it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
            it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
            it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
            it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
            it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
            it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
            it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(0))
            it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(true))
          })
        })
      })
      describe(`when the parser has one open file`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 1)
        describe(`when the file is open`, () => {
          beforeEach(() => {
            file.endOfFile = false
            get(`endOfFile`)(file)
          })
          it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
          it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
          it(`changes the file's endOfFile to true`, () => expect(file.endOfFile).toBe(true))
          it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
          it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
          it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
          it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
          it(`does not call the parser's onCharacter callback`, () => expect(parser.onCharacter).not.toHaveBeenCalled())
          it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
          it(`calls the parser's onEndOfFile callback once`, () => expect(onEndOfFile).toHaveBeenCalledTimes(1))
          it(`calls the parser's onEndOfFile callback with the file's state`, () => expect(onEndOfFile).toHaveBeenCalledWith(`Test File State`))
          it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
          it(`call the parser's onEnd callback once`, () => expect(onEnd).toHaveBeenCalledTimes(1))
          it(`call the parser's onEnd callback with the parser's state`, () => expect(onEnd).toHaveBeenCalledWith(`Test Parser State`))
          it(`calls the parser's onEnd callback after the parser's onEndOfFile callback`, () => expect(onEndOfFileCalledBeforeOnEnd).toBe(true))
          it(`decrements the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(0))
          it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(true))
        })
        describe(`when the file is closed`, () => {
          beforeEach(() => file.endOfFile = true)
          it(`throws an error`, () => expect(() => get(`endOfFile`)(file)).toThrowError(`"endOfFile" called after "endOfFile"`))
          describe(`then`, () => {
            beforeEach(() => {
              try {
                get(`endOfFile`)(file)
              } catch (e) { }
            })
            it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
            it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
            it(`does not change the file's endOfFile`, () => expect(file.endOfFile).toBe(true))
            it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
            it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
            it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
            it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
            it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
            it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
            it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
            it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
            it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
            it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(1))
            it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(true))
          })
        })
      })
      describe(`when the parser has many open files`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 3)
        describe(`when the file is open`, () => {
          beforeEach(() => {
            file.endOfFile = false
            get(`endOfFile`)(file)
          })
          it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
          it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
          it(`changes the file's endOfFile to true`, () => expect(file.endOfFile).toBe(true))
          it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
          it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
          it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
          it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
          it(`does not call the parser's onCharacter callback`, () => expect(parser.onCharacter).not.toHaveBeenCalled())
          it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
          it(`calls the parser's onEndOfFile callback once`, () => expect(onEndOfFile).toHaveBeenCalledTimes(1))
          it(`calls the parser's onEndOfFile callback with the file's state`, () => expect(onEndOfFile).toHaveBeenCalledWith(`Test File State`))
          it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
          it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
          it(`decrements the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(2))
          it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(true))
        })
        describe(`when the file is closed`, () => {
          beforeEach(() => file.endOfFile = true)
          it(`throws an error`, () => expect(() => get(`endOfFile`)(file)).toThrowError(`"endOfFile" called after "endOfFile"`))
          describe(`then`, () => {
            beforeEach(() => {
              try {
                get(`endOfFile`)(file)
              } catch (e) { }
            })
            it(`does not change the file's parser`, () => expect(file.parser).toBe(parser))
            it(`does not change the file's state`, () => expect(file.state).toEqual(`Test File State`))
            it(`does not change the file's endOfFile`, () => expect(file.endOfFile).toBe(true))
            it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
            it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
            it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
            it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
            it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
            it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
            it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
            it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
            it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
            it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(3))
            it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(true))
          })
        })
      })
    })
  })
  describe(`noFurtherFiles`, () => {
    let parser
    beforeEach(() => {
      parser = {
        state: `Test Parser State`,
        onNewFile,
        onCharacter,
        onEndOfFile,
        onEnd
      }
    })
    describe(`when the parser is expecting further files`, () => {
      beforeEach(() => parser.noFurtherFiles = false)
      describe(`when the parser has no open files`, () => {
        beforeEach(() => {
          parser.numberOfOpenFiles = 0
          get(`noFurtherFiles`)(parser)
        })
        it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
        it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
        it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
        it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
        it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
        it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
        it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
        it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
        it(`calls the parser's onEnd callback once`, () => expect(onEnd).toHaveBeenCalledTimes(1))
        it(`calls the parser's onEnd callback with the parser's state`, () => expect(onEnd).toHaveBeenCalledWith(`Test Parser State`))
        it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(0))
        it(`changes the parser's noFurtherFiles to true`, () => expect(parser.noFurtherFiles).toBe(true))
      })
      describe(`when the parser has one open file`, () => {
        beforeEach(() => {
          parser.numberOfOpenFiles = 1
          get(`noFurtherFiles`)(parser)
        })
        it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
        it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
        it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
        it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
        it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
        it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
        it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
        it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
        it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
        it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(1))
        it(`changes the parser's noFurtherFiles to true`, () => expect(parser.noFurtherFiles).toBe(true))
      })
      describe(`when the parser has many open files`, () => {
        beforeEach(() => {
          parser.numberOfOpenFiles = 3
          get(`noFurtherFiles`)(parser)
        })
        it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
        it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
        it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
        it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
        it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
        it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
        it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
        it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
        it(`does not call the parser's onEnd callback`, () => expect(onEnd).not.toHaveBeenCalled())
        it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(3))
        it(`changes the parser's noFurtherFiles to true`, () => expect(parser.noFurtherFiles).toBe(true))
      })
    })
    describe(`when the parser is not expecting further files`, () => {
      beforeEach(() => parser.noFurtherFiles = true)
      describe(`when the parser has no open files`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 0)
        it(`throws an error`, () => expect(() => get(`noFurtherFiles`)(parser)).toThrowError(`"noFurtherFiles" called after "noFurtherFiles"`))
        describe(`then`, () => {
          beforeEach(() => {
            try {
              get(`noFurtherFiles`)(parser)
            } catch (e) { }
          })
          it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
          it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
          it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
          it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
          it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
          it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
          it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
          it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
          it(`does not call the parser's onEnd callback once`, () => expect(onEnd).not.toHaveBeenCalled())
          it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(0))
          it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(true))
        })
      })
      describe(`when the parser has one open file`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 1)
        it(`throws an error`, () => expect(() => get(`noFurtherFiles`)(parser)).toThrowError(`"noFurtherFiles" called after "noFurtherFiles"`))
        describe(`then`, () => {
          beforeEach(() => {
            try {
              get(`noFurtherFiles`)(parser)
            } catch (e) { }
          })
          it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
          it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
          it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
          it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
          it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
          it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
          it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
          it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
          it(`does not call the parser's onEnd callback once`, () => expect(onEnd).not.toHaveBeenCalled())
          it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(1))
          it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(true))
        })
      })
      describe(`when the parser has many open files`, () => {
        beforeEach(() => parser.numberOfOpenFiles = 3)
        it(`throws an error`, () => expect(() => get(`noFurtherFiles`)(parser)).toThrowError(`"noFurtherFiles" called after "noFurtherFiles"`))
        describe(`then`, () => {
          beforeEach(() => {
            try {
              get(`noFurtherFiles`)(parser)
            } catch (e) { }
          })
          it(`does not change the parser's state`, () => expect(parser.state).toEqual(`Test Parser State`))
          it(`does not change the parser's onNewFile callback`, () => expect(parser.onNewFile).toBe(onNewFile))
          it(`does not call the parser's onNewFile callback`, () => expect(onNewFile).not.toHaveBeenCalled())
          it(`does not change the parser's onCharacter callback`, () => expect(parser.onCharacter).toBe(onCharacter))
          it(`does not call the parser's onCharacter callback`, () => expect(onCharacter).not.toHaveBeenCalled())
          it(`does not change the parser's onEndOfFile callback`, () => expect(parser.onEndOfFile).toBe(onEndOfFile))
          it(`does not call the parser's onEndOfFile callback`, () => expect(onEndOfFile).not.toHaveBeenCalled())
          it(`does not change the parser's onEnd callback`, () => expect(parser.onEnd).toBe(onEnd))
          it(`does not call the parser's onEnd callback once`, () => expect(onEnd).not.toHaveBeenCalled())
          it(`does not change the parser's numberOfOpenFiles`, () => expect(parser.numberOfOpenFiles).toEqual(3))
          it(`does not change the parser's noFurtherFiles`, () => expect(parser.noFurtherFiles).toBe(true))
        })
      })
    })
  })
})

import assert from 'assert'
import { testPlugin, equal } from './helpers'
import testCases from './spec'

describe('babel-plugin-export-default-module-exports', () => {
  it('should not export `module.exports` to default by default.', () =>
    testPlugin(testCases[0].code, {
      presets: ['es2015']
    }, (module) => {
      assert(module.entry === 'entry')
      assert(typeof module.default === 'undefined')
    }))

  it('plugin should export to module.exports', () => {
    const plugin = require('../src')
    assert(typeof plugin === 'function')
  })

  it('should handle duplicated plugin references', () =>
    testPlugin(testCases[0].code, {
      presets: ['es2015'],
      plugins: [
        './src/index.js',
        './src/index.js',
        './src/index.js'
      ]
    }, (module) => {
      assert(module.entry === 'entry')

      // @see https://github.com/59naga/babel-plugin-add-module-exports/issues/12#issuecomment-157023722
      assert(module.default.entry === 'entry')
    }))

  testCases.forEach((testCase) =>
    it(`should ${testCase.name}`, () =>
      testPlugin(testCase.code, {
        presets: ['es2015'],
        plugins: [
          'transform-export-extensions', // use export-from syntax
          './src/index.js'
        ]
      }, (module) => {
        // assert module root (module.exports) object
        equal(module, testCase.expected.module)

        // assert each common entry is exported without error
        Object.keys(testCase.expected.exports).forEach((key) =>
          equal(module[key], testCase.expected.exports[key]))
      })))
})

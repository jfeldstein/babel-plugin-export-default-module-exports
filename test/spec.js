// HACK: keep `anonymous` function for helpers/inspect
let defaultEntry
// eslint-disable-next-line no-eval
eval("defaultEntry = function () { return 'default-entry' }")

const withCircularDefault = (entries) => {
  let circularEntries = Object.assign({}, entries);
  circularEntries.default = circularEntries;
  return circularEntries;
};

module.exports = [
  {
    name: 'export module.exports to default if only module.exports',
    code: 'export const entry = "entry"',
    expected: {
      module: withCircularDefault({
        entry: 'entry',
      }),
      exports: withCircularDefault({
        entry: 'entry',
      })
    }
  },
  {
    name: 'export other entries to default if no default entry',
    code: 'export const other1 = "entry1"; export const other2 = "entry2"',
    expected: {
      module: withCircularDefault({
        other1: 'entry1',
        other2: 'entry2'
      }),
      exports: withCircularDefault({
        other1: 'entry1',
        other2: 'entry2'
      })
    }
  },
  {
    name: 'not export module.exports to default if exporting default',
    code: 'export default "default-entry"; export const other = "other-entry"',
    expected: {
      module: {
        default: 'default-entry',
        other: 'other-entry'
      },
      exports: {
        default: 'default-entry',
        other: 'other-entry'
      }
    }
  },
  {
    name: 'export default function entry with other entries',
    code: 'export default () => "default-entry"; export const other = "other-entry"',
    expected: {
      module: {
        default: defaultEntry,
        other: 'other-entry'
      },
      exports: {
        default: defaultEntry,
        other: 'other-entry'
      }
    }
  },
  {
    name: 'not override default object with other export entries',
    code: 'export default { value: 1 }; export const value = 2',
    expected: {
      module: {
        default: { value: 1 },
        value: 2
      },
      exports: {
        default: { value: 1 },
        value: 2
      }
    }
  }
]

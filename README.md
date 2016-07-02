babel-plugin-export-default-module-exports
---

<p align="right">
  <a href="https://npmjs.org/package/babel-plugin-export-default-module-exports">
    <img src="https://img.shields.io/npm/v/babel-plugin-export-default-module-exports.svg?style=flat-square">
  </a>
  <a href="https://travis-ci.org/jfeldstein/babel-plugin-export-default-module-exports">
    <img src="http://img.shields.io/travis/jfeldstein/babel-plugin-export-default-module-exports.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/jfeldstein/babel-plugin-export-default-module-exports/coverage">
    <img src="https://img.shields.io/codeclimate/github/jfeldstein/babel-plugin-export-default-module-exports.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/jfeldstein/babel-plugin-export-default-module-exports">
    <img src="https://img.shields.io/codeclimate/coverage/github/jfeldstein/babel-plugin-export-default-module-exports.svg?style=flat-square">
  </a>
</p>

Installation
---

```bash
npm install babel-plugin-export-default-module-exports --save-dev
```

Why?
---

I want to be able to `import Name from 'module'; Name.method()` as well as `import {action} from 'module'; action()`.

Normally you would do this by ending `'module'` with `export default module.exports`.

This plugin adds that line automatically, to any module with named exports, which doesn't already have an explicit `export default`

```js
// index.js
export const entry 'foo'
```

into

```js
// index.js
export const entry 'foo'
export default {
  entry,
}
```

Usage
---

Install this plugin from npm:

```sh
npm install babel-plugin-export-default-module-exports --save-dev
```

Write the name to [babelrc](https://babeljs.io/docs/usage/babelrc/). It works with [preset-es2015](http://babeljs.io/docs/plugins/preset-es2015/) to output CommonJS code:

```json
{
  "presets": ["es2015"],
  "plugins": [
    "export-default-module-exports"
  ]
}
```

It also works with [transform-es2015-modules-umd](http://babeljs.io/docs/plugins/transform-es2015-modules-umd/) plugin to output UMD code: (It is a *must* to place UMD plugin *after* this plugin.)

```json
{
  "presets": ["es2015"],
  "plugins": [
    "export-default-module-exports",
    "transform-es2015-modules-umd"
  ]
}
```

License
---
[MIT](http://jfeldstein.mit-license.org/)

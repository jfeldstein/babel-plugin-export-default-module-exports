module.exports = ({types}) => ({
  visitor: {
    Program: {
      exit (path) {
        if (path.BABEL_PLUGIN_EXPORT_DEFAULT_MODULE_EXPORTS) {
          return
        }

        let hasExportDefault = false
        let hasExportNamed = false

        path.get('body').forEach((path) => {

          if (path.isExportDefaultDeclaration()) {
            hasExportDefault = true
            return
          }

          if (path.isExportNamedDeclaration()) {
            if (path.node.specifiers.length === 1 && path.node.specifiers[0].exported.name === 'default') {
              hasExportDefault = true
            } else {
              hasExportNamed = true
            }
            return
          }
        })

        if (!hasExportDefault && hasExportNamed) {
          const moduleExports = types.memberExpression(types.identifier('module'), types.identifier('exports'));
          path.pushContainer('body', [
            types.expressionStatement(types.assignmentExpression(
              '=',
              types.memberExpression(types.identifier('exports'), types.stringLiteral('default'), true),
              types.memberExpression(types.identifier('module'), types.identifier('exports'))
            )),
            types.exportDefaultDeclaration(moduleExports)
          ])
        }

        path.BABEL_PLUGIN_EXPORT_DEFAULT_MODULE_EXPORTS = true
      }
    }
  }
})

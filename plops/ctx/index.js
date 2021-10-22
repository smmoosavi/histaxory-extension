module.exports = function (plop) {
  plop.setGenerator('ctx', {
    description: 'add a new context',
    prompts: [
      {
        type: 'directory',
        name: 'path',
        message: 'directory path please',
        rootPath: './src',
        excludePath: (nodePath) => nodePath.startsWith('node_modules'),
        itemType: 'directory',
        suggestOnly: true,
      },
      {
        type: 'input',
        name: 'name',
        message: 'context name please (without context postfix)',
      },
      {
        type: 'input',
        name: 'generic',
        message: 'generic name please (empty for skip)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{path}}/{{pascalCase name}}Context.tsx',
        templateFile:
          'plops/ctx/templates/{{when generic "ctx-generic" "ctx"}}.tsx.hbs',
      },
    ],
  });
};

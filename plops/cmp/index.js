module.exports = function (plop) {
  plop.setGenerator('cmp', {
    description: 'Add a new component',
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
        message: 'component name please',
      },
      {
        type: 'list',
        choices: [
          { name: 'none', value: 'none', key: 'n' },
          { name: 'styled', value: 'styled', key: 's' },
          { name: 'sx', value: 'sx', key: 'x' },
        ],
        name: 'style',
        message: 'style type?',
        default: 'none',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{path}}/{{pascalCase name}}.tsx',
        templateFile: 'plops/cmp/templates/{{style}}-cmp.tsx.hbs',
      },
    ],
  });
};

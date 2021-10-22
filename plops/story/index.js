const path = require('path');
module.exports = function (plop) {
  plop.setGenerator('story', {
    description: 'Add a new Story',
    prompts: [
      {
        type: 'file',
        name: 'component',
        message: 'component path please',
        rootPath: './src',
        excludePath: (nodePath) => nodePath.startsWith('node_modules'),
        itemType: 'file',
      },
    ],
    actions: (data) => {
      const file = path.parse(data.component);
      return [
        {
          data: { dir: file.dir, name: file.name },
          type: 'add',
          path: '{{dir}}/{{name}}.stories.tsx',
          templateFile: 'plops/story/templates/story.tsx.hbs',
        },
      ];
    },
  });
};

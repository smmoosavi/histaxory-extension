module.exports = function (plop) {
  plop.setGenerator('plop', {
    description: 'The plop that add a new plop',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'plop name please',
      },
      {
        type: 'input',
        name: 'description',
        message: 'description please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'plops/{{name}}/index.js',
        templateFile: 'plops/plop/templates/index.js.hbs',
      },
      {
        type: 'add',
        path: 'plops/{{name}}/templates/{{name}}.ts.hbs',
        templateFile: 'plops/plop/templates/templates/index.ts.hbs.hbs',
      },
    ],
  });
};

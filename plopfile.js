const plopPlop = require('./plops/plop');
const cmpPlop = require('./plops/cmp');
const ctxPlop = require('./plops/ctx');
const storyPlop = require('./plops/story');
const when = require('./plops/helpers/when');
const promptDirectory = require('inquirer-fuzzy-path');

module.exports = function (plop) {
  plop.setPrompt('directory', promptDirectory);
  plop.setPrompt('file', promptDirectory);
  plop.setHelper('when', when);
  cmpPlop(plop);
  storyPlop(plop);
  ctxPlop(plop);
  plopPlop(plop);
};

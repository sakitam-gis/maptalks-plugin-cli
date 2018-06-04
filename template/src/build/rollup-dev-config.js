const { input, output } = require('./rollup-base-config')[0];
{{#scss}}
const {cssPlugins} = require('./helper');
input.plugins.splice(2, 0, cssPlugins());
{{/scss}}
module.exports = Object.assign({
  plugins: []
}, input, {output});

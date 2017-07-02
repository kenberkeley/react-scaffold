// Refers to https://github.com/kenberkeley/vue2-scaffold/blob/master/build/config/style-rules.js
var extract = require('extract-text-webpack-plugin').extract,
  ENV = require('./ENV');

// config for postcss-loader see `.postcssrc`
var basicLoaders = ['css-loader', 'postcss-loader'];
var LOADERS = {
  css: basicLoaders,
  less: basicLoaders.concat('less-loader'),
  sass: basicLoaders.concat('sass-loader?indentedSyntax=true'),
  scss: basicLoaders.concat('sass-loader')
};

function ruleGen(ext) {
  var styleLoader = 'style-loader',
    useLoaders = LOADERS[ext];

  // embed style during dev
  if (ENV.__DEV__) return [styleLoader].concat(useLoaders);
  // extract .css during prod
  return extract({ use: useLoaders, fallback: styleLoader });
}

function styleRulesGen() {
  var rules = [];
  Object.keys(LOADERS).forEach(function (ext) {
    rules.push({ test: new RegExp('\\.' + ext + '$'), use: ruleGen(ext) });
  });
  return rules;
}

module.exports = styleRulesGen();

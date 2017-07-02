var fs = require('fs-extra'),
  webpack = require('webpack'),
  PATHS = require('./config/PATHS'),
  config = require('./webpack.prod.conf');

fs.emptyDirSync(PATHS.DIST);
fs.copySync(PATHS.STATIC, PATHS.DIST.join('static'));

webpack(config, function(err, stats) {
  // show build info to console
  console.log(stats.toString({ chunks: false, color: true }));
});

'use strict';

var PluginError = require('plugin-error');
var log = require('fancy-log');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');

function buildProduction(done) {
   // modify some webpack config options
   var myProdConfig = webpackConfig;
   myProdConfig.output.filename = 'index.js';

   // run webpack
   webpack(myProdConfig, function (err, stats) {
      if (err) { throw new PluginError('webpack:build', err); }
      log('[webpack:build]', stats.toString({
         colors: true
      }));

      if (done) { done(); }
   });
}

function createDevCompiler() {
   // modify some webpack config options
   var myDevConfig = webpackConfig;
   myDevConfig.devtool = 'inline-source-map';

   // create a single instance of the compiler to allow caching
   return webpack(myDevConfig);
}

function build() {
   return new Promise(function (resolve, reject) {
      buildProduction(function (err) {
         if (err) {
            reject(err);
         } else {
            resolve('webpack built');
         }
      });
   });
}

function watch() {
   var firstBuildDone = false;

   return new Promise(function (resolve, reject) {
      var devCompiler = createDevCompiler();
      devCompiler.watch({ // watch options:
         aggregateTimeout: 300 // wait so long for more changes
      }, function (err, stats) {
         if (err) {
            if (!firstBuildDone) {
               firstBuildDone = true;
               reject(err);
            }
            throw new PluginError('webpack:build-dev', err);
         } else {
            if (!firstBuildDone) {
               firstBuildDone = true;
               resolve('webpack built');
            }
         }

         log('[webpack:build-dev]', stats.toString({
            chunks: false,
            colors: true
         }));
      });
   });
}

module.exports = {
   build: function () { return build(); },
   watch: function () { return watch(); }
};

'use strict';

var webpackConfig = require('./webpack.config.js');

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  // Documentation: https://karma-runner.github.io/0.13/config/configuration-file.html
  config.set({
    browsers: [ 'ChromeHeadless' ],

    files: [
      // This ensures we have the es6 shims in place from babel and that angular and angular-mocks are loaded
      // and then loads all the tests
      'test/main.js',
    //  'src/**/*.js' // transpiled js
    ],

    exclude: ['src/muleSdk/Spinal/index.js'],

    port: 9876,

    frameworks: [ 'jasmine' ],

    logLevel: config.LOG_INFO, //config.LOG_DEBUG

    preprocessors: {
      'test/main.js': [ 'webpack', 'sourcemap' ]
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },

    webpackMiddleware: {
      quiet: true,
      stats: {
        colors: true
      }
    },

    // reporter options
    mochaReporter: {
      colors: {
        success: 'bgGreen',
        info: 'cyan',
        warning: 'bgBlue',
        error: 'bgRed'
      }
    },

    coverageIstanbulReporter: {
      reports: ['html', 'text-summary'],
      fixWebpackSourcePaths: true
    },

  });
};

'use strict';

var Server = require('karma').Server;
var path = require('path');
var log = require('fancy-log');

process.env.CHROME_BIN = require('puppeteer').executablePath();

function runTests(options) {
  // Documentation: https://karma-runner.github.io/0.13/dev/public-api.html
  var karmaConfig = {
    configFile: path.join(__dirname, '../karma.conf.js'),
    singleRun: !options.shouldWatch,

    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-coverage-istanbul-reporter'
    ],
    reporters: ['mocha', 'coverage-istanbul']
  };

  karmaConfig.plugins.push('karma-notify-reporter');
  karmaConfig.reporters.push('notify');

  new Server(karmaConfig, karmaCompleted).start();

  function karmaCompleted(exitCode) {
    if (options.done) {
      if (exitCode === 1) {
        log('Karma: tests failed with code ' + exitCode);
      } else {
        log('Karma completed!');
      }
      options.done();
    }
    else {
      process.exit(exitCode);
    }
  }
}

module.exports = {
  run:   function(done) { return runTests({ shouldWatch: false, done: done }); },
  watch: function()     { return runTests({ shouldWatch: true  }); }
};

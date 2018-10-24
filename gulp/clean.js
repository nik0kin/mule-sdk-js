'use strict';

var del = require('del');
var log = require('fancy-log');
var fs = require('fs');

function run(done) {
  fs.stat('./dist', function(err){
    if (err) {
      // Never existed
      done();
    }
    else {
      del(['./dist'], { force: true })
        .then(function(paths) {
          log('Deleted files/folders:\n', paths.join('\n'));
          done();
        })
        .catch(function(error) {
          log('Problem deleting:\n', error);
          done();
        });
    }
  });
}

module.exports = {
  run: function(done) { return run(done); }
};

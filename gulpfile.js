'use strict';

var gulp = require('gulp');
var log = require('fancy-log');
var eslint = require('gulp-eslint');
var webpack = require('./gulp/webpack');
var tests = require('./gulp/tests');
var clean = require('./gulp/clean');

var lintSrcs = ['./gulp/**/*.js'];

gulp.task('delete-dist', function(done) {
  clean.run(done);
});

gulp.task('build-js', gulp.series('delete-dist', function webpackBuild(done) {
  webpack.build().then(function() { done(); });
}));

function lint() { // lint gulp code loool!!
  return gulp.src(lintSrcs)
    .pipe(eslint())
    .pipe(eslint.format());
}

gulp.task('lint', lint);

gulp.task('build', gulp.series('build-js', lint));

gulp.task('watch', gulp.series('delete-dist', function webpackWatch(done) {
  process.env.NODE_ENV = 'development';
  Promise.all([
    webpack.watch()
  ]).then(function() {
    log('Initial assets (js and css) are generated...');
    done();
  }).catch(function(error) {
    log('Problem generating initial assets (js and css)', error);
  });

  gulp.watch(lintSrcs, gulp.series(lint));
  tests.watch();
}));

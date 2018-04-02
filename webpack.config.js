/* eslint-disable no-var, strict, prefer-arrow-callback */
'use strict';

var path = require('path');


var babelOptions = {
  "presets": [
    [
      "es2015",
      {
        "modules": false
      }
    ],
    "es2016"
  ]
};

module.exports = {
  cache: true,
  entry: {
    // main: ['./src/muleSdk/mule-sdk.ts', './src/mockSdk/mock-sdk.ts'],
    main: ['./src/index.ts'],
    vendor: [
      // 'babel-polyfill',
      'lodash',
      'q',
      'whatwg-fetch'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist/scripts'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    rules: [{
      test: /\.ts$/,      
      // test: /^(?!.*spec\.ts?$).*\.ts$/, // ghetto negative lookbehind to exclude .spec.ts https://stackoverflow.com/questions/38473025/regex-that-doesnt-match-spec-ts-and-spec-tsx-but-should-match-any-other-ts-and
      exclude: [/node_modules/, /test/],
      use: [
        {
          loader: 'istanbul-instrumenter-loader',
          query: {
            esModules: true
          }
        },
        {
          loader: 'babel-loader',
          options: babelOptions
        },
        {
          loader: 'ts-loader'
        }
      ]
    }, {
      test: /\.ts$/,
      include: /test/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        },
        {
          loader: 'ts-loader'
        }
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        }
      ]
    }]
  },
  plugins: [
  ],
  resolve: {
    extensions: ['.ts']
  },
};
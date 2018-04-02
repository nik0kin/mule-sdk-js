/* eslint-disable */
// import 'babel-polyfill';
// import 'whatwg-fetch';

const srcTestsContext = require.context('../src', true, /\.spec(\.js|\.ts)$/);
srcTestsContext.keys().forEach(srcTestsContext);

const testsContext = require.context('./', true, /\.spec(\.js|\.ts)$/);
testsContext.keys().forEach(testsContext);

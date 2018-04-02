/* eslint-disable */
// import 'babel-polyfill';
import 'whatwg-fetch';

const testsContext = require.context('./', true, /\.spec(\.js|\.ts)$/);
testsContext.keys().forEach(testsContext);

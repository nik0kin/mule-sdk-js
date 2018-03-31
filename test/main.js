/* eslint-disable */
import 'whatwg-fetch';

const testsContext = require.context('./', true, /\.spec(\.js|\.ts)$/);
testsContext.keys().forEach(testsContext);

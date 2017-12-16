import * as _ from 'lodash';
import * as Q from 'q';

import {theGreeter} from '../../src/mule-sdk';

describe('Yee', () => {
  it('should work', () => {
    theGreeter.greet();
  });
  
  it('should depencies should work', () => {
    _.times(3, () => console.log('lol'));

    console.log(fetch)
    console.log(Q)
  });
  
});


// define(['mule-sdk'], function (sdk) {
//   var SDK = sdk('http://zion.tgp.io:313/webservices/');

//   console.log('sdk should not be undefined', sdk);
//   console.log('SDK should not be undefined', SDK);
// });
